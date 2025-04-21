"use client";

import { Label } from "@/components/ui/label";
import { CustomSlider } from "@/components/ui/range-slider";
import { Slider } from "@/components/ui/slider";
import { ColorPickerPopover } from "../color-pickers/color-picker-popover";

interface LineGridControlsProps {
	lineGridColor: string;
	setLineGridColor: (color: string) => void;
	lineGridSizeX: number;
	setLineGridSizeX: (size: number) => void;
	lineGridSizeY: number;
	setLineGridSizeY: (size: number) => void;
}

export function LineGridControls({
	lineGridColor,
	setLineGridColor,
	lineGridSizeX,
	setLineGridSizeX,
	lineGridSizeY,
	setLineGridSizeY,
}: LineGridControlsProps) {
	return (
		<div className="space-y-4">
			<ColorPickerPopover
				color={lineGridColor}
				onChange={setLineGridColor}
				label="Line Color"
			/>
			<div className="space-y-2">
				<Label>Grid Size X: {lineGridSizeX}rem</Label>
				<CustomSlider
					value={[lineGridSizeX]}
					min={1}
					max={12}
					step={0.5}
					onValueChange={(value) => setLineGridSizeX(value[0])}
				/>
			</div>
			<div className="space-y-2">
				<Label>Grid Size Y: {lineGridSizeY}rem</Label>
				<CustomSlider
					value={[lineGridSizeY]}
					min={1}
					max={12}
					step={0.5}
					onValueChange={(value) => setLineGridSizeY(value[0])}
				/>
			</div>
		</div>
	);
}
