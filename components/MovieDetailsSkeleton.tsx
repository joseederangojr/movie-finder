"use client";
import { Skeleton } from "@/components/ui/skeleton";

const skeletonClass = "animate-pulse bg-gray-300 dark:bg-gray-600";

export function MovieDetailsSkeleton() {
	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<div className="mb-6">
					<Skeleton className={`${skeletonClass} h-6 w-32`} />
				</div>
				<div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
					<div className="md:flex">
						<div className="md:flex-shrink-0">
							<Skeleton className={`${skeletonClass} h-[450px] w-[300px]`} />
						</div>
						<div className="p-8 w-full">
							<Skeleton className={`${skeletonClass} h-8 w-3/4 mb-2`} />
							<Skeleton className={`${skeletonClass} h-4 w-1/2 mb-4`} />
							<Skeleton className={`${skeletonClass} h-4 w-full mb-2`} />
							<Skeleton className={`${skeletonClass} h-4 w-full mb-2`} />
							<Skeleton className={`${skeletonClass} h-4 w-3/4 mb-4`} />
							<div className="grid grid-cols-2 gap-4 mb-6">
								{[...Array(4)].map((_, i) => (
									<div key={i}>
										<Skeleton className={`${skeletonClass} h-5 w-1/2 mb-1`} />
										<Skeleton className={`${skeletonClass} h-4 w-3/4`} />
									</div>
								))}
							</div>
							<Skeleton className={`${skeletonClass} h-6 w-1/4 mb-2`} />
							<div className="flex space-x-4">
								{[...Array(3)].map((_, i) => (
									<div key={i} className="text-center">
										<Skeleton className={`${skeletonClass} h-8 w-16 mb-1`} />
										<Skeleton className={`${skeletonClass} h-4 w-20`} />
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
