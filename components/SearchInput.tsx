"use client";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface SearchInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus: () => void;
	onBlur: (e: React.FocusEvent) => void;
	onReset: () => void;
	isExpanded: boolean;
	isTransitioning: boolean;
}

export function SearchInput({
	value,
	onChange,
	onFocus,
	onBlur,
	onReset,
	isExpanded,
	isTransitioning,
}: SearchInputProps) {
	return (
		<div className="relative flex-1">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
			<Input
				className={`pl-10 pr-10 transition-all duration-500 ease-in-out ${
					isTransitioning ? "py-4 sm:py-6 text-lg sm:text-xl" : ""
				}`}
				placeholder="Search for a movie..."
				type="search"
				value={value}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
			/>
			{isExpanded && value && (
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
