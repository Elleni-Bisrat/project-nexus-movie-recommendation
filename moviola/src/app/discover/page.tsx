"use client";
import React, { useEffect, useState, useMemo } from "react";
import MovieCard from "@/components/MovieCard";
import styled from "styled-components";
import { fetchMovieDetails } from "@/lib/api";

const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
`;

const FilterSection = styled.section`
  background: white;
  padding: 2rem;
  padding-top: 0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
  top: 2rem;
  margin-top: 0.7rem;
`;

const MainSection = styled.section`
  padding: 0 0;
`;

const FilterTitle = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #111112ff;
  margin: 1.5rem 0 1rem 0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    color: #3182ce;
  }
`;

const FilterGroup = styled.div`
  margin-top: 0px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.3rem 0;

  &:hover {
    color: #3182ce;
  }
`;

const RadioInput = styled.input`
  width: 10px;
  height: 10px;
  accent-color: #3182ce;
  cursor: pointer;
`;

const GenresGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const GenreButton = styled.button`
  padding: 0.3rem 0.1rem;
  border: 1px solid #cbd5e0;
  border-radius: 15px;
  background: ${(props) => (props.selected ? "#3182ce" : "white")};
  color: ${(props) => (props.selected ? "white" : "#4a5568")};
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.selected ? "#3182ce" : "#f7fafc")};
    border-color: #3182ce;
    transform: translateY(-1px);
  }
`;

const SortOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 1rem;
`;

const SortOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.3rem 0;

  &:hover {
    color: #3182ce;
  }
`;

const SortInput = styled.input`
  width: 10px;
  height: 10px;
  accent-color: #3182ce;
  cursor: pointer;
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(to right, transparent, #cbd5e0, transparent);
  margin: 1rem 0;
`;

const MovieGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;
  padding: 1rem 0;
`;

const PageTitle = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: #2d3748;
  margin-top: 2rem;
  margin-left: 4rem;
`;

const Label = styled.label`
  font-size: 12px;
`;

const ExpandIcon = styled.span`
  font-size: 0.8rem;
  transition: transform 0.2s ease;
`;

const ResultsInfo = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  padding: 0 1rem;
`;

const ClearFiltersButton = styled.button`
  background: #e53e3e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.8rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background: #c53030;
    transform: translateY(-1px);
  }
