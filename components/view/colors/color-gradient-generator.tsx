"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";

interface ColorGradientGeneratorProps {
	initialStartColor?: string;
	initialEndColor?: string;
}

export function ColorGradientGenerator({
	initialStartColor = "#3B82F6",
	initialEndColor = "#EC4899",
}: ColorGradientGeneratorProps) {
	const [startColor, setStartColor] = useState(initialStartColor);
	const [endColor, setEndColor] = useState(initialEndColor);
	const [angle, setAngle] = useState(90);
	const [stops, _setStops] = useState(2);
	const [gradientType, setGradientType] = useState<
		"linear" | "radial" | "conic"
	>("linear");
	const [cssCode, setCssCode] = useState("");
	const previewRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		generateGradient();
	}, [startColor, endColor, angle, stops, gradientType]);

	const generateGradient = () => {
		let gradient = "";
		let code = "";

		if (gradientType === "linear") {
			gradient = `linear-gradient(${angle}deg, ${startColor}, ${endColor})`;
			code = `background: ${gradient};`;
		} else if (gradientType === "radial") {
			gradient = `radial-gradient(circle, ${startColor}, ${endColor})`;
			code = `background: ${gradient};`;
		} else if (gradientType === "conic") {
			gradient = `conic-gradient(from ${angle}deg, ${startColor}, ${endColor})`;
			code = `background: ${gradient};`;
		}

		if (previewRef.current) {
			previewRef.current.style.background = gradient;
		}

		setCssCode(code);
	};

	const copyToClipboard = () => {
		navigator.clipboard.writeText(cssCode);
		toast.success("CSS code copied to clipboard", {
			duration: 2000,
		});
	};

	return (
		<Card>
			<CardHeader className="pb-3">
				<CardTitle className="font-medium text-lg">
					Gradient Generator
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<Tabs
					value={gradientType}
					onValueChange={(value) =>
						setGradientType(value as typeof gradientType)
					}
				>
					<TabsList className="grid grid-cols-3">
						<TabsTrigger value="linear">Linear</TabsTrigger>
						<TabsTrigger value="radial">Radial</TabsTrigger>
						<TabsTrigger value="conic">Conic</TabsTrigger>
					</TabsList>
				</Tabs>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<Label>Start Color</Label>
						<div className="flex gap-2">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="flex h-10 w-full items-center justify-between border p-0"
									>
										<div
											className="aspect-square h-full rounded-l-sm border-r"
											style={{ backgroundColor: startColor }}
										/>
										<div className="flex-1 px-2 font-mono text-xs">
											{startColor}
										</div>
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-3" align="start">
									<HexColorPicker color={startColor} onChange={setStartColor} />
								</PopoverContent>
							</Popover>
						</div>
					</div>

					<div className="space-y-2">
						<Label>End Color</Label>
						<div className="flex gap-2">
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										className="flex h-10 w-full items-center justify-between border p-0"
									>
										<div
											className="aspect-square h-full rounded-l-sm border-r"
											style={{ backgroundColor: endColor }}
										/>
										<div className="flex-1 px-2 font-mono text-xs">
											{endColor}
										</div>
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-3" align="start">
									<HexColorPicker color={endColor} onChange={setEndColor} />
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>

				{(gradientType === "linear" || gradientType === "conic") && (
					<div className="space-y-2">
						<div className="flex justify-between">
							<Label htmlFor="angle-slider">Angle</Label>
							<span className="text-muted-foreground text-sm">{angle}°</span>
						</div>
						<Slider
							id="angle-slider"
							min={0}
							max={360}
							step={1}
							value={[angle]}
							onValueChange={(value) => setAngle(value[0])}
						/>
					</div>
				)}

				<div className="space-y-4">
					<div ref={previewRef} className="h-32 rounded-md border" />

					<div className="flex items-center space-x-2">
						<Input value={cssCode} readOnly className="font-mono text-sm" />
						<Button variant="outline" size="icon" onClick={copyToClipboard}>
							<Copy className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
