"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MovieCard from "@/components/MovieCard";
import styled from "styled-components";
import { searchMovies } from "@/lib/api";

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 2rem;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const SearchQuery = styled.span`
  color: #d32f2f;
  font-style: italic;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const LoadingText = styled.div`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  padding: 4rem;
`;

const ErrorText = styled.div`
  text-align: center;
  color: #d32f2f;
  font-size: 1.2rem;
  padding: 4rem;
`;

const NoResultsText = styled.div`
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  padding: 4rem;
  font-style: italic;
`;

const ResultsCount = styled.div`
  color: #666;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await searchMovies(query);
        setSearchResults(data.results || []);
      } catch (err) {
        setError("Failed to search movies. Please try again.");
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query]);

  if (!query) {
    return (
      <Container>
        <Content>
          <Title>Search Movies</Title>
          <NoResultsText>
            Please enter a search term to find movies.
          </NoResultsText>
        </Content>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Content>
          <Title>
            Searching for <SearchQuery>{query}</SearchQuery>
          </Title>
          <LoadingText>Searching movies...</LoadingText>
        </Content>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Content>
          <Title>
            Search Results for <SearchQuery>{query}</SearchQuery>
          </Title>
          <ErrorText>{error}</ErrorText>
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <Title>
          Search Results for <SearchQuery>{query}</SearchQuery>
        </Title>

        <ResultsCount>
          Found {searchResults.length}{" "}
          {searchResults.length === 1 ? "movie" : "movies"}
        </ResultsCount>

        {searchResults.length > 0 ? (
          <ResultsGrid>
            {searchResults.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                rating={movie.vote_average}
              />
            ))}
          </ResultsGrid>
        ) : (
          <NoResultsText>
            No movies found for <SearchQuery>{query}</SearchQuery>. Try a
            different search term.
          </NoResultsText>
        )}
      </Content>
    </Container>
  );
}