`;

export default function Discover() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showOption, setShowOption] = useState("everything");
  const [sortOption, setSortOption] = useState("popularity");
  const [filterExpanded, setFilterExpanded] = useState(true);
  const [sortExpanded, setSortExpanded] = useState(false);
  const [watchedMovies, setWatchedMovies] = useState<number[]>([]);

  const genresCategories = [
    "All",
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Drama",
    "Family",
    "Fantasy",
    "Horror",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "War",
  ];

  const genreMap: Record<string, number> = {
    Action: 28,
    Romance: 10749,
    Comedy: 35,
    "Science Fiction": 878,
    Horror: 27,
    Adventure: 12,
    Animation: 16,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Music: 10402,
    Mystery: 9648,
    "TV Movie": 10770,
    War: 10752,
  };

  // Load watched movies from localStorage
  useEffect(() => {
    const savedWatched = localStorage.getItem('watchedMovies');
    if (savedWatched) {
      setWatchedMovies(JSON.parse(savedWatched));
    }
  }, []);

  // Save watched movies to localStorage
  useEffect(() => {
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
  }, [watchedMovies]);

  const toggleWatched = (movieId: number) => {
    setWatchedMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  };

  // Filter and sort movies using useMemo for performance
  const filteredAndSortedMovies = useMemo(() => {
    let filtered = popularMovies.filter((movie) => {
      // Genre filter
      if (selectedGenre !== "All") {
        if (!movie.genre_ids || !movie.genre_ids.includes(genreMap[selectedGenre])) {
          return false;
        }
      }

      // "Show Me" filter
      switch (showOption) {
        case "seen":
          return watchedMovies.includes(movie.id);
        case "not-seen":
          return !watchedMovies.includes(movie.id);
        case "everything":
        default:
          return true;
      }
    });

    // Sort movies
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "rating":
          return (b.vote_average || 0) - (a.vote_average || 0);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        case "popularity":
        default:
          return (b.popularity || 0) - (a.popularity || 0);
      }
    });

    return filtered;
  }, [popularMovies, selectedGenre, showOption, sortOption, watchedMovies]);

  const sortOptions = [
    { id: "popularity", label: "Popularity" },
    { id: "rating", label: "Rating" },
    { id: "alphabetical", label: "Alphabetical" },
  ];

  const clearAllFilters = () => {
    setSelectedGenre("All");
    setShowOption("everything");
    setSortOption("popularity");
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const data = await fetchMovieDetails();
        setPopularMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchPopularMovies();
  }, []);

  const hasActiveFilters = selectedGenre !== "All" || showOption !== "everything" || sortOption !== "popularity";

  return (
    <>
      <PageTitle>Popular Movies</PageTitle>
      <Container>
        <FilterSection>
          {/* Filter Section */}
          <FilterGroup>
            <SectionTitle onClick={() => setFilterExpanded(!filterExpanded)}>
              Filter
              <ExpandIcon>{filterExpanded ? "▼" : "▶"}</ExpandIcon>
            </SectionTitle>

            {filterExpanded && (
              <>
                <RadioGroup>
                  <SectionTitle
                    style={{ cursor: "default", margin: "0.5rem 0" }}
                  >
                    Show Me
                  </SectionTitle>
                  <RadioOption onClick={() => setShowOption("everything")}>
                    <RadioInput
                      type="radio"
                      id="everything"
                      name="show-me"
                      checked={showOption === "everything"}
                      onChange={() => setShowOption("everything")}
                    />
                    <Label htmlFor="everything">Everything</Label>
                  </RadioOption>
                  <RadioOption onClick={() => setShowOption("not-seen")}>
                    <RadioInput
                      type="radio"
                      id="not-seen"
                      name="show-me"
                      checked={showOption === "not-seen"}
                      onChange={() => setShowOption("not-seen")}
                    />
                    <Label htmlFor="not-seen">Movies I Haven't Seen</Label>
                  </RadioOption>
                  <RadioOption onClick={() => setShowOption("seen")}>
                    <RadioInput
                      type="radio"
                      id="seen"
                      name="show-me"
                      checked={showOption === "seen"}
                      onChange={() => setShowOption("seen")}
                    />
                    <Label htmlFor="seen">Movies I Have Seen</Label>
                  </RadioOption>
                </RadioGroup>

                <Divider />

                {/* Genres Section */}
                <SectionTitle
                  style={{ cursor: "default", margin: "1rem 0 0.5rem 0" }}
                >
                  Genres
                </SectionTitle>
                <GenresGrid>
                  {genresCategories.map((category) => (
                    <GenreButton
                      key={category}
                      selected={selectedGenre === category}
                      onClick={() => setSelectedGenre(category)}
                    >
                      {category}
                    </GenreButton>
                  ))}
                </GenresGrid>
              </>
            )}
          </FilterGroup>

          <Divider />

          {/* Sort Section */}
          <FilterGroup>
            <SectionTitle onClick={() => setSortExpanded(!sortExpanded)}>
              Sort
              <ExpandIcon>{sortExpanded ? "▼" : "▶"}</ExpandIcon>
            </SectionTitle>

            {sortExpanded && (
              <SortOptions>
                {sortOptions.map((option) => (
                  <SortOption
                    key={option.id}
                    onClick={() => setSortOption(option.id)}
                  >
                    <SortInput
                      type="radio"
                      id={option.id}
                      name="sort-by"
                      checked={sortOption === option.id}
                      onChange={() => setSortOption(option.id)}
                    />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </SortOption>
                ))}
              </SortOptions>
            )}
          </FilterGroup>

          {hasActiveFilters && (
            <ClearFiltersButton onClick={clearAllFilters}>
              Clear All Filters
            </ClearFiltersButton>
          )}
        </FilterSection>

        <MainSection>
          <MovieGrid>
            {filteredAndSortedMovies.map((movie, index) => (
              <div key={movie.id || index} style={{ position: 'relative' }}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average}
                />
                <button
                  onClick={() => toggleWatched(movie.id)}
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    background: watchedMovies.includes(movie.id) ? '#3182ce' : 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    zIndex: 10
                  }}
                  title={watchedMovies.includes(movie.id) ? "Mark as unwatched" : "Mark as watched"}
                >
                  {watchedMovies.includes(movie.id) ? '✓' : '○'}
                </button>
              </div>
            ))}
          </MovieGrid>
        </MainSection>
      </Container>
    </>
  );
}
