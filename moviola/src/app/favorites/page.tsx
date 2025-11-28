"use client";
import { useFavoritelist } from "@/contexts/FavoriteContext";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const PageContainer = styled.div`
  padding: 2rem;
  color: white;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
 display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  box-shadow: 0 1px 0 #b5b1b1ff, 0 2px 4px rgba(149, 137, 137, 0.3);
`;

const Title = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  background: linear-gradient(45deg, #f32f2fff, #7435e0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ClearButton = styled.button`
 background: #d72a2aff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: #cc0000;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const EmptyState = styled.div`
 text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const EmptyTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #4e4a4aff;
`;

const EmptyMessage = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #635858ff;
`;

const BrowseButton = styled.button`
  background: linear-gradient(45deg, #ff6b6b, #be1d1dff);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MovieCard = styled.div`
  background: #1a1a1a;
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
  }
`;

const MoviePoster = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const MovieInfo = styled.div`
  padding: 1rem;
`;

const MovieTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: white;
  line-height: 1.3;
`;

const MovieDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const MovieRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: #ffd700;
  font-weight: 600;
`;

const MovieYear = styled.span`
  color: #ccc;
  font-size: 0.9rem;
`;

const AddedDate = styled.p`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 0.5rem;
`;

const RemoveButton = styled.button`
  background: transparent;
  color: #ff4444;
  border: 1px solid #ff4444;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: #ff4444;
    color: white;
  }
`;

export default function FavoritePage() {
  const { favoritelist, removeFromFavoritelist, clearFavoritelist } = useFavoritelist();
  const router = useRouter();

  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
  };

  const handleRemoveFromFavoritelist = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation();
    removeFromFavoritelist(movieId);
  };

  const handleClearFavoritelist = () => {
    if (confirm("Are you sure you want to clear your entire favorite list?")) {
      clearFavoritelist();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (favoritelist.length === 0) {
    return (
      <PageContainer>
        <HeaderSection>
          <Title>Your Favorite Movies</Title>
        </HeaderSection>
        <EmptyState>
          <EmptyTitle>No favorites yet</EmptyTitle>
          <EmptyMessage>Start adding movies to your favorites to see them here!</EmptyMessage>
          <BrowseButton onClick={() => router.push('/discover')}>
            Browse Movies
          </BrowseButton>
        </EmptyState>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <HeaderSection>
        <Title>My Favorite List ({favoritelist.length})</Title>
        <ClearButton onClick={handleClearFavoritelist}>
          Clear All
        </ClearButton>
      </HeaderSection>

      <MovieGrid>
        {favoritelist.map((movie) => (
          <MovieCard key={movie.id} onClick={() => handleMovieClick(movie.id)}>
            <MoviePoster
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : "/default-poster.jpg"
              }
              alt={movie.title}
              onError={(e) => {
                e.currentTarget.src = "/default-poster.jpg";
              }}
            />
            <MovieInfo>
              <MovieTitle>{movie.title}</MovieTitle>
              <MovieDetails>
                <MovieRating>
                  ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                </MovieRating>
                <MovieYear>
                  {movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
                </MovieYear>
              </MovieDetails>
              {movie.addedAt && (
                <AddedDate>
                  Added: {formatDate(movie.addedAt)}
                </AddedDate>
              )}
              <RemoveButton
                onClick={(e) => handleRemoveFromFavoritelist(e, movie.id)}
              >
                Remove
              </RemoveButton>
            </MovieInfo>
          </MovieCard>
        ))}
      </MovieGrid>
    </PageContainer>
  );
}
