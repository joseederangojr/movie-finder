import type { Movie, Type, MovieDetails } from "@/types/movie";

export type SearchMovieParams = {
	query: string;
	type: Type;
	year: string;
};

export async function searchMovies({
	query,
	type,
	year,
}: SearchMovieParams): Promise<Movie[]> {
	const params = new URLSearchParams({ query, type, year });
	const response = await fetch(`/api/search?${params.toString()}`);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.error || "An error occurred while fetching movies.",
		);
	}

	return response.json();
}

export async function searchMovieById(id: string): Promise<MovieDetails> {
	const response = await fetch(`/api/movie/${id}`);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.error || "Failed to fetch movie details.");
	}

	return response.json();
}
