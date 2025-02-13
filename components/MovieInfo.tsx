"use client";
import Image from "next/image";
import type { MovieDetails } from "@/types/movie";

interface MovieInfoProps {
	movie: MovieDetails;
}

export function MovieInfo({ movie }: MovieInfoProps) {
	return (
		<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
			<div className="md:flex">
				<div className="md:flex-shrink-0">
					<Image
						src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.svg"}
						alt={movie.Title}
						width={300}
						height={450}
						className="h-full w-full object-cover md:w-48"
					/>
				</div>
				<div className="p-8">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
						{movie.Title}
					</h1>
					<p className="text-gray-600 dark:text-gray-300 mb-4">
						{movie.Year} • {movie.Rated} • {movie.Runtime}
					</p>
					<p className="text-gray-800 dark:text-gray-200 mb-4">{movie.Plot}</p>
					<div className="grid grid-cols-2 gap-4">
						<MovieInfoItem title="Director" content={movie.Director} />
						<MovieInfoItem title="Writers" content={movie.Writer} />
						<MovieInfoItem title="Stars" content={movie.Actors} />
						<MovieInfoItem title="Genre" content={movie.Genre} />
					</div>
					<div className="mt-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
							Ratings
						</h2>
						<div className="flex space-x-4">
							{movie.Ratings.map((rating, index) => (
								<div key={index} className="text-center">
									<p className="text-2xl font-bold text-gray-900 dark:text-white">
										{rating.Value}
									</p>
									<p className="text-sm text-gray-600 dark:text-gray-300">
										{rating.Source}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

interface MovieInfoItemProps {
	title: string;
	content: string;
}

function MovieInfoItem({ title, content }: MovieInfoItemProps) {
	return (
		<div>
			<h2 className="text-lg font-semibold text-gray-900 dark:text-white">
				{title}
			</h2>
			<p className="text-gray-600 dark:text-gray-300">{content}</p>
		</div>
	);
}
