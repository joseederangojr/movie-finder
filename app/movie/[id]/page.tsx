"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useMovieDetails } from "@/lib/queries"
import { MovieDetailsSkeleton } from "@/components/MovieDetailsSkeleton"
import { MovieInfo } from "@/components/MovieInfo"

export default function MovieDetailsPage() {
  const { id } = useParams()
  const { data: movie, isLoading, error } = useMovieDetails(id as string)

  if (isLoading) {
    return <MovieDetailsSkeleton />
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error.message}</div>
  }

  if (!movie) {
    return <div className="flex justify-center items-center h-screen">Movie not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="mr-2" size={20} />
          Back to Search
        </Link>
        <MovieInfo movie={movie} />
      </div>
    </div>
  )
}

