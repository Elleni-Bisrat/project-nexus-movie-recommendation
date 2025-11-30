import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useFavoritelist } from "@/contexts/FavoriteContext";
import { useWatchlist } from "@/contexts/WatchlistContext";
import { Movie } from "@/interfaces";
interface ContainerProps {
  $backgroundImage?: string;
}
interface IconButtonProps {
  $isFavorite?: boolean;
  $isInWatchlist?: boolean;
}
export default function MovieDetail({ id }: { id: string }) {
  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const { addToFavoriteList, removeFromFavoritelist, isFavorite } =
    useFavoritelist();

  const [isMovieInWatchlist, setIsMovieInWatchlist] = useState(false);
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);

  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  const fetchMovieDetails = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch movie details");
      }
      const data = await res.json();
      setMovie(data);
    } catch (error) {
      console.log("error fetching movie details", error);
    }
  };

  const fetchMovieCast = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch movie cast");
      }
      const data = await res.json();
      setCast(data.cast.slice(0, 6));
    } catch (error) {
      console.log("error fetching movie cast", error);
    }
  };

  // Check if movie is in watchlist and favorites when movie data is loaded
  useEffect(() => {
    if (movie) {
      setIsMovieInWatchlist(isInWatchlist(movie.id));
      setIsMovieFavorite(isFavorite(movie.id));
    }
  }, [movie, isInWatchlist, isFavorite]);

  const getRating = () => {
    return movie?.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  };

  const getReleaseYear = () => {
    return movie?.release_date ? movie.release_date.split("-")[0] : "N/A";
  };

  const getRuntime = () => {
    if (!movie?.runtime) return "N/A";
    return `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`;
  };

  const getGenres = () => {
    return movie?.genres?.map((genre: any) => genre.name).join(", ") || "N/A";
  };

  const toggleFavorite = () => {
    if (movie) {
      if (isMovieFavorite) {
        removeFromFavoritelist(movie.id);
        setIsMovieFavorite(false);
      } else {
        addToFavoriteList({
          id: movie.id,
          title: movie.title || "Unknown Title",
          poster_path: movie.poster_path || "",
          backdrop_path: movie.backdrop_path || "",
          release_date: movie.release_date || "",
          vote_average: movie.vote_average || 0,
          overview: movie.overview || "",
          popularity: movie.popularity || 0, // REQUIRED
          genre_ids: movie.genre_ids || [],
        });
        setIsMovieFavorite(true);
      }
    }
  };

  const toggleWatchlist = () => {
    if (movie) {
      if (isMovieInWatchlist) {
        removeFromWatchlist(movie.id);
        setIsMovieInWatchlist(false);
      } else {
        addToWatchlist({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          overview: movie.overview,
        });
        setIsMovieInWatchlist(true);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovieDetails();
      fetchMovieCast();
    }
  }, [id]);

  if (!movie) {
    return (
      <LoadingContainer>
        <LoadingText>Loading...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <>
      <Container
        $backgroundImage={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
      >
        <ContentWrapper>
          <PosterSection>
            <PosterImage
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          </PosterSection>

          <InfoSection>
            <Title>{movie.title || "Unknown Title"}</Title>
            <Tagline>
              {movie.tagline || "Welcome to where it all began."}
            </Tagline>

            <InteractiveSection>
              {/* Favorite Button */}
              <IconButtonWrapper>
                <IconButton
                  $isFavorite={isMovieFavorite}
                  onClick={toggleFavorite}
                >
                  {isMovieFavorite ? "❤️" : "🤍"}
                </IconButton>
                <Tooltip>
                  {isMovieFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"}
                </Tooltip>
              </IconButtonWrapper>

              {/* Watchlist Button */}
              <IconButtonWrapper>
                <IconButton
                  $isInWatchlist={isMovieInWatchlist}
                  onClick={toggleWatchlist}
                >
                  {isMovieInWatchlist ? "✅" : "🎦"}
                </IconButton>
                <Tooltip>
                  {isMovieInWatchlist
                    ? "Remove from watchlist"
                    : "Add to watchlist"}
                </Tooltip>
              </IconButtonWrapper>

              <PlayTrailerButton>▶ Play Trailer</PlayTrailerButton>
            </InteractiveSection>

            <MetaInfo>
              <MetaItem>⭐ {getRating()}</MetaItem>
              <MetaItem>{getReleaseYear()}</MetaItem>
              <MetaItem>{getRuntime()}</MetaItem>
            </MetaInfo>

            <OverviewSection>
              <SectionTitle>Overview</SectionTitle>
              <OverviewText>
                {movie.overview || "No description available"}
              </OverviewText>
            </OverviewSection>

            <DetailsGrid>
              <DetailLabel>Genres:</DetailLabel>
              <DetailValue>{getGenres()}</DetailValue>

              <DetailLabel>Language:</DetailLabel>
              <DetailValue>
                {movie.original_language?.toUpperCase() || "N/A"}
              </DetailValue>

              <Watchnow>▶ Watch now</Watchnow>
            </DetailsGrid>
          </InfoSection>
        </ContentWrapper>
      </Container>

      <CastSection>
        <CastTitle>Series Cast</CastTitle>
        <CastRow>
          {cast.map((person) => (
            <CastMember key={person.id}>
              <CastImage
                src={
                  person.profile_path
                    ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                    : "/default-avatar.png"
                }
                alt={person.name}
              />
              <CastName>{person.name}</CastName>
              <CastCharacter>{person.character}</CastCharacter>
            </CastMember>
          ))}
        </CastRow>
      </CastSection>
    </>
  );
}

const Container = styled.div<ContainerProps>`
  background-image: ${(props) =>
    props.$backgroundImage ? `url(${props.$backgroundImage})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(0, 0, 0, 0.9) 100%
    );
    z-index: 1;
  }

  @media (max-width: 768px) {
    min-height: auto;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  gap: 40px;
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    gap: 30px;
    padding: 50px 30px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 40px 20px;
  }

  @media (max-width: 480px) {
    padding: 30px 15px;
    gap: 25px;
  }
