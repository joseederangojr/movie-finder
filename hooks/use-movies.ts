import { useQuery } from "@tanstack/react-query";
import {
	searchMovies,
	searchMovieById,
	type SearchMovieParams,
} from "../lib/api";
import type { Movie, MovieDetails } from "@/types/movie";

export function useMovieSearch(params: SearchMovieParams) {
	return useQuery<Movie[], Error>({
		queryKey: ["movies", params],
		queryFn: () => searchMovies(params),
		enabled: !!params.query,
		retry(_, error) {
			return error.message !== "No movies found";
		},
	});
}

export function useMovieDetails(id: string) {
	return useQuery<MovieDetails, Error>({
		queryKey: ["movie", id],
		queryFn: () => searchMovieById(id),
		enabled: !!id,
	});
}
