"use client";

import { Label } from "@/components/ui/label";
import { CustomSlider } from "@/components/ui/range-slider";
import { Slider } from "@/components/ui/slider";
import { ColorPickerPopover } from "../color-pickers/color-picker-popover";

interface GridControlsProps {
	gridLineColor: string;
	setGridLineColor: (color: string) => void;
	gridSizeX: number;
	setGridSizeX: (size: number) => void;
	gridSizeY: number;
	setGridSizeY: (size: number) => void;
}

export function GridControls({
	gridLineColor,
	setGridLineColor,
	gridSizeX,
	setGridSizeX,
	gridSizeY,
	setGridSizeY,
}: GridControlsProps) {
	return (
		<div className="space-y-2">
			<ColorPickerPopover
				color={gridLineColor.replace(/2e$/, "")}
				onChange={(color) => {
					// Ensure we're setting the full color with transparency
					const baseColor = color.replace(/2e$/, "");
					setGridLineColor(`${baseColor}2e`);
				}}
				label="Line Color"
			/>
			<div className="space-y-2">
				<Label>Grid Size X: {gridSizeX}px</Label>
				<CustomSlider
					value={[gridSizeX]}
					min={5}
					max={50}
					step={1}
					onValueChange={(value) => setGridSizeX(value[0])}
				/>
			</div>
			<div className="space-y-2">
				<Label>Grid Size Y: {gridSizeY}px</Label>
				<CustomSlider
					value={[gridSizeY]}
					min={5}
					max={50}
					step={1}
					onValueChange={(value) => setGridSizeY(value[0])}
				/>
			</div>
		</div>
	);
}
