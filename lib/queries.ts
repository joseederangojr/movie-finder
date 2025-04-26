import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchMovies, searchMovieById, type SearchMovieParams } from "./api";
import type { Movie, Type, MovieDetails } from "@/types/movie";

export function useMovieSearch(params: SearchMovieParams) {
	return useQuery<Movie[], Error>({
		queryKey: ["movies", params],
		queryFn: () => searchMovies(params),
		enabled: !!params.query,
	});
}

export function useMovieDetails(id: string) {
	return useQuery<MovieDetails, Error>({
		queryKey: ["movie", id],
		queryFn: () => searchMovieById(id),
		enabled: !!id,
	});
}
