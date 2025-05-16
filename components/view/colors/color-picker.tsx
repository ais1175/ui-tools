"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { EyeIcon as EyeDropperIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
	isBackground?: boolean;
	value: string;
	onChange: (value: string) => void;
	label?: string;
	id: string; // Unique identifier for this color picker
	className?: string;
}

export function ColorPicker({
	isBackground,
	value,
	onChange,
	label,
	id,
	className,
}: ColorPickerProps) {
	const [color, setColor] = useState(value);
	const [eyeDropperSupported, setEyeDropperSupported] = useState(false);

	// Use URL query parameter to track active popover
	const [activePopup, setActivePopup] = useQueryState("activepopup");

	// Determine if this popover should be open
	const isOpen = activePopup === id;

	// Check if EyeDropper API is supported
	useEffect(() => {
		setEyeDropperSupported(
			typeof window !== "undefined" && "EyeDropper" in window,
		);
	}, []);

	// Update local color when prop changes
	useEffect(() => {
		setColor(value);
	}, [value]);

	// Handle color change from the picker
	const handleColorChange = useCallback(
		(newColor: string) => {
			if (newColor !== color) {
				setColor(newColor);
				onChange(newColor);
				// Keep the popover open by not changing activePopup
			}
		},
		[color, onChange],
	);

	// Handle manual hex input
	const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value;
		if (/^#?([0-9A-Fa-f]{0,6})$/.test(newColor)) {
			setColor(newColor);

			// Only update parent if it's a valid hex color
			if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
				onChange(newColor);
			} else if (/^[0-9A-Fa-f]{6}$/.test(newColor)) {
				onChange(`#${newColor}`);
			}
		}
	};

	// Handle eyedropper
	const handleEyeDropper = async () => {
		try {
			// @ts-ignore - EyeDropper is not in the TypeScript DOM types yet
			const eyeDropper = new window.EyeDropper();
			const result = await eyeDropper.open();
			setColor(result.sRGBHex);
			onChange(result.sRGBHex);
			// Keep the popover open
		} catch (e) {
			console.error("Error using eyedropper:", e);
		}
	};

	// Handle popover state changes
	const handleOpenChange = (newOpen: boolean) => {
		if (newOpen) {
			// Set this popover as active
			setActivePopup(id);
		} else {
			// Only clear if this popover is the active one
			if (activePopup === id) {
				setActivePopup(null);
			}
		}
	};

	return (
		<div className="space-y-1.5">
			{label && <Label className="text-xs">{label}</Label>}
			<div className="flex gap-2">
				<Popover open={isOpen} onOpenChange={handleOpenChange}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							className={`flex h-9 w-full items-center justify-between border p-0 ${className}`}
							onClick={() => handleOpenChange(!isOpen)} // Toggle on click
						>
							<div
								className="aspect-square h-full rounded-l-sm border-r"
								style={{ backgroundColor: color }}
							/>
							<div className="flex-1 px-2 font-mono text-xs">{color}</div>
						</Button>
					</PopoverTrigger>
					<PopoverContent
						className="w-80 p-3"
						align="start"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="space-y-3">
							<div
								onClick={(e) => e.stopPropagation()}
								onMouseDown={(e) => e.stopPropagation()}
								onKeyDown={(e) => e.stopPropagation()}
							>
								<HexColorPicker
									className="!w-full"
									color={color}
									onChange={handleColorChange}
								/>
							</div>

							<div className="flex gap-2">
								<div className="flex-1">
									<Input
										value={color}
										onChange={handleHexChange}
										className="h-8 font-mono text-xs"
										onClick={(e) => e.stopPropagation()}
									/>
								</div>

								{eyeDropperSupported && (
									<Button
										variant="outline"
										size="icon"
										className="h-8 w-8"
										onClick={(e) => {
											e.stopPropagation();
											handleEyeDropper();
										}}
									>
										<EyeDropperIcon className="h-4 w-4" />
									</Button>
								)}
							</div>
						</div>
					</PopoverContent>
				</Popover>
				{isBackground && (
					<div
						className="h-8 w-8 flex-shrink-0 rounded-md border"
						style={{ backgroundColor: color }}
					/>
				)}
			</div>
		</div>
	);
}
