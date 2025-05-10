"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { hexToRgb } from "@/lib/color-utils";
import { useEffect, useRef, useState } from "react";

interface ColorBlindnessSimulatorProps {
	hexValue: string;
}

export function ColorBlindnessSimulator({
	hexValue,
}: ColorBlindnessSimulatorProps) {
	const [simulationType, setSimulationType] = useState<
		"normal" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia"
	>("normal");
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		renderSimulation();
	}, [hexValue, simulationType]);

	const renderSimulation = () => {
		if (!canvasRef.current) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rgb = hexToRgb(hexValue) || { r: 0, g: 0, b: 0 };
		const simulatedColor = simulateColorBlindness(
			rgb.r,
			rgb.g,
			rgb.b,
			simulationType,
		);

		// Draw original color on left half
		ctx.fillStyle = hexValue;
		ctx.fillRect(0, 0, canvas.width / 2, canvas.height);

		// Draw simulated color on right half
		ctx.fillStyle = `rgb(${simulatedColor.r}, ${simulatedColor.g}, ${simulatedColor.b})`;
		ctx.fillRect(canvas.width / 2, 0, canvas.width / 2, canvas.height);

		// Draw divider
		ctx.strokeStyle = "#ffffff";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(canvas.width / 2, 0);
		ctx.lineTo(canvas.width / 2, canvas.height);
		ctx.stroke();
	};

	const simulateColorBlindness = (
		r: number,
		g: number,
		b: number,
		type:
			| "normal"
			| "protanopia"
			| "deuteranopia"
			| "tritanopia"
			| "achromatopsia",
	) => {
		// Normalize RGB values
		const R = r / 255;
		const G = g / 255;
		const B = b / 255;

		// Convert to LMS color space
		let L = 0.31399022 * R + 0.63951294 * G + 0.04649755 * B;
		let M = 0.15537241 * R + 0.75789446 * G + 0.08670142 * B;
		let S = 0.01775239 * R + 0.10944209 * G + 0.87256922 * B;

		// Simulate color blindness
		switch (type) {
			case "protanopia": // Red-blind
				L = 0 * L + 1.05118294 * M + -0.05116099 * S;
				break;
			case "deuteranopia": // Green-blind
				M = 0.9513092 * L + 0 * M + 0.04866992 * S;
				break;
			case "tritanopia": // Blue-blind
				S = -0.86744736 * L + 1.86727089 * M + 0 * S;
				break;
			case "achromatopsia": {
				// Monochromacy
				// Convert to grayscale
				const gray = 0.299 * r + 0.587 * g + 0.114 * b;
				return { r: gray, g: gray, b: gray };
			}
			default:
				// No change
				break;
		}

		// Convert back to RGB
		let r2 = 5.47221206 * L + -4.6419601 * M + 0.16963708 * S;
		let g2 = -1.1252419 * L + 2.29317094 * M + -0.1678952 * S;
		let b2 = 0.02980165 * L + -0.19318073 * M + 1.16364789 * S;

		// Clip values
		r2 = Math.max(0, Math.min(1, r2));
		g2 = Math.max(0, Math.min(1, g2));
		b2 = Math.max(0, Math.min(1, b2));

		// Convert back to 0-255 range
		return {
			r: Math.round(r2 * 255),
			g: Math.round(g2 * 255),
			b: Math.round(b2 * 255),
		};
	};

	const getSimulationDescription = () => {
		switch (simulationType) {
			case "protanopia":
				return "Protanopia is a type of color blindness where individuals cannot perceive red light. Red appears darker and is confused with black, dark gray, or dark brown.";
			case "deuteranopia":
				return "Deuteranopia is a type of color blindness where individuals cannot perceive green light. Green appears beige or gray and is confused with red.";
			case "tritanopia":
				return "Tritanopia is a rare type of color blindness where individuals cannot perceive blue light. Blue appears green and yellow appears light gray or violet.";
			case "achromatopsia":
				return "Achromatopsia is complete color blindness, where individuals see only in shades of gray, black, and white.";
			default:
				return "Normal color vision with no simulation applied.";
		}
	};

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="font-medium text-lg">
					Color Blindness Simulator
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<Tabs
					value={simulationType}
					onValueChange={(value) =>
						setSimulationType(value as typeof simulationType)
					}
				>
					<TabsList className="grid grid-cols-3 md:grid-cols-5">
						<TabsTrigger value="normal">Normal</TabsTrigger>
						<TabsTrigger value="protanopia">Protanopia</TabsTrigger>
						<TabsTrigger value="deuteranopia">Deuteranopia</TabsTrigger>
						<TabsTrigger value="tritanopia">Tritanopia</TabsTrigger>
						<TabsTrigger value="achromatopsia">Achromatopsia</TabsTrigger>
					</TabsList>

					<div className="mt-4">
						<canvas
							ref={canvasRef}
							width="300"
							height="100"
							className="h-24 w-full rounded-md border"
						/>
						<div className="mt-1 flex justify-between text-xs">
							<span>Original</span>
							<span>Simulated</span>
						</div>
					</div>

					<div className="mt-4">
						<p className="text-muted-foreground text-sm">
							{getSimulationDescription()}
						</p>
					</div>
				</Tabs>

				<div className="space-y-2 text-sm">
					<h4 className="font-medium">Accessibility Tip:</h4>
					<p className="text-muted-foreground">
						About 8% of men and 0.5% of women have some form of color blindness.
						Design with sufficient contrast and don't rely solely on color to
						convey important information.
					</p>
				</div>
			</CardContent>
		</Card>
	);
}
