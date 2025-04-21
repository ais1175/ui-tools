"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CustomSlider } from "@/components/ui/range-slider";
import { Slider } from "@/components/ui/slider";
import type { GradientStop } from "@/hooks/use-gradient-stops";
import { hexToRgba } from "@/lib/color";
import { Plus, Trash2 } from "lucide-react";
import type { RefObject } from "react";
import { RgbaPickerPopover } from "../color-pickers/rgba-picker-popover";

interface LinearGradientControlsProps {
	linearGradientAngle: number;
	setLinearGradientAngle: (angle: number) => void;
	gradientStops: GradientStop[];
	addColorStop: () => void;
	removeColorStop: (index: number) => void;
	updateColorStop: (index: number, updates: Partial<GradientStop>) => void;
	gradientBarRef: RefObject<HTMLDivElement>;
	setDragIndex: (index: number | null) => void;
	dragIndex: number | null;
}

export function LinearGradientControls({
	linearGradientAngle,
	setLinearGradientAngle,
	gradientStops,
	addColorStop,
	removeColorStop,
	updateColorStop,
	gradientBarRef,
	setDragIndex,
	dragIndex,
}: LinearGradientControlsProps) {
	return (
		<>
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<Label>Angle: {linearGradientAngle}°</Label>
					<div className="relative h-10 w-10 rounded-full border">
						<div
							className="absolute top-[50%] left-[50%] h-5 w-1 origin-bottom bg-foreground"
							style={{
								transform: `translateX(-50%) translateY(-100%) rotate(${linearGradientAngle}deg)`,
							}}
						/>
					</div>
				</div>
				<CustomSlider
					value={[linearGradientAngle]}
					min={0}
					max={360}
					step={5}
					onValueChange={(value) => setLinearGradientAngle(value[0])}
				/>
				<div className="mt-2 grid grid-cols-4 gap-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => setLinearGradientAngle(0)}
					>
						0° →
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setLinearGradientAngle(45)}
					>
						45° ↗
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setLinearGradientAngle(90)}
					>
						90° ↑
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setLinearGradientAngle(135)}
					>
						135° ↖
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setLinearGradientAngle(180)}
					>
						180° ←
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setLinearGradientAngle(225)}
					>
						225° ↙
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setLinearGradientAngle(270)}
					>
						270° ↓
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => setLinearGradientAngle(315)}
					>
						315° ↘
					</Button>
				</div>
			</div>

			<div className="mt-6">
				<div className="mb-2 flex items-center justify-between">
					<Label>Color Stops</Label>
					<Button
						variant="outline"
						size="sm"
						onClick={addColorStop}
						disabled={gradientStops.length >= 10}
					>
						<Plus className="mr-1 h-4 w-4" />
						Add Color
					</Button>
				</div>

				<div
					className="relative mb-4 h-8 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-800"
					ref={gradientBarRef}
				>
					<div
						className="absolute inset-0"
						style={{
							background: `linear-gradient(to right, ${gradientStops
								.map(
									(stop) =>
										`${hexToRgba(stop.color, stop.alpha)} ${stop.position}%`,
								)
								.join(", ")})`,
						}}
					/>
					{gradientStops.map((stop, index) => (
						<div
							key={index}
							className="absolute top-0 h-8 w-4 cursor-move"
							style={{
								left: `calc(${stop.position}% - 0.5rem)`,
								backgroundColor: hexToRgba(stop.color, stop.alpha),
								border: "2px solid white",
								boxShadow: "0 0 0 1px rgba(0,0,0,0.2)",
								zIndex: dragIndex === index ? 10 : 1,
							}}
							onMouseDown={(e) => {
								e.preventDefault();
								setDragIndex(index);
							}}
						/>
					))}
				</div>

				<p className="mb-4 text-muted-foreground text-xs">
					Drag the color stops to adjust their positions. The gradient will
					always maintain stops at 0% and 100%.
				</p>

				<div className="flex flex-wrap gap-2 pr-2">
					{gradientStops.map((stop, index) => (
						<div
							key={index}
							className="relative w-fit rounded-md border bg-card-bg px-2 py-1"
						>
							{gradientStops.length > 2 && (
								<Button
									variant="ghost"
									size="sm"
									onClick={() => removeColorStop(index)}
									className="absolute h-8 px-2 text-destructive hover:text-destructive"
								>
									<Trash2 className="h-4 w-4" />
								</Button>
							)}

							<RgbaPickerPopover
								color={stop.color}
								alpha={stop.alpha}
								onColorChange={(color) => updateColorStop(index, { color })}
								onAlphaChange={(alpha) => updateColorStop(index, { alpha })}
								label="Color"
								isLabel={false}
							/>
							<Label className="text-xs">Color {index + 1}</Label>
						</div>
					))}
				</div>
			</div>
		</>
	);
}
