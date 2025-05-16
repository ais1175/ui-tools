"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from "@/lib/color-utils";
import {
	generateShadcnTheme,
	generateTailwindConfig,
	generateThemeCSS,
	generateThemeCSSv4,
} from "@/lib/theme-utils";
import { TooltipContent } from "@radix-ui/react-tooltip";
import {
	Check,
	Copy,
	Moon,
	MoonIcon,
	Palette,
	RefreshCw,
	Share2,
	Sun,
	SunIcon,
} from "lucide-react";
import { useQueryState } from "nuqs";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { ColorPicker } from "./color-picker";
import { CopyCode } from "./copy-code";
import { EXAMPLE_THEMES } from "./example-theme";
import { ThemePreview } from "./theme-preview";

interface ThemeGeneratorProps {
	hexValue: string;
}

// Define color groups as static constants outside the component
const BASE_COLORS = [
	{ key: "background", label: "Background" },
	{ key: "foreground", label: "Foreground" },
	{ key: "card", label: "Card" },
	{ key: "card-foreground", label: "Card Foreground" },
	{ key: "popover", label: "Popover" },
	{ key: "popover-foreground", label: "Popover Foreground" },
];

const UI_COLORS = [
	{ key: "primary", label: "Primary" },
	{ key: "primary-foreground", label: "Primary Foreground" },
	{ key: "secondary", label: "Secondary" },
	{ key: "secondary-foreground", label: "Secondary Foreground" },
	{ key: "accent", label: "Accent" },
	{ key: "accent-foreground", label: "Accent Foreground" },
	{ key: "destructive", label: "Destructive" },
	{ key: "destructive-foreground", label: "Destructive Foreground" },
];

const COMPONENT_COLORS = [
	{ key: "muted", label: "Muted" },
	{ key: "muted-foreground", label: "Muted Foreground" },
	{ key: "border", label: "Border" },
	{ key: "input", label: "Input" },
	{ key: "ring", label: "Ring" },
];

