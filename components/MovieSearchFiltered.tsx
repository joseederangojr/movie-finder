"use client"

import { useState } from "react"
import { SearchForm } from "@/components/SearchForm"
import { MovieList } from "@/components/MovieList"
import { useMovieSearch } from "@/lib/queries"
import type { FilterType } from "@/types/movie"

export default function MovieSearchFiltered() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchParams, setSearchParams] = useState({
    query: "",
    filterType: "all" as FilterType,
    year: "",
  })

  const {
    data: movies,
    isLoading,
    error,
  } = useMovieSearch(searchParams.query, searchParams.filterType, searchParams.year)

  const handleSearch = (query: string, filterType: FilterType, year: string) => {
    setSearchParams({ query, filterType, year })
  }

  return (
    <div className="w-full">
      <SearchForm onSearch={handleSearch} isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
      {searchParams.query && (
        <div className="w-full max-w-3xl mx-auto mt-4">
          <MovieList movies={movies || []} isLoading={isLoading} error={error?.message || null} />
        </div>
      )}
    </div>
  )
}

