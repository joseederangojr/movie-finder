"use client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { Type } from "@/types/movie";

interface FilterRadioGroupProps {
	value: Type;
	onChange: (value: Type) => void;
}

export function FilterRadioGroup({ value, onChange }: FilterRadioGroupProps) {
	return (
		<RadioGroup
			value={value}
			onValueChange={(v) => onChange(v as Type)}
			className="flex flex-wrap justify-center gap-4"
		>
			<div className="flex items-center space-x-2">
				<RadioGroupItem value="" id="all" />
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
