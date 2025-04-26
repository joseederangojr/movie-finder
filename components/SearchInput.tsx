"use client";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchInputProps
	extends React.PropsWithoutRef<React.ComponentProps<"input">> {
	search: string;
	onSearch: (search: string) => void;
	onReset: () => void;
	expand: boolean;
}

export function SearchInput({
	search,
	onSearch,
	onReset,
	expand,
	...props
}: SearchInputProps) {
	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		onSearch(e.target.value);
	};
	return (
		<div className="relative flex-1">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
			<Input
				className={`pl-10 pr-10 transition-all duration-500 ease-in-out ${
					expand ? "py-4 sm:py-6 text-lg sm:text-xl" : ""
				}`}
				placeholder="Search for a movie..."
				type="search"
				value={search}
				onChange={handleSearch}
				{...props}
			/>
			{expand && search && (
				<Button
					type="button"
					variant="ghost"
					size="icon"
					className="absolute right-2 top-1/2 -translate-y-1/2"
					onClick={onReset}
				>
					<X className="h-5 w-5" />
				</Button>
			)}
		</div>
	);
}