export function ThemeGenerator({ hexValue }: ThemeGeneratorProps) {
	// Use nuqs for persisting state in URL
	const [previewMode, setPreviewMode] = useQueryState("mode", {
		defaultValue: "light",
		parse: (value) => (value === "dark" ? "dark" : "light"),
		serialize: (value) => value,
	});
	const [activeTheme, setActiveTheme] = useQueryState("activeTheme");

	// Store expanded sections in URL
	const [expandedSectionsJson, setExpandedSectionsJson] = useQueryState(
		"expanded",
		{
			defaultValue: JSON.stringify({
				base: false,
				ui: false,
				component: false,
			}),
			parse: (value) => {
				try {
					return JSON.parse(value);
				} catch {
					return { base: false, ui: false, component: false };
				}
			},
			serialize: (value) => JSON.stringify(value),
		},
	);

	// Store custom colors in URL
	const [customLightColorsJson, setCustomLightColorsJson] = useQueryState(
		"lightColors",
		{
			defaultValue: "{}",
			parse: (value) => {
				try {
					return JSON.parse(value);
				} catch {
					return {};
				}
			},
			serialize: (value) => JSON.stringify(value),
		},
	);

	const [customDarkColorsJson, setCustomDarkColorsJson] = useQueryState(
		"darkColors",
		{
			defaultValue: "{}",
			parse: (value) => {
				try {
					return JSON.parse(value);
				} catch {
					return {};
				}
			},
			serialize: (value) => JSON.stringify(value),
		},
	);

	// Theme state
	const [baseThemeJson, setBaseThemeJson] = useQueryState("baseTheme", {
		defaultValue: "null",
		parse: (value) => {
			try {
				return JSON.parse(value);
			} catch {
				return null;
			}
		},
		serialize: (value) => JSON.stringify(value),
	});
	// State for copied theme
	const [_copiedTheme, setCopiedTheme] = useState<string | null>(null);
	// Parse JSON values using useMemo to ensure consistent hook order
	const expandedSections = useMemo(() => {
		return typeof expandedSectionsJson === "string"
			? JSON.parse(expandedSectionsJson)
			: expandedSectionsJson;
	}, [expandedSectionsJson]);

	const customLightColors = useMemo(() => {
		return typeof customLightColorsJson === "string"
			? JSON.parse(customLightColorsJson)
			: customLightColorsJson;
	}, [customLightColorsJson]);

	const customDarkColors = useMemo(() => {
		return typeof customDarkColorsJson === "string"
			? JSON.parse(customDarkColorsJson)
			: customDarkColorsJson;
	}, [customDarkColorsJson]);

	const baseTheme = useMemo(() => {
		return typeof baseThemeJson === "string"
			? JSON.parse(baseThemeJson)
			: baseThemeJson;
	}, [baseThemeJson]);

	// Add a function to toggle section expansion
	const toggleSectionExpansion = useCallback(
		(section: "base" | "ui" | "component") => {
			setExpandedSectionsJson({
				...expandedSections,
				[section]: !expandedSections[section],
			});
		},
		[expandedSections, setExpandedSectionsJson],
	);

	// Update base theme when hex value changes
	useEffect(() => {
		const theme = generateShadcnTheme(hexValue);
		if (theme) {
			setBaseThemeJson(theme);
		}
	}, [hexValue, setBaseThemeJson]);

	// Convert HSL string to hex color for color picker
	const hslToHexColor = useCallback((hslString: string) => {
		const [h, s, l] = hslString
			.split(" ")
			.map((val) => Number.parseFloat(val.replace("%", "")));
		const rgb = hslToRgb(h, s, l);
		return rgbToHex(rgb.r, rgb.g, rgb.b);
	}, []);

	// Convert hex color to HSL string for theme
	const hexToHslString = useCallback((hexColor: string) => {
		const rgb = hexToRgb(hexColor);
		if (!rgb) return "0 0% 0%";
		const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);
		return `${h} ${s}% ${l}%`;
	}, []);

	// Handle color picker change
	const handleColorChange = useCallback(
		(colorKey: string, hexColor: string) => {
			const hslValue = hexToHslString(hexColor);

			if (previewMode === "light") {
				setCustomLightColorsJson({
					...customLightColors,
					[colorKey]: hslValue,
				});
			} else {
				setCustomDarkColorsJson({
					...customDarkColors,
					[colorKey]: hslValue,
				});
			}
		},
		[
			previewMode,
			hexToHslString,
			customLightColors,
			customDarkColors,
			setCustomLightColorsJson,
			setCustomDarkColorsJson,
		],
	);

	// Reset a specific color to its base value
	const resetColor = useCallback(
		(colorKey: string) => {
			if (previewMode === "light") {
				const newColors = { ...customLightColors };
				delete newColors[colorKey];
				setCustomLightColorsJson(newColors);
			} else {
				const newColors = { ...customDarkColors };
				delete newColors[colorKey];
				setCustomDarkColorsJson(newColors);
			}

			toast("Color reset", {
				description: `${colorKey} has been reset to the generated value`,
				duration: 2000,
			});
		},
		[
			previewMode,
			customLightColors,
			customDarkColors,
			setCustomLightColorsJson,
			setCustomDarkColorsJson,
		],
	);

	// Reset all custom colors
	const resetAllColors = useCallback(() => {
		if (previewMode === "light") {
			setCustomLightColorsJson({});
		} else {
			setCustomDarkColorsJson({});
		}

		toast("Colors reset", {
			description: "All colors have been reset to the generated values",
			duration: 2000,
		});
	}, [previewMode, setCustomLightColorsJson, setCustomDarkColorsJson]);

	// Copy shareable URL
	const copyShareableUrl = useCallback(() => {
		const url = window.location.href;
		navigator.clipboard.writeText(url);
		toast("URL copied!", {
			description: "Shareable theme URL has been copied to clipboard",
			duration: 2000,
		});
	}, []);
	// Apply example theme
	const applyExampleTheme = useCallback(
		(theme: (typeof EXAMPLE_THEMES)[0]) => {
			// Update base color (this will regenerate the base theme)
			const newHexValue = theme.baseColor;
			const newTheme = generateShadcnTheme(newHexValue);

			if (newTheme) {
				setBaseThemeJson(newTheme);

				// Apply custom light colors
				setCustomLightColorsJson(theme.lightColors);

				// Apply custom dark colors
				setCustomDarkColorsJson(theme.darkColors);

				toast.success("Theme applied", {
					description: `${theme.name} theme has been applied`,
					duration: 2000,
				});
			}
		},
		[setBaseThemeJson, setCustomLightColorsJson, setCustomDarkColorsJson],
	);

	// Copy theme to clipboard
	const _copyThemeToClipboard = useCallback((themeIndex: number) => {
		const theme = EXAMPLE_THEMES[themeIndex];
		const themeData = {
			baseColor: theme.baseColor,
			lightColors: theme.lightColors,
			darkColors: theme.darkColors,
		};

		navigator.clipboard.writeText(JSON.stringify(themeData, null, 2));
		setCopiedTheme(theme.name);

		setTimeout(() => {
			setCopiedTheme(null);
		}, 2000);

		toast("Theme copied", {
			description: `${theme.name} theme configuration copied to clipboard`,
			duration: 2000,
		});
	}, []);
	// Prepare theme data - do this before any conditional returns
	const themeData = useMemo(() => {
		if (!baseTheme) return null;

		const { lightTheme: baseLightTheme, darkTheme: baseDarkTheme } = baseTheme;

		// Merge base theme with custom colors
		const lightTheme = { ...baseLightTheme, ...customLightColors };
		const darkTheme = { ...baseDarkTheme, ...customDarkColors };

		const cssCode = generateThemeCSS(lightTheme, darkTheme);
		const cssCodeV4 = generateThemeCSSv4(lightTheme, darkTheme);
		const tailwindConfig = generateTailwindConfig(hexValue);

		// Get current theme variables
		const themeVars = previewMode === "light" ? lightTheme : darkTheme;

		return {
			lightTheme,
			darkTheme,
			cssCode,
			cssCodeV4,
			tailwindConfig,
			themeVars,
		};
	}, [baseTheme, customLightColors, customDarkColors, previewMode, hexValue]);

	// Early return with a loading state instead of null
	if (!themeData) {
		return <div className="p-4">Loading theme...</div>;
	}

	// Color picker component
	function ColorPickerItem({
		colorKey,
		label,
	}: {
		colorKey: string;
		label: string;
	}) {
		const currentHslValue = themeData?.themeVars[colorKey];
		const isCustomized =
			previewMode === "light"
				? customLightColors[colorKey] !== undefined
				: customDarkColors[colorKey] !== undefined;

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
					className="bg-card-bg"
					id={`${previewMode}-${colorKey}`}
					value={hslToHexColor(currentHslValue)}
					onChange={(value) => handleColorChange(colorKey, value)}
				/>
			</div>
		);
	}

	return (
		<div className="mt-20 space-y-6">
			<div className="flex items-center justify-between">
				<h3 className="font-semibold text-xl">Shadcn/UI Theme Generator</h3>
				<div className="flex gap-2">
					<div className="relative inline-grid h-9 grid-cols-[1fr_1fr] items-center font-medium text-sm">
						<Switch
							checked={previewMode === "dark"}
							onCheckedChange={(checked) =>
								setPreviewMode(checked ? "dark" : "light")
							}
							className="peer [&_span]:data-[state=checked]:rtl:-translate-x-full absolute inset-0 h-[inherit] w-auto data-[state=unchecked]:bg-input/50 [&_span]:z-10 [&_span]:h-full [&_span]:w-1/2 [&_span]:transition-transform [&_span]:duration-300 [&_span]:ease-[cubic-bezier(0.16,1,0.3,1)] [&_span]:data-[state=checked]:translate-x-full"
						/>
						<span className="peer-data-[state=unchecked]:rtl:-translate-x-full pointer-events-none relative ms-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=checked]:invisible peer-data-[state=unchecked]:translate-x-full">
							<MoonIcon size={16} aria-hidden="true" />
						</span>
						<span className="peer-data-[state=checked]:-translate-x-full pointer-events-none relative me-0.5 flex min-w-8 items-center justify-center text-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] peer-data-[state=unchecked]:invisible peer-data-[state=checked]:text-background peer-data-[state=checked]:rtl:translate-x-full">
							<SunIcon size={16} aria-hidden="true" />
						</span>
					</div>
					<Label className="sr-only">Labeled switch</Label>
					<Button variant="outline" size="sm" onClick={copyShareableUrl}>
						<Share2 className="mr-1 h-4 w-4" />
						Share
					</Button>
					{/* Theme Code */}
					<div className="relative rounded-lg">
						<CopyCode
							defaultTab="css"
							tabs={[
								{
									value: "css",
									label: "CSS",
									code: themeData.cssCode,
									description: "CSS variables",
								},
								{
									value: "tailwind-v3",
									label: "Tailwind v3",
									code: themeData.tailwindConfig,
									description: "Tailwind v3 config",
								},
								{
									value: "tailwind-v4",
									label: "Tailwind v4",
									code: themeData.cssCodeV4,
									description: "Tailwind v4 theme",
								},
							]}
						/>
					</div>
				</div>
			</div>
			<div className="flex gap-4 overflow-x-auto pb-4">
				{EXAMPLE_THEMES.map((theme, _index) => {
					// Generate a preview of the theme colors
					const themePreview = generateShadcnTheme(theme.baseColor);
					if (!themePreview) return null;

					const lightThemeWithCustom = {
						...themePreview.lightTheme,
						...theme.lightColors,
					};

					return (
						<div
							key={theme.name}
							className="w-56 shrink-0 overflow-hidden rounded-md border"
						>
							<div className="space-y-2 p-3">
								<div className="flex items-center justify-between">
									<h5 className="font-medium text-sm">{theme.name}</h5>
								</div>
								<p className="text-muted-foreground text-xs">
									{theme.description}
								</p>
								<div className="mt-2 flex gap-1">
									<div
										className="h-8 w-full rounded-lg border"
										style={{
											backgroundColor: `hsl(${lightThemeWithCustom.primary})`,
										}}
									/>
									<div
										className="h-8 w-full rounded-lg border"
										style={{
											backgroundColor: `hsl(${lightThemeWithCustom.secondary})`,
										}}
									/>
									<div
										className="h-8 w-full rounded-lg border"
										style={{
											backgroundColor: `hsl(${lightThemeWithCustom.accent})`,
										}}
									/>
									<div
										className="h-8 w-full rounded-lg border"
										style={{
											backgroundColor: `hsl(${lightThemeWithCustom.muted})`,
										}}
									/>
								</div>
							</div>
							<Button
								className="w-full rounded-none rounded-b-md"
								variant={theme?.name === activeTheme ? "default" : "secondary"}
								onClick={() => {
									setActiveTheme(theme.name);
									applyExampleTheme(theme);
								}}
							>
								Apply Theme
							</Button>
						</div>
					);
				})}
			</div>
			<div className="relative grid grid-cols-1 gap-6 md:grid-cols-12">
				{/* Color Pickers */}
				<div className="sticky top-5 h-[95vh] md:col-span-3">
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
									{BASE_COLORS.slice(
										0,
										expandedSections.base ? BASE_COLORS.length : 3,
									).map((color) => (
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
									{UI_COLORS.slice(
										0,
										expandedSections.ui ? UI_COLORS.length : 3,
									).map((color) => (
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
									{COMPONENT_COLORS.slice(
										0,
										expandedSections.component ? COMPONENT_COLORS.length : 3,
									).map((color) => (
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
					{/* <DashboardPreview /> */}
					<div
						className={"rounded-lg transition-colors "}
						style={
							{
								"--background": themeData.themeVars.background,
								"--foreground": themeData.themeVars.foreground,
								"--card": themeData.themeVars.card,
								"--card-foreground": themeData.themeVars["card-foreground"],
								"--popover": themeData.themeVars.popover,
								"--popover-foreground":
									themeData.themeVars["popover-foreground"],
								"--primary": themeData.themeVars.primary,
								"--primary-foreground":
									themeData.themeVars["primary-foreground"],
								"--secondary": themeData.themeVars.secondary,
								"--secondary-foreground":
									themeData.themeVars["secondary-foreground"],
								"--muted": themeData.themeVars.muted,
								"--muted-foreground": themeData.themeVars["muted-foreground"],
								"--accent": themeData.themeVars.accent,
								"--accent-foreground": themeData.themeVars["accent-foreground"],
								"--destructive": themeData.themeVars.destructive,
								"--destructive-foreground":
									themeData.themeVars["destructive-foreground"],
								"--border": themeData.themeVars.border,
								"--input": themeData.themeVars.input,
								"--ring": themeData.themeVars.ring,
								"--radius": themeData.themeVars.radius || "0.5rem",
							} as React.CSSProperties
						}
					>
						<ThemePreview />
					</div>
				</div>
			</div>
		</div>
	);
}
