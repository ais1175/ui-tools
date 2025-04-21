"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";

interface ColorPickerPopoverProps {
	color: string;
	onChange: (color: string) => void;
	label: string;
}

export function ColorPickerPopover({
	color,
	onChange,
	label,
}: ColorPickerPopoverProps) {
	return (
		<div className="flex items-center gap-2">
			<Label className="w-24">{label}</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="h-8 w-12 border-2 p-0"
						style={{ backgroundColor: color }}
					>
						<span className="sr-only">Pick a color</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-3">
					<HexColorPicker color={color} onChange={onChange} />
					<div className="mt-2 flex">
						<Input
							value={color}
							onChange={(e) => onChange(e.target.value)}
							className="h-8"
						/>
					</div>
				</PopoverContent>
			</Popover>
		</div>
	);
}
