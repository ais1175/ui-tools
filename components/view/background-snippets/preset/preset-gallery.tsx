"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { type IPreset, presets } from "./data";

interface PresetGalleryProps {
	onSelectPreset: (preset: IPreset) => void;
	activePresetId?: string;
}

export function PresetGallery({
	onSelectPreset,
	activePresetId,
}: PresetGalleryProps) {
	const [selectedCategory, setSelectedCategory] = useState<string>("all");

	const filteredPresets =
		selectedCategory === "all"
			? presets
			: presets.filter((preset) => preset.category === selectedCategory);

	return (
		<div className="w-full space-y-4 ">
			<div className="flex items-center justify-between">
				<div className="hidden gap-2 sm:flex">
					<Button
						variant={selectedCategory === "all" ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedCategory("all")}
					>
						All
					</Button>
					<Button
						variant={selectedCategory === "pattern" ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedCategory("pattern")}
					>
						Patterns
					</Button>
					<Button
						variant={selectedCategory === "gradient" ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedCategory("gradient")}
					>
						Gradients
					</Button>
					<Button
						variant={selectedCategory === "combination" ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedCategory("combination")}
					>
						Combinations
					</Button>
				</div>
			</div>

			<ScrollArea className="w-full whitespace-nowrap pb-4">
				<div className="flex gap-4 pb-2">
					{filteredPresets.map((preset) => (
						<PresetCard
							key={preset.id}
							preset={preset}
							onSelect={onSelectPreset}
							isActive={preset.id === activePresetId}
						/>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}

interface PresetCardProps {
	preset: IPreset;
	onSelect?: (preset: IPreset) => void;
	isActive: boolean;
	className?: string;
	cardClassName?: string;
	hideName?: boolean;
}

export function PresetCard({
	preset,
	onSelect,
	isActive,
	className,
	cardClassName,
	hideName,
}: PresetCardProps) {
	return (
		<div
			className={cn(
				"group relative cursor-pointer rounded-lg border-2 bg-main p-2 transition-colors ",
				isActive && "border-2 border-blue-600",
				className,
			)}
			onClick={() => onSelect?.(preset)}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					onSelect?.(preset);
				}
			}}
		>
			<div
				className={cn(
					"relative mb-2 h-20 w-40 overflow-hidden rounded-md 2xl:h-24",
					cardClassName,
				)}
			>
				{/* Base background */}
				<div
					className="absolute inset-0"
					style={{ backgroundColor: preset.config.bgColor }}
				/>

				{/* Pattern layer */}
				{preset.config.patternType !== "none" && (
					<div
						className="absolute inset-0"
						style={getPatternStyle(preset.config)}
					/>
				)}

				{/* Gradient layer */}
				{preset.config.useGradient && (
					<div
						className="absolute inset-0"
						style={getGradientStyle(preset.config)}
					/>
				)}

				{/* Mask layer - simplified for preview */}
				{preset.config.useMask && (
					<div
						className="absolute inset-0"
						style={getMaskStyle(preset.config)}
					/>
				)}
			</div>
			{!hideName && (
				<p className="absolute bottom-1 left-0 w-full truncate text-center font-medium text-sm 2xl:relative">
					{preset.name}
				</p>
			)}
		</div>
	);
}
// Add these helper functions for pattern, gradient, and mask styles
function getPatternStyle(config: IPreset["config"]): React.CSSProperties {
	if (config.patternType === "none") return {};

	let patternStyle: React.CSSProperties = {};

	switch (config.patternType) {
		case "grid":
			patternStyle = {
				backgroundImage: `linear-gradient(to right, ${config.gridLineColor} 1px, transparent 1px), linear-gradient(to bottom, ${config.gridLineColor} 1px, transparent 1px)`,
				backgroundSize: `${config.gridSizeX}px ${config.gridSizeY}px`,
			};
			break;
		case "dots":
			patternStyle = {
				backgroundImage: `radial-gradient(${config.dotColor} 1px, transparent 1px)`,
				backgroundSize: `${config.dotSize}px ${config.dotSize}px`,
			};
			break;
		case "lineGrid":
			patternStyle = {
				backgroundImage: `linear-gradient(to right, ${config.lineGridColor} 1px, transparent 1px), linear-gradient(to bottom, ${config.lineGridColor} 1px, transparent 1px)`,
				backgroundSize: `${config.lineGridSizeX}rem ${config.lineGridSizeY}rem`,
			};
			break;
		case "dotGrid":
			patternStyle = {
				backgroundImage: `radial-gradient(${config.dotGridColor} 1px, transparent 1px)`,
				backgroundSize: `${config.dotGridSize}px ${config.dotGridSize}px`,
			};
			break;
		case "repeatingLinear":
			patternStyle = {
				backgroundImage: `repeating-linear-gradient(${config.repeatingLinearAngle}deg, ${config.repeatingLinearColor} 0px 1px, transparent 1px ${config.repeatingLinearSize}px)`,
			};
			break;
	}

	return patternStyle;
}

function getGradientStyle(config: IPreset["config"]): React.CSSProperties {
	if (!config.useGradient) return {};

	const gradientStyle: React.CSSProperties = {};

	if (config.gradientType === "radial" && config.gradientStops) {
		// Format color stops for radial gradient
		const colorStops = config.gradientStops
			.map((stop) => {
				const rgba = `rgba(${hexToRgb(stop.color)}, ${stop.alpha})`;
				return `${rgba} ${stop.position}%`;
			})
			.join(", ");

		gradientStyle.background = `radial-gradient(${config.gradientSizeX || 125}% ${config.gradientSizeY || 125}% at ${config.gradientPositionX || 50}% ${config.gradientPositionY || 50}%, ${colorStops})`;
	} else if (config.gradientType === "linear" && config.gradientStops) {
		const colorStops = config.gradientStops
			.map((stop) => {
				const rgba = `rgba(${hexToRgb(stop.color)}, ${stop.alpha})`;
				return `${rgba} ${stop.position}%`;
			})
			.join(", ");

		gradientStyle.background = `linear-gradient(${config.linearGradientAngle || 90}deg, ${colorStops})`;
	}

	return gradientStyle;
}

function getMaskStyle(config: IPreset["config"]): React.CSSProperties {
	if (!config.useMask) return {};

	let maskPosition = "50% 50%";
	let maskShape = "ellipse";
	let maskSize = `${config.maskWidth || 80}% ${config.maskHeight || 50}%`;

	if (config.customMaskPosition) {
		maskPosition = `${config.maskPositionX || 50}% ${config.maskPositionY || 50}%`;
	} else if (config.maskType) {
		switch (config.maskType) {
			case "top":
				maskPosition = "50% 0%";
				break;
			case "bottom":
				maskPosition = "50% 100%";
				break;
			case "left":
				maskPosition = "0% 50%";
				break;
			case "right":
				maskPosition = "100% 50%";
				break;
			case "topLeft":
				maskPosition = "0% 0%";
				break;
			case "topRight":
				maskPosition = "100% 0%";
				break;
			case "bottomLeft":
				maskPosition = "0% 100%";
				break;
			case "bottomRight":
				maskPosition = "100% 100%";
				break;
			case "circle":
				maskShape = "circle";
				maskSize = `${config.maskWidth || 80}%`;
				break;
		}
	}

	return {
		maskImage: `radial-gradient(${maskShape} ${maskSize} at ${maskPosition}, black ${config.maskOpacity || 70}%, transparent ${config.maskFade || 110}%)`,
		WebkitMaskImage: `radial-gradient(${maskShape} ${maskSize} at ${maskPosition}, black ${config.maskOpacity || 70}%, transparent ${config.maskFade || 110}%)`,
	};
}

function hexToRgb(hex: string): string {
	const cleanedHex = hex.replace("#", "");

	let r: number;
	let g: number;
	let b: number;

	if (cleanedHex.length === 3) {
		r = Number.parseInt(cleanedHex[0] + cleanedHex[0], 16);
		g = Number.parseInt(cleanedHex[1] + cleanedHex[1], 16);
		b = Number.parseInt(cleanedHex[2] + cleanedHex[2], 16);
	} else {
		r = Number.parseInt(cleanedHex.substring(0, 2), 16);
		g = Number.parseInt(cleanedHex.substring(2, 4), 16);
		b = Number.parseInt(cleanedHex.substring(4, 6), 16);
	}

	return `${r}, ${g}, ${b}`;
}
