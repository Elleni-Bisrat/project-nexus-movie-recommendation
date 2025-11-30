"use client";
import { GloblaStyle } from "@/styles/globalstyles";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import { SearchProvider } from "@/contexts/SearchContext";
import { WatchlistProvider } from "@/contexts/WatchlistContext";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ThemeProvider theme={theme}>
          <GloblaStyle />
          <FavoriteProvider>
            <SearchProvider>
              <WatchlistProvider>{children}</WatchlistProvider>
            </SearchProvider>
          </FavoriteProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}