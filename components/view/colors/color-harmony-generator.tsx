"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "@/lib/color-utils";
import { useEffect, useState } from "react";

interface ColorHarmonyGeneratorProps {
	hexValue: string;
	setHexValue: (hex: string) => void;
}

export function ColorHarmonyGenerator({
	hexValue,
	setHexValue,
}: ColorHarmonyGeneratorProps) {
	const [harmonyType, setHarmonyType] = useState<
		| "complementary"
		| "analogous"
		| "triadic"
		| "tetradic"
		| "split-complementary"
		| "monochromatic"
	>("complementary");
	const [harmonyColors, setHarmonyColors] = useState<string[]>([]);

	useEffect(() => {
		generateHarmony(harmonyType);
	}, [hexValue, harmonyType]);

	const generateHarmony = (type: typeof harmonyType) => {
		const rgb = hexToRgb(hexValue);
		if (!rgb) return;

		const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
		let colors: string[] = [];

		switch (type) {
			case "complementary":
				colors = [hexValue, getHarmonyColor(h, 180, s, l)];
				break;
			case "analogous":
				colors = [
					getHarmonyColor(h, -30, s, l),
					hexValue,
					getHarmonyColor(h, 30, s, l),
				];
				break;
			case "triadic":
				colors = [
					hexValue,
					getHarmonyColor(h, 120, s, l),
					getHarmonyColor(h, 240, s, l),
				];
				break;
			case "tetradic":
				colors = [
					hexValue,
					getHarmonyColor(h, 90, s, l),
					getHarmonyColor(h, 180, s, l),
					getHarmonyColor(h, 270, s, l),
				];
				break;
			case "split-complementary":
				colors = [
					hexValue,
					getHarmonyColor(h, 150, s, l),
					getHarmonyColor(h, 210, s, l),
				];
				break;
			case "monochromatic":
				colors = [
					getHarmonyColor(h, 0, s, Math.max(0, l - 30)),
					getHarmonyColor(h, 0, s, Math.max(0, l - 15)),
					hexValue,
					getHarmonyColor(h, 0, s, Math.min(100, l + 15)),
					getHarmonyColor(h, 0, s, Math.min(100, l + 30)),
				];
				break;
		}

		setHarmonyColors(colors);
	};

	const getHarmonyColor = (
		h: number,
		angle: number,
		s: number,
		l: number,
	): string => {
		let newHue = (h + angle) % 360;
		if (newHue < 0) newHue += 360;

		const rgb = hslToRgb(newHue, s, l);
		return rgbToHex(rgb.r, rgb.g, rgb.b);
	};

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="font-medium text-lg">
					Color Harmony Generator
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<Tabs
					value={harmonyType}
					onValueChange={(value) => setHarmonyType(value as typeof harmonyType)}
				>
					<TabsList className="grid grid-cols-3 md:grid-cols-6">
						<TabsTrigger value="complementary">Complementary</TabsTrigger>
						<TabsTrigger value="analogous">Analogous</TabsTrigger>
						<TabsTrigger value="triadic">Triadic</TabsTrigger>
						<TabsTrigger value="tetradic">Tetradic</TabsTrigger>
						<TabsTrigger value="split-complementary">Split</TabsTrigger>
						<TabsTrigger value="monochromatic">Mono</TabsTrigger>
					</TabsList>

					<div className="mt-4">
						<div className="flex flex-wrap justify-center gap-2">
							{harmonyColors.map((color, index) => (
								<TooltipProvider key={index}>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant="outline"
												className="h-16 w-16 overflow-hidden rounded-md p-0"
												onClick={() => setHexValue(color)}
											>
												<div
													className="h-full w-full"
													style={{ backgroundColor: color }}
												/>
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p className="font-mono">{color}</p>
											<p className="text-muted-foreground text-xs">
												Click to select
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							))}
						</div>
					</div>

					<TabsContent value="complementary" className="mt-2">
						<p className="text-muted-foreground text-sm">
							Complementary colors are opposite each other on the color wheel.
							They create high contrast and vibrant looks.
						</p>
					</TabsContent>

					<TabsContent value="analogous" className="mt-2">
						<p className="text-muted-foreground text-sm">
							Analogous colors are next to each other on the color wheel. They
							create harmonious, comfortable designs.
						</p>
					</TabsContent>

					<TabsContent value="triadic" className="mt-2">
						<p className="text-muted-foreground text-sm">
							Triadic colors are evenly spaced around the color wheel. They tend
							to be vibrant and balanced.
						</p>
					</TabsContent>

					<TabsContent value="tetradic" className="mt-2">
						<p className="text-muted-foreground text-sm">
							Tetradic (or square) colors form a rectangle on the color wheel.
							They offer rich color schemes with many possibilities.
						</p>
					</TabsContent>

					<TabsContent value="split-complementary" className="mt-2">
						<p className="text-muted-foreground text-sm">
							Split-complementary uses a base color and two colors adjacent to
							its complement. It provides strong visual contrast with less
							tension.
						</p>
					</TabsContent>

					<TabsContent value="monochromatic" className="mt-2">
						<p className="text-muted-foreground text-sm">
							Monochromatic colors are different shades and tints of the same
							hue. They create a cohesive, elegant look.
						</p>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
}
