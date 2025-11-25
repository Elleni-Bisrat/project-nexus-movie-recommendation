// src/app/watchlist/page.tsx
"use client";
import { useWatchlist } from "@/contexts/WatchlistContext";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const Container = styled.div`
  min-height: 100vh;
  color: white;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: .5rem;
  box-shadow: 0 1px 0 #b5b1b1ff, 
              0 2px 4px rgba(149, 137, 137, 0.3); 
  
`;

const Title = styled.h1`
  font-size: 1.5rem;
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

const WatchlistCount = styled.p`
  color: #a8a2a2ff;
  font-size: 1rem;
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

const RemoveButton = styled.button`
  background: transparent;
  color: #ff4444;
  border: 1px solid #ff4444;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  cursor: pointer;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    background: #ff4444;
    color: white;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
`;

const EmptyTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #4e4a4aff;
`;

const EmptyText = styled.p`
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

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist, clearWatchlist } = useWatchlist();
  const router = useRouter();

  const handleMovieClick = (movieId: number) => {
    router.push(`/movie/${movieId}`);
  };

  const handleRemoveFromWatchlist = (e: React.MouseEvent, movieId: number) => {
    e.stopPropagation();
    removeFromWatchlist(movieId);
  };

  const handleClearWatchlist = () => {
    if (confirm("Are you sure you want to clear your entire watchlist?")) {
      clearWatchlist();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (watchlist.length === 0) {
    return (
      <Container>
        <Header>
          <Title>My Watchlist</Title>
        </Header>
        <EmptyState>
          <EmptyTitle>Your watchlist is empty</EmptyTitle>
          <EmptyText>Start adding movies to watch later!</EmptyText>
          <BrowseButton onClick={() => router.push("/discover")}>
            Browse Movies
          </BrowseButton>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>My Watchlist</Title>
        <ClearButton onClick={handleClearWatchlist}>
          Clear All
        </ClearButton>
      </Header>

      <WatchlistCount>
        {watchlist.length} {watchlist.length === 1 ? 'movie' : 'movies'} in your watchlist
      </WatchlistCount>

      <MovieGrid>
        {watchlist.map((movie) => (
          <MovieCard 
            key={movie.id} 
            onClick={() => handleMovieClick(movie.id)}
          >
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
                <p style={{ fontSize: "0.8rem", color: "#666", marginBottom: "0.5rem" }}>
                  Added: {formatDate(movie.addedAt)}
                </p>
              )}
              <RemoveButton 
                onClick={(e) => handleRemoveFromWatchlist(e, movie.id)}
              >
                Remove
              </RemoveButton>
            </MovieInfo>
          </MovieCard>
        ))}
      </MovieGrid>
    </Container>
  );
}