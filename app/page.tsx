"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SearchForm } from "@/components/SearchForm";
import { MovieList } from "@/components/MovieList";
import { useMovieSearch } from "@/lib/queries";
import type { FilterType } from "@/types/movie";
import debounce from "lodash.debounce";
import { cn } from "@/lib/utils";

export default function Home() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [isExpanded, setIsExpanded] = useState(false);

	const query = searchParams.get("query") || "";
	const filterType = (searchParams.get("filterType") as FilterType) || "all";
	const year = searchParams.get("year") || "";

	const {
		data: movies,
		isLoading,
		error,
	} = useMovieSearch(query, filterType, year);

	useEffect(() => {
		if (query || filterType !== "all" || year) {
			setIsExpanded(true);
		}
	}, [query, filterType, year]);

	const debouncedSearch = useCallback(
		debounce((newQuery: string, newFilterType: FilterType, newYear: string) => {
			const params = new URLSearchParams();
			if (newQuery) params.set("query", newQuery);
			if (newFilterType !== "all") params.set("filterType", newFilterType);
			if (newYear) params.set("year", newYear);
			router.push(`/?${params.toString()}`);
		}, 300),
		[],
	);

	const handleSearch = (
		newQuery: string,
		newFilterType: FilterType,
		newYear: string,
	) => {
		debouncedSearch(newQuery, newFilterType, newYear);
	};

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
				<SearchForm
					onSearch={handleSearch}
					isExpanded={isExpanded}
					setIsExpanded={setIsExpanded}
					initialQuery={query}
					initialFilterType={filterType}
					initialYear={year}
				/>
				{isExpanded && (
					<div className="w-full max-w-3xl mx-auto mt-4">
						<MovieList
							movies={movies || []}
							isLoading={isLoading}
							error={error?.message || null}
						/>
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
