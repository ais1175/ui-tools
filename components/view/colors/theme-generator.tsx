"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "@/lib/color-utils";
import {
	generateShadcnTheme,
	generateTailwindConfig,
	generateThemeCSS,
	generateThemeCSSv4,
} from "@/lib/theme-utils";
import { Moon, RefreshCw, Sun } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ColorPicker } from "./color-picker";
import { CopyCode } from "./copy-code";
import { ThemePreview } from "./theme-preview";

interface ThemeGeneratorProps {
	hexValue: string;
}

export function ThemeGenerator({ hexValue }: ThemeGeneratorProps) {
	const [previewMode, setPreviewMode] = useState<"light" | "dark">("light");

	// Add a new state to track expanded sections
	const [expandedSections, setExpandedSections] = useState<
		Record<string, boolean>
	>({
		base: false,
		ui: false,
		component: false,
	});

	// Add a function to toggle section expansion
	const toggleSectionExpansion = (section: "base" | "ui" | "component") => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}));
	};
	// Theme state
	const [baseTheme, setBaseTheme] = useState<{
		lightTheme: Record<string, string>;
		darkTheme: Record<string, string>;
	} | null>(null);

	// Custom colors state
	const [customLightColors, setCustomLightColors] = useState<
		Record<string, string>
	>({});
	const [customDarkColors, setCustomDarkColors] = useState<
		Record<string, string>
	>({});

	// Update base theme when hex value changes
	useEffect(() => {
		const theme = generateShadcnTheme(hexValue);
		if (theme) {
			setBaseTheme(theme);
			// Reset custom colors when base color changes
			setCustomLightColors({});
			setCustomDarkColors({});
		}
	}, [hexValue]);

	// ✅ Safe fallbacks for destructuring (avoids crashing if baseTheme is null)
	const baseLightTheme = baseTheme?.lightTheme ?? {};
	const baseDarkTheme = baseTheme?.darkTheme ?? {};

	// ✅ Merge logic even if baseTheme is not ready (they’ll just be empty)
	const lightTheme = { ...baseLightTheme, ...customLightColors };
	const darkTheme = { ...baseDarkTheme, ...customDarkColors };

	const cssCode = generateThemeCSS(lightTheme, darkTheme);
	const cssCodeV4 = generateThemeCSSv4(lightTheme, darkTheme);
	const tailwindConfig = generateTailwindConfig(hexValue);

	const getThemeVars = () => (previewMode === "light" ? lightTheme : darkTheme);
	const themeVars = getThemeVars();

	// Convert HSL string to hex color for color picker
	const hslToHexColor = (hslString: string) => {
		const [h, s, l] = hslString
			.split(" ")
			.map((val) => Number.parseFloat(val.replace("%", "")));
		const rgb = hslToRgb(h, s, l);
		return rgbToHex(rgb.r, rgb.g, rgb.b);
	};

	// Convert hex color to HSL string for theme
	const hexToHslString = (hexColor: string) => {
		const rgb = hexToRgb(hexColor);
		if (!rgb) return "0 0% 0%";
		const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
		return `${h} ${s}% ${l}%`;
	};

	// Handle color picker change
	const handleColorChange = useCallback(
		(colorKey: string, hexColor: string) => {
			const hslValue = hexToHslString(hexColor);

			if (previewMode === "light") {
				setCustomLightColors((prev) => ({ ...prev, [colorKey]: hslValue }));
			} else {
				setCustomDarkColors((prev) => ({ ...prev, [colorKey]: hslValue }));
			}
		},
		[previewMode, hexToHslString],
	);

	// Reset a specific color to its base value
	const resetColor = useCallback(
		(colorKey: string) => {
			if (previewMode === "light") {
				setCustomLightColors((prev) => {
					const newColors = { ...prev };
					delete newColors[colorKey];
					return newColors;
				});
			} else {
				setCustomDarkColors((prev) => {
					const newColors = { ...prev };
					delete newColors[colorKey];
					return newColors;
				});
			}

			toast.success(`${colorKey} has been reset to the generated value`, {
				duration: 2000,
			});
		},
		[previewMode],
	);

	// Reset all custom colors
	const resetAllColors = () => {
		if (previewMode === "light") {
			setCustomLightColors({});
		} else {
			setCustomDarkColors({});
		}

		toast.success("All colors have been reset to the generated values", {
			duration: 2000,
		});
	};

	// Color picker component
	const ColorPickerItem = memo(
		({
			colorKey,
			label,
		}: {
			colorKey: string;
			label: string;
		}) => {
			const currentHslValue = themeVars[colorKey];
			const isCustomized =
				previewMode === "light"
					? customLightColors[colorKey] !== undefined
					: customDarkColors[colorKey] !== undefined;

			// Create a memoized change handler that doesn't recreate on every render
			const handleChange = useCallback(
				(value: string) => {
					handleColorChange(colorKey, value);
				},
				[colorKey],
			);

			return (
				<div className="space-y-1.5">
					<div className="flex items-center justify-between">
						<Label
							htmlFor={`color-${colorKey}`}
							className="flex items-center gap-1 text-xs"
						>
							{label}
							{isCustomized && (
								<Button
									variant="ghost"
									size="icon"
									className="h-4 w-4 rounded-full"
									onClick={() => resetColor(colorKey)}
								>
									<RefreshCw className="h-3 w-3" />
								</Button>
							)}
						</Label>
						<div className="font-mono text-muted-foreground text-xs">
							{currentHslValue}
						</div>
					</div>
					<ColorPicker
						isBackground={false}
						value={hslToHexColor(currentHslValue)}
						onChange={handleChange}
					/>
				</div>
			);
		},
	);

	const baseColors = useMemo(
		() => [
			{ key: "background", label: "Background" },
			{ key: "foreground", label: "Foreground" },
			{ key: "card", label: "Card" },
			{ key: "card-foreground", label: "Card Foreground" },
			{ key: "popover", label: "Popover" },
			{ key: "popover-foreground", label: "Popover Foreground" },
		],
		[],
	);

	const uiColors = useMemo(
		() => [
			{ key: "primary", label: "Primary" },
			{ key: "primary-foreground", label: "Primary Foreground" },
			{ key: "secondary", label: "Secondary" },
			{ key: "secondary-foreground", label: "Secondary Foreground" },
			{ key: "accent", label: "Accent" },
			{ key: "accent-foreground", label: "Accent Foreground" },
			{ key: "destructive", label: "Destructive" },
			{ key: "destructive-foreground", label: "Destructive Foreground" },
		],
		[],
	);

	const componentColors = useMemo(
		() => [
			{ key: "muted", label: "Muted" },
			{ key: "muted-foreground", label: "Muted Foreground" },
			{ key: "border", label: "Border" },
			{ key: "input", label: "Input" },
			{ key: "ring", label: "Ring" },
		],
		[],
	);

	if (!baseTheme) return <div>Loading theme...</div>;

	return (
		<div className="space-y-6" id="shadcn-theme">
			<div className="flex items-center justify-between">
				<h3 className="font-medium text-2xl">Shadcn/ui Theme Generator</h3>
				<div className="flex items-center space-x-2 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
					<Sun
						className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
							previewMode === "dark"
								? "rotate-12 scale-75 text-[#A1A1AA]"
								: "rotate-0 scale-100 text-foreground"
						}`}
					/>
					<Switch
						checked={previewMode === "dark"}
						onCheckedChange={(value) =>
							setPreviewMode(value ? "dark" : "light")
						}
						aria-label="Toggle theme"
						className="transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110"
					/>
					<Moon
						className={`h-[1.2rem] w-[1.2rem] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
							previewMode === "light"
								? "rotate-12 scale-75 text-[#A1A1AA]"
								: "rotate-0 scale-100 text-foreground"
						}`}
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
				{/* Color Pickers */}
				<div className="sticky top-5 md:col-span-3">
					<ScrollArea className="inset-shadow-[0_1px_rgb(0_0_0/0.10)] h-[95vh] space-y-6 rounded-lg border bg-card-bg p-3 dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)] dark:border-0">
						<div className=" space-y-4 rounded-lg">
							<div className="flex items-center justify-between">
								<h4 className="font-medium text-sm">Theme Colors</h4>
								<Button variant="outline" size="sm" onClick={resetAllColors}>
									<RefreshCw className="mr-1 h-3.5 w-3.5" />
									Reset All
								</Button>
							</div>

							<div className="space-y-4">
								<div className="relative space-y-3 overflow-hidden rounded-lg border bg-main p-2">
									{!expandedSections.base && (
										<div className="-bottom-2 absolute left-0 h-[6.5rem] w-full bg-linear-to-t/srgb from-background dark:from-black" />
									)}
									<div className="flex items-center justify-between p-1">
										<h5 className="font-medium text-muted-foreground text-xs">
											Base Colors
										</h5>
										<div className="flex items-center gap-2">
											<span className="text-muted-foreground text-xs">
												{expandedSections.base ? "Show Less" : "Show All"}
											</span>
											<Switch
												checked={expandedSections.base}
												onCheckedChange={() => toggleSectionExpansion("base")}
											/>
										</div>
									</div>
									{baseColors
										.slice(0, expandedSections.base ? baseColors.length : 3)
										.map((color) => (
											<ColorPickerItem
												key={color.key}
												colorKey={color.key}
												label={color.label}
											/>
										))}
								</div>

								<div className="relative space-y-3 overflow-hidden rounded-lg border bg-main p-2">
									{!expandedSections.ui && (
										<div className="-bottom-2 absolute left-0 h-[6.5rem] w-full bg-linear-to-t/srgb from-background dark:from-black" />
									)}
									<div className="flex items-center justify-between p-1 ">
										<h5 className="font-medium text-muted-foreground text-xs">
											UI Colors
										</h5>
										<div className="flex items-center gap-2">
											<span className="text-muted-foreground text-xs">
												{expandedSections.ui ? "Show Less" : "Show All"}
											</span>
											<Switch
												checked={expandedSections.ui}
												onCheckedChange={() => toggleSectionExpansion("ui")}
											/>
										</div>
									</div>
									{uiColors
										.slice(0, expandedSections.ui ? uiColors.length : 3)
										.map((color) => (
											<ColorPickerItem
												key={color.key}
												colorKey={color.key}
												label={color.label}
											/>
										))}
								</div>

								<div className="relative space-y-3 overflow-hidden rounded-lg border bg-main p-2">
									{!expandedSections.component && (
										<div className="-bottom-2 absolute left-0 h-[6.5rem] w-full bg-linear-to-t/srgb from-background dark:from-black" />
									)}
									<div className="flex items-center justify-between p-1">
										<h5 className="font-medium text-muted-foreground text-xs">
											Component Colors
										</h5>
										<div className="flex items-center gap-2">
											<span className="text-muted-foreground text-xs">
												{expandedSections.component ? "Show Less" : "Show All"}
											</span>
											<Switch
												checked={expandedSections.component}
												onCheckedChange={() =>
													toggleSectionExpansion("component")
												}
											/>
										</div>
									</div>
									{componentColors
										.slice(
											0,
											expandedSections.component ? componentColors.length : 3,
										)
										.map((color) => (
											<ColorPickerItem
												key={color.key}
												colorKey={color.key}
												label={color.label}
											/>
										))}
								</div>
							</div>
						</div>
					</ScrollArea>
				</div>

				{/* Theme Preview */}
				<div className="relative inset-shadow-[0_1px_rgb(0_0_0/0.10)] rounded-xl border bg-card-bg p-4 md:col-span-9 dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)] dark:border-0">
					<div
						className={`rounded-lg border p-6 transition-colors ${
							previewMode === "dark"
								? "dark bg-[hsl(var(--background))]"
								: "bg-[hsl(var(--background))]"
						}`}
						style={
							{
								"--background": themeVars.background,
								"--foreground": themeVars.foreground,
								"--card": themeVars.card,
								"--card-foreground": themeVars["card-foreground"],
								"--popover": themeVars.popover,
								"--popover-foreground": themeVars["popover-foreground"],
								"--primary": themeVars.primary,
								"--primary-foreground": themeVars["primary-foreground"],
								"--secondary": themeVars.secondary,
								"--secondary-foreground": themeVars["secondary-foreground"],
								"--muted": themeVars.muted,
								"--muted-foreground": themeVars["muted-foreground"],
								"--accent": themeVars.accent,
								"--accent-foreground": themeVars["accent-foreground"],
								"--destructive": themeVars.destructive,
								"--destructive-foreground": themeVars["destructive-foreground"],
								"--border": themeVars.border,
								"--input": themeVars.input,
								"--ring": themeVars.ring,
								"--radius": themeVars.radius || "0.5rem",
							} as React.CSSProperties
						}
					>
						<ThemePreview />
					</div>
					<CopyCode
						title="Theme Code"
						defaultTab="css"
						tabs={[
							{
								value: "css",
								label: "CSS",
								code: cssCode,
								description: "CSS variables",
							},
							{
								value: "tailwind-v3",
								label: "Tailwind v3",
								code: tailwindConfig,
								description: "Tailwind v3 config",
							},
							{
								value: "tailwind-v4",
								label: "Tailwind v4",
								code: cssCodeV4,
								description: "Tailwind v4 theme",
							},
						]}
					/>
				</div>
			</div>
		</div>
	);
}
