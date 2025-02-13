"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { FilterType } from "@/types/movie";

interface FilterRadioGroupProps {
	value: FilterType;
	onChange: (value: FilterType) => void;
}

export function FilterRadioGroup({ value, onChange }: FilterRadioGroupProps) {
	return (
		<RadioGroup
			value={value}
			onValueChange={onChange}
			className="flex flex-wrap justify-center gap-4"
		>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="all" id="all" />
				<Label htmlFor="all">All</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="movie" id="movie" />
				<Label htmlFor="movie">Movie</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="series" id="series" />
				<Label htmlFor="series">Series</Label>
			</div>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="episode" id="episode" />
				<Label htmlFor="episode">Episode</Label>
			</div>
		</RadioGroup>
	);
}
