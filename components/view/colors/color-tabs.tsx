"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
	CmykColor,
	HslColor,
	HslaColor,
	HsvColor,
	RgbColor,
	RgbaColor,
} from "@/types/color";
import { Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ColorTabsProps {
	hexValue: string;
	rgbValues: RgbColor;
	rgbaValues: RgbaColor;
	hslValues: HslColor;
	hslaValues: HslaColor;
	cmykValues: CmykColor;
	hsvValues: HsvColor;
	handleHexChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleRgbChange: (channel: "r" | "g" | "b", value: number) => void;
	handleRgbaChange: (channel: "r" | "g" | "b" | "a", value: number) => void;
	handleHslChange: (channel: "h" | "s" | "l", value: number) => void;
	handleHslaChange: (channel: "h" | "s" | "l" | "a", value: number) => void;
	handleColorPicker: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleRgbInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleRgbaInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleHslInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleHslaInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleCmykInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleHsvInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ColorTabs({
	hexValue,
	rgbValues,
	rgbaValues,
	hslValues,
	hslaValues,
	cmykValues,
	hsvValues,
	handleHexChange,
	handleRgbChange,
	handleRgbaChange,
	handleHslChange,
	handleHslaChange,
	handleColorPicker,
	handleRgbInput,
	handleRgbaInput,
	handleHslInput,
	handleHslaInput,
	handleCmykInput,
	handleHsvInput,
}: ColorTabsProps) {
	const [activeTab, setActiveTab] = useState("hex");

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success(`${text} copied to clipboard`, {
			duration: 2000,
		});
	};

	return (
		<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
			<TabsList className="mb-4 grid grid-cols-3 md:grid-cols-6">
				<TabsTrigger value="hex">HEX</TabsTrigger>
				<TabsTrigger value="rgb">RGB</TabsTrigger>
				<TabsTrigger value="rgba">RGBA</TabsTrigger>
				<TabsTrigger value="hsl">HSL</TabsTrigger>
				<TabsTrigger value="hsla">HSLA</TabsTrigger>
				<TabsTrigger value="more">More</TabsTrigger>
			</TabsList>

			<TabsContent value="hex" className="space-y-4">
				<div className="grid gap-2">
					<Label htmlFor="hex-input">HEX Color</Label>
					<div className="flex gap-2">
						<Input
							id="hex-input"
							value={hexValue}
							onChange={handleHexChange}
							className="font-mono"
							placeholder="#000000"
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										onClick={() => copyToClipboard(hexValue)}
									>
										<Copy className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Copy HEX</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<input
							type="color"
							value={hexValue}
							onChange={handleColorPicker}
							className="h-10 w-10 cursor-pointer rounded-md"
						/>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="rgb" className="space-y-4">
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="rgb-r">Red ({rgbValues.r})</Label>
						<Slider
							id="rgb-r"
							min={0}
							max={255}
							step={1}
							value={[rgbValues.r]}
							onValueChange={(value) => handleRgbChange("r", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="rgb-g">Green ({rgbValues.g})</Label>
						<Slider
							id="rgb-g"
							min={0}
							max={255}
							step={1}
							value={[rgbValues.g]}
							onValueChange={(value) => handleRgbChange("g", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="rgb-b">Blue ({rgbValues.b})</Label>
						<Slider
							id="rgb-b"
							min={0}
							max={255}
							step={1}
							value={[rgbValues.b]}
							onValueChange={(value) => handleRgbChange("b", value[0])}
						/>
					</div>
					<div className="flex gap-2">
						<Input
							value={`rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`}
							onChange={handleRgbInput}
							className="font-mono"
							placeholder="rgb(255, 255, 255)"
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											copyToClipboard(
												`rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`,
											)
										}
									>
										<Copy className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Copy RGB</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="rgba" className="space-y-4">
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="rgba-r">Red ({rgbaValues.r})</Label>
						<Slider
							id="rgba-r"
							min={0}
							max={255}
							step={1}
							value={[rgbaValues.r]}
							onValueChange={(value) => handleRgbaChange("r", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="rgba-g">Green ({rgbaValues.g})</Label>
						<Slider
							id="rgba-g"
							min={0}
							max={255}
							step={1}
							value={[rgbaValues.g]}
							onValueChange={(value) => handleRgbaChange("g", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="rgba-b">Blue ({rgbaValues.b})</Label>
						<Slider
							id="rgba-b"
							min={0}
							max={255}
							step={1}
							value={[rgbaValues.b]}
							onValueChange={(value) => handleRgbaChange("b", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="rgba-a">Alpha ({rgbaValues.a.toFixed(2)})</Label>
						<Slider
							id="rgba-a"
							min={0}
							max={1}
							step={0.01}
							value={[rgbaValues.a]}
							onValueChange={(value) => handleRgbaChange("a", value[0])}
						/>
					</div>
					<div className="flex gap-2">
						<Input
							value={`rgba(${rgbaValues.r}, ${rgbaValues.g}, ${rgbaValues.b}, ${rgbaValues.a.toFixed(2)})`}
							onChange={handleRgbaInput}
							className="font-mono"
							placeholder="rgba(255, 255, 255, 1.0)"
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											copyToClipboard(
												`rgba(${rgbaValues.r}, ${rgbaValues.g}, ${rgbaValues.b}, ${rgbaValues.a.toFixed(2)})`,
											)
										}
									>
										<Copy className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Copy RGBA</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="hsl" className="space-y-4">
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="hsl-h">Hue ({hslValues.h}°)</Label>
						<Slider
							id="hsl-h"
							min={0}
							max={360}
							step={1}
							value={[hslValues.h]}
							onValueChange={(value) => handleHslChange("h", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="hsl-s">Saturation ({hslValues.s}%)</Label>
						<Slider
							id="hsl-s"
							min={0}
							max={100}
							step={1}
							value={[hslValues.s]}
							onValueChange={(value) => handleHslChange("s", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="hsl-l">Lightness ({hslValues.l}%)</Label>
						<Slider
							id="hsl-l"
							min={0}
							max={100}
							step={1}
							value={[hslValues.l]}
							onValueChange={(value) => handleHslChange("l", value[0])}
						/>
					</div>
					<div className="flex gap-2">
						<Input
							value={`hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`}
							onChange={handleHslInput}
							className="font-mono"
							placeholder="hsl(0, 0%, 100%)"
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											copyToClipboard(
												`hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`,
											)
										}
									>
										<Copy className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Copy HSL</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="hsla" className="space-y-4">
				<div className="grid gap-4">
					<div className="grid gap-2">
						<Label htmlFor="hsla-h">Hue ({hslaValues.h}°)</Label>
						<Slider
							id="hsla-h"
							min={0}
							max={360}
							step={1}
							value={[hslaValues.h]}
							onValueChange={(value) => handleHslaChange("h", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="hsla-s">Saturation ({hslaValues.s}%)</Label>
						<Slider
							id="hsla-s"
							min={0}
							max={100}
							step={1}
							value={[hslaValues.s]}
							onValueChange={(value) => handleHslaChange("s", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="hsla-l">Lightness ({hslaValues.l}%)</Label>
						<Slider
							id="hsla-l"
							min={0}
							max={100}
							step={1}
							value={[hslaValues.l]}
							onValueChange={(value) => handleHslaChange("l", value[0])}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="hsla-a">Alpha ({hslaValues.a.toFixed(2)})</Label>
						<Slider
							id="hsla-a"
							min={0}
							max={1}
							step={0.01}
							value={[hslaValues.a]}
							onValueChange={(value) => handleHslaChange("a", value[0])}
						/>
					</div>
					<div className="flex gap-2">
						<Input
							value={`hsla(${hslaValues.h}, ${hslaValues.s}%, ${hslaValues.l}%, ${hslaValues.a.toFixed(2)})`}
							onChange={handleHslaInput}
							className="font-mono"
							placeholder="hsla(0, 0%, 100%, 1.0)"
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											copyToClipboard(
												`hsla(${hslaValues.h}, ${hslaValues.s}%, ${hslaValues.l}%, ${hslaValues.a.toFixed(2)})`,
											)
										}
									>
										<Copy className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Copy HSLA</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</TabsContent>

			<TabsContent value="more" className="space-y-6">
				<div className="grid gap-4">
					<h3 className="font-medium text-lg">CMYK</h3>
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						<div>
							<Label>Cyan</Label>
							<div className="mt-1 font-mono">{cmykValues.c}%</div>
						</div>
						<div>
							<Label>Magenta</Label>
							<div className="mt-1 font-mono">{cmykValues.m}%</div>
						</div>
						<div>
							<Label>Yellow</Label>
							<div className="mt-1 font-mono">{cmykValues.y}%</div>
						</div>
						<div>
							<Label>Key (Black)</Label>
							<div className="mt-1 font-mono">{cmykValues.k}%</div>
						</div>
					</div>
					<div className="flex gap-2">
						<Input
							value={`cmyk(${cmykValues.c}%, ${cmykValues.m}%, ${cmykValues.y}%, ${cmykValues.k}%)`}
							onChange={handleCmykInput}
							className="font-mono"
							placeholder="cmyk(0%, 0%, 0%, 0%)"
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											copyToClipboard(
												`cmyk(${cmykValues.c}%, ${cmykValues.m}%, ${cmykValues.y}%, ${cmykValues.k}%)`,
											)
										}
									>
										<Copy className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Copy CMYK</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>

				<Separator />

				<div className="grid gap-4">
					<h3 className="font-medium text-lg">HSV</h3>
					<div className="grid grid-cols-3 gap-4">
						<div>
							<Label>Hue</Label>
							<div className="mt-1 font-mono">{hsvValues.h}°</div>
						</div>
						<div>
							<Label>Saturation</Label>
							<div className="mt-1 font-mono">{hsvValues.s}%</div>
						</div>
						<div>
							<Label>Value</Label>
							<div className="mt-1 font-mono">{hsvValues.v}%</div>
						</div>
					</div>
					<div className="flex gap-2">
						<Input
							value={`hsv(${hsvValues.h}°, ${hsvValues.s}%, ${hsvValues.v}%)`}
							onChange={handleHsvInput}
							className="font-mono"
							placeholder="hsv(0°, 0%, 100%)"
						/>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant="outline"
										size="icon"
										onClick={() =>
											copyToClipboard(
												`hsv(${hsvValues.h}°, ${hsvValues.s}%, ${hsvValues.v}%)`,
											)
										}
									>
										<Copy className="h-4 w-4" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Copy HSV</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</TabsContent>
		</Tabs>
	);
}
