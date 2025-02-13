"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { searchMovies, searchMovieById } from "./api";
import type { Movie, FilterType, MovieDetails } from "@/types/movie";
import { useEffect } from "react";
import debounce from "lodash.debounce";

export function useMovieSearch(
	query: string,
	filterType: FilterType,
	year: string,
) {
	const queryClient = useQueryClient();

	useEffect(() => {
		const debouncedInvalidate = debounce(() => {
			queryClient.invalidateQueries(["movies", { query, filterType, year }]);
		}, 300);

		debouncedInvalidate();

		return () => {
			debouncedInvalidate.cancel();
		};
	}, [query, filterType, year, queryClient]);

	return useQuery<Movie[], Error>({
		queryKey: ["movies", { query, filterType, year }],
		queryFn: () => searchMovies(query, filterType, year),
		enabled: !!query,
	});
}

export function useMovieDetails(id: string) {
	return useQuery<MovieDetails, Error>({
		queryKey: ["movie", id],
		queryFn: () => searchMovieById(id),
		enabled: !!id,
	});
}
