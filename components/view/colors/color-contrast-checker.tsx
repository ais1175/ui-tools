"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	getAccessibilityLevel,
	getContrastRatio,
	hexToRgb,
} from "@/lib/color-utils";
import { AlertTriangle, Check, Info } from "lucide-react";
import { useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorContrastCheckerProps {
	initialForeground: string;
	initialBackground: string;
}

export function ColorContrastChecker({
	initialForeground = "#FFFFFF",
	initialBackground = "#000000",
}: ColorContrastCheckerProps) {
	const [foreground, setForeground] = useState(initialForeground);
	const [background, setBackground] = useState(initialBackground);
	const [swapDirection, setSwapDirection] = useState<
		"foreground-on-background" | "background-on-foreground"
	>("foreground-on-background");

	const fgRgb = hexToRgb(foreground) || { r: 255, g: 255, b: 255 };
	const bgRgb = hexToRgb(background) || { r: 0, g: 0, b: 0 };

	const contrastRatio = getContrastRatio(fgRgb, bgRgb);
	const accessibilityLevel = getAccessibilityLevel(contrastRatio);

	const swapColors = () => {
		const temp = foreground;
		setForeground(background);
		setBackground(temp);
		setSwapDirection(
			swapDirection === "foreground-on-background"
				? "background-on-foreground"
				: "foreground-on-background",
		);
	};

	const getContrastBadge = () => {
		if (accessibilityLevel === "AAA") {
			return (
				<Badge className="bg-green-500 hover:bg-green-600">
					<Check className="mr-1 h-3 w-3" />
					AAA
				</Badge>
			);
		}
		if (accessibilityLevel === "AA") {
			return (
				<Badge className="bg-blue-500 hover:bg-blue-600">
					<Check className="mr-1 h-3 w-3" />
					AA
				</Badge>
			);
		}
		if (accessibilityLevel === "AA Large") {
			return (
				<Badge variant="outline" className="border-yellow-500 text-yellow-500">
					<Info className="mr-1 h-3 w-3" />
					AA Large
				</Badge>
			);
		}
		return (
			<Badge variant="destructive">
				<AlertTriangle className="mr-1 h-3 w-3" />
				Fail
			</Badge>
		);
	};

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="font-medium text-lg">
					Color Contrast Checker
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Foreground Color</Label>
						<div className="flex gap-2">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="flex h-10 w-full items-center justify-between border p-0"
									>
										<div
											className="aspect-square h-full rounded-l-sm border-r"
											style={{ backgroundColor: foreground }}
										/>
										<div className="flex-1 px-2 font-mono text-xs">
											{foreground}
										</div>
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-3" align="start">
									<HexColorPicker color={foreground} onChange={setForeground} />
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<div className="space-y-2">
						<Label>Background Color</Label>
						<div className="flex gap-2">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="flex h-10 w-full items-center justify-between border p-0"
									>
										<div
											className="aspect-square h-full rounded-l-sm border-r"
											style={{ backgroundColor: background }}
										/>
										<div className="flex-1 px-2 font-mono text-xs">
											{background}
										</div>
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-3" align="start">
									<HexColorPicker color={background} onChange={setBackground} />
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>

				<div className="flex justify-center">
					<Button variant="outline" size="sm" onClick={swapColors}>
						Swap Colors
					</Button>
				</div>

				<div className="space-y-3">
					<div className="text-center">
						<div className="mb-1 font-medium text-sm">Contrast Ratio</div>
						<div className="font-bold text-2xl">
							{contrastRatio.toFixed(2)}:1
						</div>
						<div className="mt-1 flex justify-center">{getContrastBadge()}</div>
					</div>

					<div className="grid grid-cols-2 gap-2">
						<div
							className="flex items-center justify-center rounded-md p-4"
							style={{
								backgroundColor: background,
								color: foreground,
							}}
						>
							<span className="font-medium">Sample Text</span>
						</div>
						<div
							className="flex items-center justify-center rounded-md p-4"
							style={{
								backgroundColor: foreground,
								color: background,
							}}
						>
							<span className="font-medium">Sample Text</span>
						</div>
					</div>
				</div>

				<div className="space-y-2 text-sm">
					<h4 className="font-medium">WCAG Guidelines:</h4>
					<ul className="list-disc space-y-1 pl-5 text-muted-foreground">
						<li>
							<span className="font-medium">AA</span>: Minimum ratio of 4.5:1
							for normal text, 3:1 for large text
						</li>
						<li>
							<span className="font-medium">AAA</span>: Enhanced ratio of 7:1
							for normal text, 4.5:1 for large text
						</li>
						<li>
							<span className="font-medium">Large text</span> is defined as 18pt
							(24px) or 14pt (18.5px) bold
						</li>
					</ul>
				</div>
			</CardContent>
		</Card>
	);
}
