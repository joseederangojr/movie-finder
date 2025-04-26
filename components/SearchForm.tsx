"use client";
import { SearchInput } from "./SearchInput";
import { YearInput } from "./YearInput";
import { FilterRadioGroup } from "./FilterRadioGroup";
import type { Type } from "@/types/movie";
import { useMovieSearchParams } from "@/hooks/use-movie-search-params";

export function SearchForm() {
	const { params, ...actions } = useMovieSearchParams();
	const isExpanded = !!(params.query || params.type !== "" || params.year);

	return (
		<div
			className={`mx-auto mb-4 transition-all duration-500 ease-in-out ${
				isExpanded ? "w-full max-w-3xl" : "w-full max-w-md"
			}`}
		>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="flex flex-col sm:flex-row mb-4 items-stretch gap-2">
					<SearchInput
						search={params.query}
						onSearch={actions.setSearch}
						onReset={actions.reset}
						expand={isExpanded}
					/>
					<YearInput
						year={params.year}
						onYearChange={actions.setYear}
						expand={isExpanded}
					/>
				</div>
				<div className="flex flex-wrap justify-center items-center gap-4 mb-4">
					<FilterRadioGroup
						value={params.type as Type}
						onChange={actions.setType}
					/>
				</div>
			</form>
		</div>
	);
}
