"use client";

import { GloblaStyle } from "@/styles/globalstyles";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WatchlistProvider } from "@/contexts/WatchlistContext";
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ThemeProvider theme={theme}>
          <GloblaStyle />
          <WatchlistProvider>{children}</WatchlistProvider>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
