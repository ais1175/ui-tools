"use client";

import {
	findClosestColorName,
	generatePalette,
	hexToRgb,
	hslToRgb,
	rgbToCmyk,
	rgbToHex,
	rgbToHsl,
	rgbToHsv,
} from "@/lib/color-utils";
import type {
	CmykColor,
	ColorFormats,
	HslColor,
	HslaColor,
	HsvColor,
	RgbColor,
	RgbaColor,
} from "@/types/color";
import { useEffect, useRef, useState } from "react";

export function useColorState(initialHex = "#1E88E5") {
	const [hexValue, setHexValue] = useState(initialHex);
	const [rgbValues, setRgbValues] = useState<RgbColor>({
		r: 30,
		g: 136,
		b: 229,
	});
	const [rgbaValues, setRgbaValues] = useState<RgbaColor>({
		r: 30,
		g: 136,
		b: 229,
		a: 1,
	});
	const [hslValues, setHslValues] = useState<HslColor>({
		h: 210,
		s: 82,
		l: 51,
	});
	const [hslaValues, setHslaValues] = useState<HslaColor>({
		h: 210,
		s: 82,
		l: 51,
		a: 1,
	});
	const [cmykValues, setCmykValues] = useState<CmykColor>({
		c: 87,
		m: 41,
		y: 0,
		k: 10,
	});
	const [hsvValues, setHsvValues] = useState<HsvColor>({
		h: 210,
		s: 87,
		v: 90,
	});
	const [palette, setPalette] = useState<string[]>([]);
	const [colorName, setColorName] = useState("");
	const [history, setHistory] = useState<string[]>([]);

	// Add a ref to track the source of updates
	const isUpdatingRef = useRef(false);

	// Single useEffect to handle all color format updates
	useEffect(() => {
		// Prevent infinite loops by checking if we're already updating
		if (isUpdatingRef.current) return;

		isUpdatingRef.current = true;

		try {
			// Update from hex input
			const rgb = hexToRgb(hexValue);
			if (rgb) {
				// Only update if values are different
				if (
					rgb.r !== rgbValues.r ||
					rgb.g !== rgbValues.g ||
					rgb.b !== rgbValues.b
				) {
					setRgbValues(rgb);
					setRgbaValues((prev) => ({ ...rgb, a: prev.a }));
				}

				const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
				if (
					hsl.h !== hslValues.h ||
					hsl.s !== hslValues.s ||
					hsl.l !== hslValues.l
				) {
					setHslValues(hsl);
					setHslaValues((prev) => ({ ...hsl, a: prev.a }));
				}

				setCmykValues(rgbToCmyk(rgb.r, rgb.g, rgb.b));
				setHsvValues(rgbToHsv(rgb.r, rgb.g, rgb.b));

				setPalette(generatePalette(hexValue));
				setColorName(findClosestColorName(hexValue));
			}
		} finally {
			isUpdatingRef.current = false;
		}
	}, [hexValue, rgbValues, hslValues]);

	// Add to history when color changes
	useEffect(() => {
		if (!history.includes(hexValue)) {
			setHistory((prev) => [hexValue, ...prev].slice(0, 10));
		}
	}, [hexValue, history]);

	// Handle RGB to HEX conversion
	const handleRgbChange = (channel: "r" | "g" | "b", value: number) => {
		if (isUpdatingRef.current) return;

		const newRgbValues = { ...rgbValues, [channel]: value };
		setRgbValues(newRgbValues);

		// Update hex directly without going through the effect
		const hex = rgbToHex(newRgbValues.r, newRgbValues.g, newRgbValues.b);
		setHexValue(hex);
	};

	// Handle RGBA changes
	const handleRgbaChange = (channel: "r" | "g" | "b" | "a", value: number) => {
		setRgbaValues((prev) => ({ ...prev, [channel]: value }));

		if (channel !== "a") {
			handleRgbChange(channel, value);
		}
	};

	// Handle HSL to HEX conversion
	const handleHslChange = (channel: "h" | "s" | "l", value: number) => {
		if (isUpdatingRef.current) return;

		const newHslValues = { ...hslValues, [channel]: value };
		setHslValues(newHslValues);

		// Update hex directly without going through the effect
		const rgb = hslToRgb(newHslValues.h, newHslValues.s, newHslValues.l);
		const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
		setHexValue(hex);
	};

	// Handle HSLA changes
	const handleHslaChange = (channel: "h" | "s" | "l" | "a", value: number) => {
		setHslaValues((prev) => ({ ...prev, [channel]: value }));

		if (channel !== "a") {
			handleHslChange(channel, value);
		}
	};

	// Format strings for display
	const colorFormats: ColorFormats = {
		hex: hexValue,
		rgb: `rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`,
		rgba: `rgba(${rgbaValues.r}, ${rgbaValues.g}, ${rgbaValues.b}, ${rgbaValues.a.toFixed(2)})`,
		hsl: `hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`,
		hsla: `hsla(${hslaValues.h}, ${hslaValues.s}%, ${hslaValues.l}%, ${hslaValues.a.toFixed(2)})`,
		cmyk: `cmyk(${cmykValues.c}%, ${cmykValues.m}%, ${cmykValues.y}%, ${cmykValues.k}%)`,
		hsv: `hsv(${hsvValues.h}°, ${hsvValues.s}%, ${hsvValues.v}%)`,
	};

	return {
		hexValue,
		setHexValue,
		rgbValues,
		setRgbValues,
		rgbaValues,
		setRgbaValues,
		hslValues,
		setHslValues,
		hslaValues,
		setHslaValues,
		cmykValues,
		setCmykValues,
		hsvValues,
		setHsvValues,
		palette,
		colorName,
		history,
		colorFormats,
		handleRgbChange,
		handleRgbaChange,
		handleHslChange,
		handleHslaChange,
		isUpdatingRef,
	};
}