`;

const PosterSection = styled.div`
  flex-shrink: 0;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
`;

const PosterImage = styled.img`
  width: 300px;
  height: 450px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 1024px) {
    width: 280px;
    height: 420px;
  }

  @media (max-width: 768px) {
    width: 250px;
    height: 375px;
  }

  @media (max-width: 480px) {
    width: 220px;
    height: 330px;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  color: white;

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  font-style: italic;
  margin-bottom: 30px;
  opacity: 0.8;

  @media (max-width: 1024px) {
    font-size: 1.1rem;
    margin-bottom: 25px;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 15px;
  }
`;

const InteractiveSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    gap: 15px;
    margin-bottom: 20px;
  }
`;

const IconButtonWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const IconButton = styled.button<IconButtonProps>`
  background: none;
  border: none;
  color: ${(props) => {
    if (props.$isFavorite) return "#ff4444";
    if (props.$isInWatchlist) return "#4ecdc4";
    return "white";
  }};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
    padding: 6px;
  }
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  pointer-events: none;
  z-index: 10;

  ${IconButtonWrapper}:hover & {
    opacity: 1;
    visibility: visible;
    bottom: 120%;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
    padding: 4px 8px;
  }
`;

const PlayTrailerButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  font-size: 1rem;

  @media (max-width: 768px) {
    justify-content: center;
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    gap: 15px;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const OverviewSection = styled.div`
  margin-bottom: 30px;

  @media (max-width: 768px) {
    margin-bottom: 25px;
  }

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 10px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

const OverviewText = styled.p`
  line-height: 1.6;
  font-size: 1rem;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 20px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
    text-align: center;
  }
`;

const DetailLabel = styled.span`
  font-weight: bold;
  opacity: 0.8;

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const DetailValue = styled.span`
  opacity: 0.9;
`;

const CastSection = styled.div`
  background: #ffffffff;
  padding: 40px;
  color: white;

  @media (max-width: 1024px) {
    padding: 30px;
  }

  @media (max-width: 768px) {
    padding: 25px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const CastTitle = styled.h2`
  font-size: 1.4rem;
  margin-bottom: 20px;
  font-weight: 600;
  color: black;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    margin-bottom: 15px;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    margin-bottom: 12px;
  }
`;

const CastRow = styled.div`
  display: flex;
  gap: 1.3rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  padding-left: 1rem;
  scrollbar-width: thin;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #9f9f9fff;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 768px) {
    gap: 1rem;
    padding-left: 0.5rem;
  }

  @media (max-width: 480px) {
    gap: 0.8rem;
    padding-left: 0.25rem;
  }
`;

const CastMember = styled.div`
  text-align: center;
  flex-shrink: 0;

  @media (max-width: 480px) {
    min-width: 80px;
  }
`;

const CastImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    width: 90px;
    height: 90px;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    margin-bottom: 8px;
  }
`;

const CastName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
  color: black;
  font-size: 0.9rem;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 3px;
  }
`;

const CastCharacter = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
  color: black;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;
`;

const LoadingText = styled.div`
  color: white;
  font-size: 1.5rem;
`;

const Watchnow = styled.button`
  display: flex;
  color: white;
  background: #484ef9ff;
  border: none;
  padding: 0.6rem 1.2rem;
  box-shadow: 0 10px 30px purple;
  margin-top: 1rem;
  justify-self: center;
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 10px 30px purple;
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    margin: 1rem auto 0 auto;
    padding: 0.5rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
`;
