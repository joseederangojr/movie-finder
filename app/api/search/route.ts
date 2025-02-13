import { NextResponse } from "next/server";
import type { FilterType } from "@/types/movie";
import cache from "@/lib/cache";

const API_KEY = process.env.COLLECT_API_KEY;
const CACHE_TTL = 60; // 1 minute

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const query = searchParams.get("query");
	const filterType = searchParams.get("filterType") as FilterType;
	const year = searchParams.get("year");

	if (!query) {
		return NextResponse.json(
			{ error: "Query parameter is required" },
			{ status: 400 },
		);
	}

	const cacheKey = `search:${query}:${filterType || "all"}:${year || ""}`;

	// Try to get data from cache
	const cachedData = await cache.get(cacheKey);
	if (cachedData) {
		console.info("Serving from cache");
		return NextResponse.json(JSON.parse(cachedData));
	}
	let url = `https://api.collectapi.com/imdb/imdbSearchByName?query=${encodeURIComponent(query)}`;
	if (filterType && filterType !== "all") {
		url += `&type=${filterType}`;
	}
	if (year) {
		url += `&year=${year}`;
	}

	try {
		const response = await fetch(url, {
			headers: {
				authorization: `apikey ${API_KEY}`,
				"content-type": "application/json",
			},
		});

		const data = await response.json();

		if (data.success) {
			// Cache the successful response
			await cache.set(cacheKey, JSON.stringify(data.result), CACHE_TTL);
			return NextResponse.json(data.result);
		} else {
			return NextResponse.json(
				{ error: data.message || "An error occurred while fetching movies." },
				{ status: 500 },
			);
		}
	} catch (error) {
		return NextResponse.json(
			{ error: "An error occurred while fetching movies." },
			{ status: 500 },
		);
	}
}
