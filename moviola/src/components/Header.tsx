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
  background: ;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.3);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  border-radius: 0.2rem;
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
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 0 1 400px;
  margin: 0 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.1rem 1rem 0.4rem 3rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(24, 22, 22, 0.1);
  border-radius: 50px;
  color: #0e0b0bff;
  font-size: 0.8rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(34, 30, 30, 0.5);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(211, 47, 47, 0.4);
    box-shadow: 0 0 0 2px rgba(211, 47, 47, 0.1);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 1rem;
  top: 40%;
  transform: translateY(-50%);
  font-size: 1rem;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: rgba(125, 75, 242, 0.98);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 0;
  position: relative;
  transition: all 0.3s ease;

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
`;

const FavoriteLink = styled(NavLink)`
  color: #962222ff;
  font-weight: 600;

  &:hover {
    color: #9d2222ff;
  }
`;

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push("/discover");
    }
  };
  return (
    <Nav>
      <Logo>
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
      </SearchContainer>

      <NavLinks>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/discover">movies</NavLink>
        <FavoriteLink href="/favorites">Favorites</FavoriteLink>
        <NavLink href="/watchlist">Watchlist</NavLink>
      </NavLinks>
    </Nav>
  );
}
