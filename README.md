##Deploye link = https://project-nexus-movie-recommendation-green.vercel.app/

# project-nexus-movie-recommendation

# Moviola — Movie Recommendation & Discovery App

Moviola is a modern, responsive web application for discovering movies, exploring detailed information, and managing a personal watchlist. Built with Next.js, TypeScript, and Styled Components, it delivers a cinematic user experience powered by real-time data from The Movie Database (TMDB) API.

---

## Features

### Home Page

- Dynamic hero section with rotating backgrounds from trending movies
- Real-time display of trending and popular movies
- Responsive design optimized for all devices
- Smooth transitions and hover animations

### Movie Detail Page

**Includes:**

- High-quality posters and backdrop images
- Ratings, runtime, release year, and genres
- Movie overview and tagline
- Language and metadata

**Interactive Tools:**

- Add to Favorites
- Add to Watchlist (stored in localStorage)
- Tooltips on hover
- Play trailer button
- Cast section with actor images and character names

### Watchlist Management

- Save movies to a personal watchlist
- Persistent storage using localStorage
- One-click add/remove
- Clear all watchlist items
- View added dates
- Click items to open detailed pages

---

## UI/UX Highlights

- Clean, modern dark-themed design
- Gradient accents and smooth transitions
- Custom tooltips
- Styled Components for consistent styling
- Fully typed codebase with TypeScript

---

## Technical Stack

### Frontend

- Next.js 14 (App Router)
- React
- TypeScript
- Styled Components

### API

- TMDB API for movie data, metadata, cast information, and images

### State Management

- React Context API
- LocalStorage persistence
- useState and useEffect for component logic

---

## Project Structure

src/
├── app/
│ ├── layout.tsx # Root layout with providers
│ ├── page.tsx # Home page
│ ├── movie/
│ │ └── [id]/
│ │ └── page.tsx # Movie detail pages
│ └── watchlist/
│ └── page.tsx # Watchlist page
│
├── components/
│ ├── MovieCard.tsx # Movie card component
│ ├── MovieDetail.tsx # Movie detail view
│ └── Header.tsx # Navigation header
│
├── contexts/
│ └── WatchlistContext.tsx # Global watchlist state
│
└── styles/
├── globalstyles.ts # Global styles
└── theme.ts # Design tokens

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone [repository-url]
cd moviola

2. Install dependencies
npm install

3. Environment variables
Create a .env.local file:
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here

4. Run the development server
npm run dev


Responsive Design


Mobile-first approach


Flexible grid layouts


Adaptive typography


Touch-friendly interactions


Optimized images for various breakpoints



Design System
Colors


Primary: Red and purple accents (#d32f2f, #6e38e0)


Background: Dark UI for cinematic experience


Accents: Gradient elements for depth


Typography


Clean, readable font hierarchy


Occasional gradient text styles for branding


Interactions


Smooth hover effects


Micro-animations for UI feedback


Tooltip system for clarity



Future Enhancements


User authentication and profiles


Advanced search and filtering


Recommendation engine


User reviews and ratings


Streaming availability integration


Watchlist categories


Light/dark theme toggle


Internationalization support

```
