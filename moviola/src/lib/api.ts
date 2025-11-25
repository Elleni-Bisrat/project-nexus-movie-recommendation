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