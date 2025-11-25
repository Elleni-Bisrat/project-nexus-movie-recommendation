"use client";
import React, { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import styled from "styled-components";
import { fetchTrendingMovies } from "@/lib/api";
import { fetchMovieDetails } from "@/lib/api";
const Container = styled.div`
  min-height: 100vh;
  background: #ffffff;
  color: #ffffff;
`;

const HeroSection = styled.section<{ $bg: string }>`
  padding: 6rem 2rem 4rem;
  text-align: center;
  background-image: url(${(props) => props.$bg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-top: 1.5rem;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #c93b3bff, #510d0dff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
  letter-spacing: 0.2rem;
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  margin: 0 auto 3rem;
  line-height: 1.6;
`;
const Moviola = styled.span`
  background: linear-gradient(45deg, #d32f2f, #6e38e0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 0.4rem;
`;
const CTAButton = styled.button`
  background: linear-gradient(45deg, #7414d3ff, #ff5252);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(255, 0, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(211, 47, 47, 0.3);
  }
`;

const Section = styled.section`
  padding: 3rem 5rem;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #6c1ac9ff;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 2px;
    background: #d32f2f;
  }
`;

const MovieRow = styled.div`
  display: flex;
  gap: 1.3rem;
  overflow-x:auto;
  padding-bottom:1rem;
  padding-left:1rem;
  scrollbar-width:thin;
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #9f9f9fff;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
`;
export default function Home() {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching", error);
      }
    };
    fetchMovies();
  }, []);

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

  useEffect(() => {
    if (movies.length > 0) {
      const interval = setInterval(() => {
        setCurrentBackgroundIndex((prev) =>
          prev === movies.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [movies.length]);
  const bgImage =
    movies.length > 0
      ? `https://image.tmdb.org/t/p/original${movies[currentBackgroundIndex].backdrop_path}`
      : "/hero.jpg";
  return (
    <Container>
      <HeroSection $bg={bgImage}>
        <HeroTitle>
          Welcome To <Moviola>Moviola</Moviola>
        </HeroTitle>
        <HeroSubtitle>
          Your gateway to movies that move you. Discover, watch, and fall in
          love with cinema again.
        </HeroSubtitle>
        <CTAButton>Explore Movies</CTAButton>
      </HeroSection>
      <Section>
        <SectionTitle>Trending Now</SectionTitle>
        <MovieRow>
          {movies.map((movie, index) => (
            <MovieCard
              key={movie.id || index}
              id={movie.id}
              title={movie.title}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              rating={movie.vote_average}
            />
          ))}
        </MovieRow>
      </Section>
      <Section>
        <SectionTitle>popular movies</SectionTitle>
        <MovieRow>
          {popularMovies.map((popmovie, index) => (
            <MovieCard
              key={popmovie.id || index}
              id={popmovie.id}
              title={popmovie.title}
              poster={`https://image.tmdb.org/t/p/w500${popmovie.poster_path}`}
              rating={popmovie.vote_average}
            />
          ))}
        </MovieRow>
      </Section>
    </Container>
  );
}
