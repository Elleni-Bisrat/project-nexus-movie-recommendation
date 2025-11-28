const BASE_URL = "https://api.themoviedb.org/3";
export async function fetchTrendingMovies(){
    const res= await fetch(`${BASE_URL}/trending/movie/week?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
    if(!res.ok) throw new Error("Failed to fetch trending movies");
    return res.json();
}
export async function fetchMovieDetails(){
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
  if(!res.ok) throw new Error("Failed to fetch trending movies");
    return res.json();
}

export const searchMovies = async (query: string) => {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=1&include_adult=false`
    );
    
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};
