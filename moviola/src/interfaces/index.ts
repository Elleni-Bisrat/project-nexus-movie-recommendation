export interface MovieCardProps {
  id: number;
  title: string;
  poster: string;
  rating: number;
}
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  addedAt?: string;
  genre_ids?:number[];
  popularity: number;
}
export interface WatchlistContextType {
  watchlist: Movie[];
  addToWatchlist: (movie: Movie) => void;
  removeFromWatchlist: (movieId: number) => void;
  isInWatchlist: (movieId: number) => boolean;
  clearWatchlist: () => void;
}
export interface FavoriteList{
  favoritelist:Movie[];
  addToFavoriteList:(movie:Movie)=>void;
  removeFromFavoritelist:(moviId:number)=>void;
  isFavorite:(moviId:number)=>boolean;
  clearFavoritelist:()=>void;
}
