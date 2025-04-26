import * as React from "react";
import { Type } from "@/types/movie";
import { parseAsString, useQueryStates } from "nuqs";
import { useDebounceValue } from "./use-debounce-value";

export const useMovieSearchParams = () => {
	const [params, setParams] = useQueryStates({
		query: parseAsString.withDefault(""),
		type: parseAsString.withDefault(""),
		year: parseAsString.withDefault(""),
	});

	const [debouncedValue, setDebouncedValue] = useDebounceValue(
		params.query,
		1000,
	);

	const setSearch = React.useCallback(
		(query: string) => {
			setParams((prev) => ({
				...prev,
				query,
			}));
			setDebouncedValue(query);
		},
		[setParams],
	);

	const setType = React.useCallback(
		(type: Type) => setParams((prev) => ({ ...prev, type })),
		[setParams],
	);

	const setYear = React.useCallback(
		(year: string) => setParams((prev) => ({ ...prev, year })),
		[setParams],
	);

	const reset = React.useCallback(() => {
		setParams({ query: "", type: "", year: "" });
	}, [setParams]);

	return {
		params: {
			...params,
			debounceQuery: debouncedValue,
		},
		setSearch,
		setType,
		setYear,
		reset,
	};
};
