"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 3rem;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-radius: 0.2rem;

  @media (max-width: 1024px) {
    padding: 0.5rem 2rem;
  }

  @media (max-width: 768px) {
    padding: 0.5rem 1.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    gap: 0.8rem;
  }
`;

const Logo = styled.h1`
  color: #d32f2f;
  font-size: 1.3rem;
  font-weight: 600;
  font-family: "Playfair Display", "Georgia", serif;
  letter-spacing: 0.5px;
  margin: 0;
  background: linear-gradient(45deg, #d32f2f, #6e38e0ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    text-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    letter-spacing: 0.4px;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
    letter-spacing: 0.3px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 0 1 400px;
  margin: 0 2rem;

  @media (max-width: 1024px) {
    flex: 0 1 350px;
    margin: 0 1.5rem;
  }

  @media (max-width: 768px) {
    flex: 1 1 100%;
    order: 3;
    margin: 0;
    min-width: 100%;
  }

  @media (max-width: 480px) {
    flex: 1 1 100%;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 3rem;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(24, 22, 22, 0.1);
  border-radius: 50px;
  color: #0e0b0b;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(34, 30, 30, 0.5);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 1);
    border-color: rgba(211, 47, 47, 0.4);
    box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.1);
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    font-size: 0.85rem;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 1rem;

  @media (max-width: 480px) {
    left: 0.8rem;
    font-size: 0.9rem;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(45deg, #d32f2f, #6e38e0ff);
  border: none;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-50%) scale(1.05);
    box-shadow: 0 2px 8px rgba(211, 47, 47, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: translateY(-50%);
  }

  @media (max-width: 480px) {
    padding: 0.3rem 0.7rem;
    font-size: 0.75rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 1024px) {
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    gap: 1.2rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const NavLink = styled(Link)`
  color: rgba(125, 75, 242, 0.98);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #d32f2f, #ff5252);
    transition: width 0.3s ease;
  }

  &:hover {
    color: #6c40dcff;

    &::after {
      width: 100%;
    }
  }

  @media (max-width: 1024px) {
    font-size: 0.85rem;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
    padding: 0.3rem 0;
  }
`;

const FavoriteLink = styled(NavLink)`
  color: #962222ff;
  font-weight: 600;

  &:hover {
    color: #9d2222ff;
  }
`;

const MobileMenuWrapper = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    
    try {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      handleSearch();
    }
  };

  const handleLogoClick = () => {
    setSearchTerm("");
    router.push("/");
  };

  return (
    <Nav>
      <Logo onClick={handleLogoClick}>
        <Link href="/">Moviola</Link>
      </Logo>

      <SearchContainer>
        <SearchIcon>🔍</SearchIcon>
        <SearchInput
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search for movies, genres, actors..."
        />
        {searchTerm.trim() && (
          <SearchButton 
            onClick={handleSearch}
            disabled={isSearching || !searchTerm.trim()}
          >
            {isSearching ? "..." : "Search"}
          </SearchButton>
        )}
      </SearchContainer>

      <NavLinks>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/discover">Movies</NavLink>
        <FavoriteLink href="/favorites">Favorites</FavoriteLink>
        <NavLink href="/watchlist">Watchlist</NavLink>
      </NavLinks>
    </Nav>
  );
}