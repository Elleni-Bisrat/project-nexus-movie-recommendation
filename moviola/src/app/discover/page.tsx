"use client";
import React, { useEffect, useState } from "react";
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
  padding-top:0;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  height: fit-content;
  top: 2rem;
  margin-top:.7rem;
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
margin-top:0px;
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
  padding: 0.3rem .1rem;
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
  margin-left:4rem;
`;

const Label = styled.label`
  font-size:12px;
`;

const ExpandIcon = styled.span`
  font-size: 0.8rem;
  transition: transform 0.2s ease;
`;

export default function Discover() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showOption, setShowOption] = useState("everything");
  const [sortOption, setSortOption] = useState("popularity");
  const [filterExpanded, setFilterExpanded] = useState(true);
  const [sortExpanded, setSortExpanded] = useState(false);

  const genresCategories = [
    "All",
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "History",
    "Horror",
    "Music",
    "Mystery",
    "Romance",
    "Science Fiction",
    "TV Movie",
    "War",
  ];
  const genreMap :Record<string,number>={
    Action:28,
    Romance:10749,
    Comedy:35,
    "Science Fiction":878,
    Horror:27,
    Adventure:100,
    Animation:40,
    Crime:22,
    Documentary:33,
    Drama:56,
    Family:66,
    Fantasy:78,
    History:88,
    Music:7,
    Mystery:99,
    "TV Movie":55,
    War:55,
  }

 const filterdMovies = popularMovies.filter((movie)=>{
    if(selectedGenre === "All") return true;
    if(!movie.genre_ids) return false;
    return movie.genre_ids.includes(genreMap[selectedGenre]);

 })

  const sortOptions = [
    { id: "popularity", label: "Popularity" },
    { id: "rating", label: "Rating" },
    { id: "alphabetical", label: "Alphabetical" },
  ];

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

  return (
    <>
      <PageTitle>Popular Movies</PageTitle>
      <Container>
        <FilterSection>
          {/* Filter Section */}
          <FilterGroup>
            <SectionTitle onClick={() => setFilterExpanded(!filterExpanded)}>
              Filter
              <ExpandIcon>{filterExpanded ? 'v' : '>'}</ExpandIcon>
            </SectionTitle>
            
            {filterExpanded && (
              <>
                <RadioGroup>
                  <SectionTitle style={{ cursor: 'default', margin: '0.5rem 0' }}>Show Me</SectionTitle>
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
                <SectionTitle style={{ cursor: 'default', margin: '1rem 0 0.5rem 0' }}>Genres</SectionTitle>
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
              <ExpandIcon>{sortExpanded ? 'v' : '>'}</ExpandIcon>
            </SectionTitle>
            
            {sortExpanded && (
              <SortOptions>
                {sortOptions.map((option) => (
                  <SortOption key={option.id} onClick={() => setSortOption(option.id)}>
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
        </FilterSection>

        <MainSection>
          <MovieGrid>
            {filterdMovies.map((popmovie, index) => (
              <MovieCard
                key={popmovie.id || index}
                id={popmovie.id}
                title={popmovie.title}
                poster={`https://image.tmdb.org/t/p/w500${popmovie.poster_path}`}
                rating={popmovie.vote_average}
              />
            ))}
          </MovieGrid>
        </MainSection>
      </Container>
    </>
  );
}