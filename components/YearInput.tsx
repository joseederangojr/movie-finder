"use client";
import type React from "react";
import { Input } from "@/components/ui/input";

interface YearInputProps
	extends React.PropsWithoutRef<React.ComponentProps<"input">> {
	year: string;
	onYearChange: (year: string) => void;
	expand: boolean;
}

export function YearInput({
	year,
	onYearChange,
	onFocus,
	onBlur,
	expand,
}: YearInputProps) {
	const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		onYearChange(e.target.value);
	};
	return (
		<Input
			className={`w-full sm:w-24 transition-all duration-500 ease-in-out ${
				expand ? "py-4 sm:py-6 text-lg sm:text-xl" : ""
			}`}
			placeholder="Year"
			type="number"
			min="1888"
			max={new Date().getFullYear()}
			value={year}
			onChange={handleYearChange}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
}
