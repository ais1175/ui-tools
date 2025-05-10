"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { hslToRgb, isValidHex, rgbToHex } from "@/lib/color-utils";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface UniversalColorInputProps {
	setHexValue: (hex: string) => void;
}

export function UniversalColorInput({ setHexValue }: UniversalColorInputProps) {
	const [inputValue, setInputValue] = useState("");

	// Update the detectAndConvertColor function to improve format detection
	const detectAndConvertColor = () => {
		// Trim whitespace and normalize
		const value = inputValue.trim().toLowerCase();

		if (!value) {
			toast.error("Empty input");
			return;
		}

		// Try to detect the format and convert to hex
		try {
			// Check if it's already a hex color
			if (value.startsWith("#") || /^[0-9a-f]{3,6}$/i.test(value)) {
				const hexValue = value.startsWith("#") ? value : `#${value}`;
				if (isValidHex(hexValue)) {
					setHexValue(hexValue);
					toast.success(`Detected HEX format: ${hexValue}`);
					return;
				}
			}

			// Check if it's HSL format - more permissive pattern
			if (value.includes("hsl") && !value.includes("hsla")) {
				// Extract numbers from the HSL string
				const matches = value.match(/(\d+)/g);
				if (matches && matches.length >= 3) {
					const h = Number.parseInt(matches[0], 10);
					const s = Number.parseInt(matches[1], 10);
					const l = Number.parseInt(matches[2], 10);

					if (!Number.isNaN(h) && !Number.isNaN(s) && !Number.isNaN(l)) {
						const rgb = hslToRgb(h, s, l);
						const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
						setHexValue(hex);
						toast.success(`Detected HSL format: hsl(${h}, ${s}%, ${l}%)`);
						return;
					}
				}
			}

			// Check if it's HSLA format - more permissive pattern
			if (value.includes("hsla")) {
				// Extract numbers from the HSLA string
				const matches = value.match(/(\d+)|(\d*\.\d+)/g);
				if (matches && matches.length >= 4) {
					const h = Number.parseInt(matches[0], 10);
					const s = Number.parseInt(matches[1], 10);
					const l = Number.parseInt(matches[2], 10);
					const a = Number.parseFloat(matches[3]);

					if (
						!Number.isNaN(h) &&
						!Number.isNaN(s) &&
						!Number.isNaN(l) &&
						!Number.isNaN(a)
					) {
						const rgb = hslToRgb(h, s, l);
						const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
						setHexValue(hex);
						toast.success(
							`Detected HSLA format: hsla(${h}, ${s}%, ${l}%, ${a})`,
						);
						return;
					}
				}
			}

			// Check if it's RGB format - more permissive pattern
			if (value.includes("rgb") && !value.includes("rgba")) {
				// Extract numbers from the RGB string
				const matches = value.match(/(\d+)/g);
				if (matches && matches.length >= 3) {
					const r = Number.parseInt(matches[0], 10);
					const g = Number.parseInt(matches[1], 10);
					const b = Number.parseInt(matches[2], 10);

					if (!Number.isNaN(r) && !Number.isNaN(g) && !Number.isNaN(b)) {
						const hex = rgbToHex(r, g, b);
						setHexValue(hex);
						toast.success(`Detected RGB format: rgb(${r}, ${g}, ${b})`);
						return;
					}
				}
			}

			// Check if it's RGBA format - more permissive pattern
			if (value.includes("rgba")) {
				// Extract numbers from the RGBA string
				const matches = value.match(/(\d+)|(\d*\.\d+)/g);
				if (matches && matches.length >= 4) {
					const r = Number.parseInt(matches[0], 10);
					const g = Number.parseInt(matches[1], 10);
					const b = Number.parseInt(matches[2], 10);
					const a = Number.parseFloat(matches[3]);

					if (
						!Number.isNaN(r) &&
						!Number.isNaN(g) &&
						!Number.isNaN(b) &&
						!Number.isNaN(a)
					) {
						const hex = rgbToHex(r, g, b);
						setHexValue(hex);
						toast.success(`Detected RGBA format: rgba(${r}, ${g}, ${b}, ${a})`);
						return;
					}
				}
			}

			// Check if it's CMYK format - more permissive pattern
			if (value.includes("cmyk")) {
				// Extract numbers from the CMYK string
				const matches = value.match(/(\d+)/g);
				if (matches && matches.length >= 4) {
					const c = Number.parseInt(matches[0], 10);
					const m = Number.parseInt(matches[1], 10);
					const y = Number.parseInt(matches[2], 10);
					const k = Number.parseInt(matches[3], 10);

					if (
						!Number.isNaN(c) &&
						!Number.isNaN(m) &&
						!Number.isNaN(y) &&
						!Number.isNaN(k)
					) {
						// Convert CMYK to RGB
						const cFraction = c / 100;
						const mFraction = m / 100;
						const yFraction = y / 100;
						const kFraction = k / 100;

						const r = Math.round(255 * (1 - cFraction) * (1 - kFraction));
						const g = Math.round(255 * (1 - mFraction) * (1 - kFraction));
						const b = Math.round(255 * (1 - yFraction) * (1 - kFraction));

						const hex = rgbToHex(r, g, b);
						setHexValue(hex);
						toast.success(
							`Detected CMYK format: cmyk(${c}%, ${m}%, ${y}%, ${k}%)`,
						);
						return;
					}
				}
			}

			// Check if it's HSV format - more permissive pattern
			if (value.includes("hsv")) {
				// Extract numbers from the HSV string
				const matches = value.match(/(\d+)/g);
				if (matches && matches.length >= 3) {
					const h = Number.parseInt(matches[0], 10);
					const s = Number.parseInt(matches[1], 10);
					const v = Number.parseInt(matches[2], 10);

					if (!Number.isNaN(h) && !Number.isNaN(s) && !Number.isNaN(v)) {
						// Convert HSV to RGB
						const hFraction = h / 360;
						const sFraction = s / 100;
						const vFraction = v / 100;

						// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
						let r;
						// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
						let g;
						// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
						let b;
						const i = Math.floor(hFraction * 6);
						const f = hFraction * 6 - i;
						const p = vFraction * (1 - sFraction);
						const q = vFraction * (1 - f * sFraction);
						const t = vFraction * (1 - (1 - f) * sFraction);

						switch (i % 6) {
							case 0:
								r = vFraction;
								g = t;
								b = p;
								break;
							case 1:
								r = q;
								g = vFraction;
								b = p;
								break;
							case 2:
								r = p;
								g = vFraction;
								b = t;
								break;
							case 3:
								r = p;
								g = q;
								b = vFraction;
								break;
							case 4:
								r = t;
								g = p;
								b = vFraction;
								break;
							case 5:
								r = vFraction;
								g = p;
								b = q;
								break;
							default:
								r = 0;
								g = 0;
								b = 0;
						}

						const hex = rgbToHex(
							Math.round(r * 255),
							Math.round(g * 255),
							Math.round(b * 255),
						);
						setHexValue(hex);
						toast.success(`Detected HSV format: hsv(${h}, ${s}%, ${v}%)`);
						return;
					}
				}
			}

			// Try to handle comma-separated values without format prefix
			if (value.includes(",")) {
				const parts = value
					.split(",")
					.map((part) => Number.parseInt(part.trim(), 10));

				// If we have 3 numbers between 0-255, assume RGB
				if (
					parts.length === 3 &&
					parts.every((p) => !Number.isNaN(p) && p >= 0 && p <= 255)
				) {
					const hex = rgbToHex(parts[0], parts[1], parts[2]);
					setHexValue(hex);
					toast.success(`Detected RGB values: ${parts.join(", ")}`);
					return;
				}
			}

			// Try to handle named colors
			const namedColors: Record<string, string> = {
				red: "#FF0000",
				green: "#00FF00",
				blue: "#0000FF",
				yellow: "#FFFF00",
				cyan: "#00FFFF",
				magenta: "#FF00FF",
				black: "#000000",
				white: "#FFFFFF",
				gray: "#808080",
				purple: "#800080",
				orange: "#FFA500",
				pink: "#FFC0CB",
				brown: "#A52A2A",
				teal: "#008080",
				navy: "#000080",
			};

			if (namedColors[value]) {
				setHexValue(namedColors[value]);
				toast.success(`Detected color name: ${value}`);
				return;
			}

			// If we got here, we couldn't detect the format
			toast.success(
				"Could not detect the color format. Please try a different format.",
			);
		} catch (error) {
			console.error("Error parsing color:", error);
			toast.success("Failed to parse the color. Please check the format.");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			detectAndConvertColor();
		}
	};

	return (
		<div className="mb-6 rounded-lg border bg-muted/10 p-4">
			<h3 className="mb-3 font-medium text-lg">Universal Color Input</h3>

			<div className="flex gap-2">
				<Input
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="e.g. #1E88E5, rgb(30, 136, 229), hsl(210, 82%, 51%)"
					className="font-mono"
				/>
				<Button onClick={detectAndConvertColor} className="gap-1">
					<Wand2 className="h-4 w-4" />
					Convert
				</Button>
			</div>
		</div>
	);
}
