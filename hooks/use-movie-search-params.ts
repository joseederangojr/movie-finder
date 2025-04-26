import * as React from "react";
import { Type } from "@/types/movie";
import { parseAsString, useQueryStates } from "nuqs";
import debounce from "lodash.debounce";

export const useMovieSearchParams = () => {
	const [params, setParams] = useQueryStates({
		query: parseAsString.withDefault(""),
		type: parseAsString.withDefault(""),
		year: parseAsString.withDefault(""),
	});

	const setSearch = React.useCallback(
		debounce((query: string) => {
			setParams((prev) => ({
				...prev,
				query,
			}));
		}, 300),
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
		params,
		setSearch,
		setType,
		setYear,
		reset,
	};
};
