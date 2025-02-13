"use client";
import type React from "react";
import { Input } from "@/components/ui/input";

interface YearInputProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onFocus: () => void;
	onBlur: (e: React.FocusEvent) => void;
	isTransitioning: boolean;
}

export function YearInput({
	value,
	onChange,
	onFocus,
	onBlur,
	isTransitioning,
}: YearInputProps) {
	return (
		<Input
			className={`w-full sm:w-24 transition-all duration-500 ease-in-out ${
				isTransitioning ? "py-4 sm:py-6 text-lg sm:text-xl" : ""
			}`}
			placeholder="Year"
			type="number"
			min="1888"
			max={new Date().getFullYear()}
			value={value}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}
		/>
	);
}
