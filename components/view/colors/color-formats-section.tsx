"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ColorFormats } from "@/types/color";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface ColorFormatsSectionProps {
	colorFormats: ColorFormats;
	colorName: string;
	hexValue: string;
	formatHandlers: Record<
		string,
		(e: React.ChangeEvent<HTMLInputElement>) => void
	>;
	handleColorPicker: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ColorFormatsSection({
	colorFormats,
	colorName,
	hexValue,
	formatHandlers,
	handleColorPicker,
}: ColorFormatsSectionProps) {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success(`${text} copied to clipboard`, {
			duration: 2000,
		});
	};

	return (
		<div className="mb-6 rounded-lg border p-4">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="font-medium text-lg">All Color Formats</h3>
				<div className="flex items-center gap-2">
					<div className="relative">
						<div
							className="h-8 w-8 cursor-pointer rounded-md border"
							style={{ backgroundColor: hexValue }}
						/>
						<input
							type="color"
							value={hexValue}
							onChange={handleColorPicker}
							className="absolute inset-0 cursor-pointer opacity-0"
						/>
					</div>
					<span className="text-muted-foreground text-sm">{colorName}</span>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
				{Object.entries(colorFormats).map(([format, value]) => (
					<div key={format} className="flex items-center gap-2">
						<div className="w-12 font-medium text-xs uppercase">{format}:</div>
						<div className="relative flex-1">
							<Input
								value={value}
								onChange={formatHandlers[format as keyof typeof formatHandlers]}
								className="pr-10 font-mono text-sm"
								placeholder={`Enter ${format} value`}
							/>
							<Button
								variant="ghost"
								size="icon"
								className="absolute top-0 right-0 h-full"
								onClick={() => copyToClipboard(value)}
							>
								<Copy className="h-4 w-4" />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
