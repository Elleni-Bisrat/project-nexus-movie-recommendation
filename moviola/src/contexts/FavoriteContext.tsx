"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { Movie, FavoriteList } from "@/interfaces";

const FavoriteContext = createContext<FavoriteList | undefined>(undefined);

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favoritelist, setFavoritelist] = useState<Movie[]>([]);

  useEffect(() => {
    const savedFavoritelist = localStorage.getItem("favoritelist");
    if (savedFavoritelist) {
      setFavoritelist(JSON.parse(savedFavoritelist));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritelist", JSON.stringify(favoritelist));
  }, [favoritelist]);

  const addToFavoriteList = (movie: Movie) => {
    setFavoritelist((prev) => {
      const exists = prev.find((item) => item.id === movie.id);
      if (exists) return prev;
      return [...prev, { ...movie, addedAt: new Date().toISOString() }];
    });
  };

  const removeFromFavoritelist = (movieId: number) => {
    setFavoritelist(prev => prev.filter(movie => movie.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favoritelist.some((movie) => movie.id === movieId);
  };

  const clearFavoritelist = () => {
    setFavoritelist([]);
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoritelist,
        addToFavoriteList,
        removeFromFavoritelist,
        isFavorite,
        clearFavoritelist,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export const useFavoritelist = () => {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavoritelist must be used within a FavoriteProvider");
  }
  return context;
};
