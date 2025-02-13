import type { Movie, FilterType, MovieDetails } from "@/types/movie"

export async function searchMovies(query: string, filterType: FilterType, year: string): Promise<Movie[]> {
  const params = new URLSearchParams({ query, filterType, year })
  const response = await fetch(`/api/search?${params}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "An error occurred while fetching movies.")
  }

  return response.json()
}

export async function searchMovieById(id: string): Promise<MovieDetails> {
  const response = await fetch(`/api/movie/${id}`)

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || "Failed to fetch movie details.")
  }

  return response.json()
}

