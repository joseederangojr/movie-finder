"use client";
import Link from "next/link";
import type { Type } from "@/types/movie";
import { Skeleton } from "@/components/ui/skeleton";
import { useMovieSearch } from "@/hooks/use-movies";
import { useMovieSearchParams } from "@/hooks/use-movie-search-params";

export function MovieList() {
	const { params } = useMovieSearchParams();
	const {
		data: movies,
		isLoading,
		error,
	} = useMovieSearch({
		query: params.debounceQuery,
		type: params.type as Type,
		year: params.year,
	});

	if (isLoading) {
		return (
			<div className="space-y-4">
				{[...Array(5)].map((_, i) => (
					<div
						key={i}
						className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
					>
						<Skeleton className="bg-gray-300 dark:bg-gray-600 h-36 w-24 rounded-md" />
						<div className="space-y-2 w-full sm:w-auto">
							<Skeleton className="bg-gray-300 dark:bg-gray-600 h-4 w-full sm:w-[250px]" />
							<Skeleton className="bg-gray-300 dark:bg-gray-600 h-4 w-full sm:w-[200px]" />
							<Skeleton className="bg-gray-300 dark:bg-gray-600 h-4 w-full sm:w-[150px]" />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (error) {
		return <p className="text-red-500 text-center">{error.message}</p>;
	}

	if (movies?.length === 0) {
		return <p className="text-center">No movies found.</p>;
	}

	return (
		<ul className="space-y-4">
			{movies?.map((movie) => (
				<li
					key={movie.imdbID}
					className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
				>
					<Link
						href={`/movie/${movie.imdbID}`}
						className="flex flex-col sm:flex-row items-center p-4"
					>
						<img
							src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
							alt={movie.Title}
							className="w-full sm:w-24 h-36 object-cover rounded-md mb-4 sm:mb-0 sm:mr-4"
						/>
						<div className="flex-1 text-center sm:text-left">
							<h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
								{movie.Title}
							</h3>
							<p className="text-gray-600 dark:text-gray-400 mb-1">
								Year: {movie.Year}
							</p>
							<p className="text-gray-600 dark:text-gray-400 mb-1">
								Type: {movie.Type}
							</p>
							<p className="text-gray-600 dark:text-gray-400">
								IMDb ID: {movie.imdbID}
							</p>
						</div>
					</Link>
				</li>
			))}
		</ul>
	);
}
