"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAccessibilityLevel, getContrastRatio } from "@/lib/color-utils";
import { useColorStore } from "@/store/colors-store";
import type { RgbColor } from "@/types/color";
import { Bookmark, Contrast, Palette } from "lucide-react";
import toast from "react-hot-toast";

interface ColorPreviewProps {
	hexValue: string;
	colorName: string;
	rgbValues: RgbColor;
	rgbaValues: { a: number };
	showPalette: boolean;
	setShowPalette: (show: boolean) => void;
}

export function ColorPreview({
	hexValue,
	colorName,
	rgbValues,
	rgbaValues,
	showPalette,
	setShowPalette,
}: ColorPreviewProps) {
	const { isFavorite, addFavorite, removeFavorite } = useColorStore();

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
		<div className="space-y-4">
			<div className="overflow-hidden rounded-lg border">
				<div
					className="h-32 w-full"
					style={{
						backgroundColor: hexValue,
						backgroundImage:
							"linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
						backgroundSize: "16px 16px",
						backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
						opacity: rgbaValues.a,
					}}
				/>
				<div className="bg-white p-3">
					<div className="flex items-center justify-between">
						<div>
							<div className="font-medium">{hexValue}</div>
							<div className="text-muted-foreground text-xs">{colorName}</div>
						</div>
						<div className="flex gap-1">
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											onClick={toggleFavorite}
										>
											<Bookmark
												className={`h-4 w-4 ${isFavorite(hexValue) ? "fill-current" : ""}`}
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
							<TooltipProvider>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => setShowPalette(!showPalette)}
										>
											<Palette className="h-4 w-4" />
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>{showPalette ? "Hide palette" : "Show palette"}</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						</div>
					</div>
				</div>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<h3 className="font-medium text-sm">Contrast Checker</h3>
					<Contrast className="h-4 w-4" />
				</div>
				<div className="grid grid-cols-2 gap-2">
					<div
						className="flex items-center justify-center rounded-md p-3"
						style={{ backgroundColor: hexValue }}
					>
						<span className="font-medium text-white">White on Color</span>
					</div>
					<div
						className="flex items-center justify-center rounded-md bg-white p-3"
						style={{ color: hexValue }}
					>
						<span className="font-medium">Color on White</span>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-2 text-xs">
					<div>
						<div className="font-medium">White on Color</div>
						{(() => {
							const ratio = getContrastRatio(
								{ r: 255, g: 255, b: 255 },
								rgbValues,
							).toFixed(2);
							const level = getAccessibilityLevel(Number.parseFloat(ratio));
							return (
								<div className="flex items-center gap-1">
									<span>{ratio}:1</span>
									<Badge variant={level === "Fail" ? "destructive" : "outline"}>
										{level}
									</Badge>
								</div>
							);
						})()}
					</div>
					<div>
						<div className="font-medium">Color on White</div>
						{(() => {
							const ratio = getContrastRatio(rgbValues, {
								r: 255,
								g: 255,
								b: 255,
							}).toFixed(2);
							const level = getAccessibilityLevel(Number.parseFloat(ratio));
							return (
								<div className="flex items-center gap-1">
									<span>{ratio}:1</span>
									<Badge variant={level === "Fail" ? "destructive" : "outline"}>
										{level}
									</Badge>
								</div>
							);
						})()}
					</div>
				</div>
			</div>
		</div>
	);
}
