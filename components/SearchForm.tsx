"use client"

import { useState, useEffect } from "react"
import { SearchInput } from "./SearchInput"
import { YearInput } from "./YearInput"
import { FilterRadioGroup } from "./FilterRadioGroup"
import type { FilterType } from "@/types/movie"

interface SearchFormProps {
  onSearch: (query: string, filterType: FilterType, year: string) => void
  isExpanded: boolean
  setIsExpanded: (expanded: boolean) => void
  initialQuery: string
  initialFilterType: FilterType
  initialYear: string
}

export function SearchForm({
  onSearch,
  isExpanded,
  setIsExpanded,
  initialQuery,
  initialFilterType,
  initialYear,
}: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState(initialQuery)
  const [yearFilter, setYearFilter] = useState(initialYear)
  const [filter, setFilter] = useState<FilterType>(initialFilterType)
  const [isSearchTransitioning, setIsSearchTransitioning] = useState(false)
  const [isYearTransitioning, setIsYearTransitioning] = useState(false)

  useEffect(() => {
    if (isExpanded) {
      setIsSearchTransitioning(true)
      setIsYearTransitioning(true)
    } else {
      setIsSearchTransitioning(false)
      setIsYearTransitioning(false)
    }
  }, [isExpanded])

  useEffect(() => {
    setSearchTerm(initialQuery)
    setYearFilter(initialYear)
    setFilter(initialFilterType)
  }, [initialQuery, initialYear, initialFilterType])

  const handleSearchFocus = () => setIsExpanded(true)
  const handleYearFocus = () => setIsExpanded(true)

  const handleSearchBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node) && !searchTerm) {
      setIsExpanded(false)
    }
  }

  const handleYearBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node) && !searchTerm && !yearFilter) {
      setIsExpanded(false)
    }
  }

  const handleReset = () => {
    setSearchTerm("")
    setYearFilter("")
    setFilter("all")
    if (!searchTerm && !yearFilter) {
      setIsExpanded(false)
    }
    onSearch("", "all", "")
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)
    onSearch(newSearchTerm, filter, yearFilter)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYearFilter = e.target.value
    setYearFilter(newYearFilter)
    onSearch(searchTerm, filter, newYearFilter)
  }

  const handleFilterChange = (value: FilterType) => {
    setFilter(value)
    onSearch(searchTerm, value, yearFilter)
  }

  return (
    <div
      className={`mx-auto mb-4 transition-all duration-500 ease-in-out ${
        isExpanded ? "w-full max-w-3xl" : "w-full max-w-md"
      }`}
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col sm:flex-row mb-4 items-stretch gap-2">
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onReset={handleReset}
            isExpanded={isExpanded}
            isTransitioning={isSearchTransitioning}
          />
          <YearInput
            value={yearFilter}
            onChange={handleYearChange}
            onFocus={handleYearFocus}
            onBlur={handleYearBlur}
            isTransitioning={isYearTransitioning}
          />
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
          <FilterRadioGroup value={filter} onChange={handleFilterChange} />
        </div>
      </form>
    </div>
  )
}

