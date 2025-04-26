import { NextResponse } from "next/server";
import type { Type } from "@/types/movie";
import cache from "@/lib/cache";

const API_KEY = process.env.COLLECT_API_KEY;
const CACHE_TTL = 60; // 1 minute

export async function GET(request: Request) {
	const url = new URL(request.url);
	const query = url.searchParams.get("query");
	const type = (url.searchParams.get("type") || "") as Type;
	const year = url.searchParams.get("year") || "";

	if (!query) {
		return NextResponse.json(
			{ error: "Query parameter is required" },
			{ status: 400 },
		);
	}

	const searchParams = new URLSearchParams({ query, type, year });

	const cacheKey = `search:${searchParams.toString()}`;

	// Try to get data from cache
	const cachedData = await cache.get(cacheKey);
	if (cachedData) {
		console.info("Serving from cache");
		return NextResponse.json(JSON.parse(cachedData));
	}

	try {
		const response = await fetch(
			`https://api.collectapi.com/imdb/imdbSearchByName?${searchParams.toString()}`,
			{
				headers: {
					authorization: `apikey ${API_KEY}`,
					"content-type": "application/json",
				},
			},
		);

		const data = await response.json();

		if (data.success) {
			// Cache the successful response
			await cache.set(cacheKey, JSON.stringify(data.result), CACHE_TTL);
			return NextResponse.json(data.result);
		} else {
			return NextResponse.json({ error: "No movies found" }, { status: 404 });
		}
	} catch (error) {
		return NextResponse.json(
			{ error: "An error occurred while fetching movies." },
			{ status: 500 },
		);
	}
}
