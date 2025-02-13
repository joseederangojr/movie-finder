import { NextResponse } from "next/server"
import cache from "@/lib/cache"

const API_KEY = process.env.COLLECT_API_KEY
const CACHE_TTL = 60 // 1 minute

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  if (!id) {
    return NextResponse.json({ error: "Movie ID is required" }, { status: 400 })
  }

  const cacheKey = `movie:${id}`

  // Try to get data from cache
  const cachedData = await cache.get(cacheKey)
  if (cachedData) {
    return NextResponse.json(JSON.parse(cachedData))
  }

  const url = `https://api.collectapi.com/imdb/imdbSearchById?movieId=${id}`

  try {
    const response = await fetch(url, {
      headers: {
        authorization: `apikey ${API_KEY}`,
        "content-type": "application/json",
      },
    })

    const data = await response.json()

    if (data.success) {
      // Cache the successful response
      await cache.set(cacheKey, JSON.stringify(data.result), CACHE_TTL)
      return NextResponse.json(data.result)
    } else {
      return NextResponse.json({ error: data.message || "Failed to fetch movie details." }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: "An error occurred while fetching movie details." }, { status: 500 })
  }
}

