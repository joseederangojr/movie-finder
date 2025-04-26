"use client";
import { SearchForm } from "@/components/SearchForm";
import { MovieList } from "@/components/MovieList";
import { cn } from "@/lib/utils";
import { useMovieSearchParams } from "@/hooks/use-movie-search-params";

export default function Home() {
	const { params } = useMovieSearchParams();
	const isExpanded = !!(params.query || params.type !== "" || params.year);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500 ease-in-out px-4 sm:px-6 lg:px-8">
			<main
				className={cn(
					"text-center transition-all duration-500 ease-in-out w-full",
					isExpanded &&
						"fixed top-0 left-0 p-4 bg-gray-50 dark:bg-gray-900 z-10 h-full overflow-auto",
				)}
			>
				<h1
					className={cn(
						"mb-8 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 dark:from-gray-100 dark:to-gray-300 transition-all duration-500 ease-in-out",
						isExpanded && "text-2xl sm:text-3xl mb-4",
					)}
				>
					MovieFinder
				</h1>
				<SearchForm />
				{isExpanded && (
					<div className="w-full max-w-3xl mx-auto mt-4">
						<MovieList />
					</div>
				)}
			</main>
			<footer
				className={cn(
					"absolute bottom-4 text-center text-xs text-gray-500 dark:text-gray-400 transition-opacity duration-500 ease-in-out",
					isExpanded ? "opacity-0" : "opacity-100",
				)}
			>
				© 2024 MovieFinder. All rights reserved.
			</footer>
		</div>
	);
}
