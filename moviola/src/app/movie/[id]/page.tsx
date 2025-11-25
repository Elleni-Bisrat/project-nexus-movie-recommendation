"use client";
import { useParams } from "next/navigation";
import MovieDetail from "@/components/MovieDetail";

export default function MoviePage() {
  const params = useParams();
  const id = params.id;

  return <MovieDetail id={id} />;
}