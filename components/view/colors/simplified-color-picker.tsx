"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useColorStore } from "@/store/colors-store";
import type { HslColor, RgbColor } from "@/types/color";
import { Bookmark, Copy } from "lucide-react";
import { EyeIcon as EyeDropperIcon } from "lucide-react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import { UniversalColorInput } from "./universal-color-input";

interface SimplifiedColorPickerProps {
	hexValue: string;
	setHexValue: (hex: string) => void;
	rgbValues: RgbColor;
	hslValues: HslColor;
	colorName: string;
	handleHexChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleRgbChange: (channel: "r" | "g" | "b", value: number) => void;
	handleHslChange: (channel: "h" | "s" | "l", value: number) => void;
	handleColorPicker: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}

export function SimplifiedColorPicker({
	hexValue,
	setHexValue,
	rgbValues,
	hslValues,
	colorName,
	handleHexChange,
	handleRgbChange,
	handleHslChange,
	handleColorPicker,
}: SimplifiedColorPickerProps) {
	const { isFavorite, addFavorite, removeFavorite } = useColorStore();
	const [_activeSliders, _setActiveSliders] = useState<"rgb" | "hsl">("rgb");

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success(`${text} copied to clipboard`, {
			duration: 2000,
		});
	};

	const toggleFavorite = () => {
		if (isFavorite(hexValue)) {
			removeFavorite(hexValue);
			toast.success(`${hexValue} removed from favorites`, {
				duration: 2000,
			});
		} else {
			addFavorite(hexValue);
			toast.success(`${hexValue} added to favorites`, {
				duration: 2000,
			});
		}
	};

	return (
		<div className="space-y-6">
			<div className="flex items-start gap-4">
				{/* Color Preview */}
				<div className="w-1/2 md:w-1/3">
					<div className="overflow-hidden rounded-lg border">
						<div
							className="h-36 w-full"
							style={{
								backgroundColor: hexValue,
								backgroundImage:
									"linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
								backgroundSize: "16px 16px",
								backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
							}}
						/>
						<div className="bg-card-bg p-3">
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium">{hexValue}</div>
									<div className="text-muted-foreground text-xs">
										{colorName}
									</div>
								</div>
								<div className="flex gap-1">
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													variant="ghost"
													size="icon"
													className="dark:border"
													onClick={toggleFavorite}
												>
													<Bookmark
														className={`h-4 w-4 ${
															isFavorite(hexValue) ? "fill-current" : ""
														}`}
													/>
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>
													{isFavorite(hexValue)
														? "Remove from favorites"
														: "Add to favorites"}
												</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Color Picker and Inputs */}
				<div className="w-full space-y-4 md:w-2/3">
					{/* universal color input */}
					<UniversalColorInput setHexValue={setHexValue} />
					<div className="flex flex-col gap-4 md:flex-row">
						{/* HEX Input with Color Picker */}
						<div className="flex-1">
							<Label htmlFor="hex-input" className="mb-2 block">
								HEX Color
							</Label>
							<div className="flex gap-2">
								<div className="relative flex-1">
									<Input
										id="hex-input"
										value={hexValue}
										onChange={handleHexChange}
										className="bg-card-bg pr-10 font-mono"
										placeholder="#000000"
									/>
									<Button
										variant="ghost"
										size="icon"
										className="absolute top-0.5 right-0.5 h-9 bg-main"
										onClick={() => copyToClipboard(hexValue)}
									>
										<Copy className="h-4 w-4" />
									</Button>
								</div>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant="outline" className="h-10 w-10 p-0">
											<div
												className="h-full w-full rounded-sm"
												style={{ backgroundColor: hexValue }}
											/>
										</Button>
									</PopoverTrigger>
									<PopoverContent
										className="w-64 p-3"
										align="end"
										onClick={(e) => e.stopPropagation()}
									>
										<div className="space-y-3">
											<HexColorPicker
												color={hexValue}
												onChange={(color) => handleColorPicker(color)}
											/>
											<div className="flex gap-2">
												<div className="grid grid-cols-3 gap-2">
													<div>
														<Input
															value={rgbValues.r}
															onChange={(e) => {
																const value = Number.parseInt(e.target.value);
																if (
																	!Number.isNaN(value) &&
																	value >= 0 &&
																	value <= 255
																) {
																	handleRgbChange("r", value);
																}
															}}
															className="h-8 text-center"
														/>
														<div className="mt-1 text-center text-xs">R</div>
													</div>
													<div>
														<Input
															value={rgbValues.g}
															onChange={(e) => {
																const value = Number.parseInt(e.target.value);
																if (
																	!Number.isNaN(value) &&
																	value >= 0 &&
																	value <= 255
																) {
																	handleRgbChange("g", value);
																}
															}}
															className="h-8 text-center"
														/>
														<div className="mt-1 text-center text-xs">G</div>
													</div>
													<div>
														<Input
															value={rgbValues.b}
															onChange={(e) => {
																const value = Number.parseInt(e.target.value);
																if (
																	!Number.isNaN(value) &&
																	value >= 0 &&
																	value <= 255
																) {
																	handleRgbChange("b", value);
																}
															}}
															className="h-8 text-center"
														/>
														<div className="mt-1 text-center text-xs">B</div>
													</div>
												</div>
												{typeof window !== "undefined" &&
													"EyeDropper" in window && (
														<Button
															variant="outline"
															size="icon"
															className="h-8 w-8 self-start"
															onClick={async () => {
																try {
																	// @ts-ignore - EyeDropper is not in the TypeScript DOM types yet
																	const eyeDropper = new window.EyeDropper();
																	const result = await eyeDropper.open();
																	handleColorPicker(result.sRGBHex);
																} catch (e) {
																	console.error("Error using eyedropper:", e);
																}
															}}
														>
															<EyeDropperIcon className="h-4 w-4" />
														</Button>
													)}
											</div>
										</div>
									</PopoverContent>
								</Popover>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
