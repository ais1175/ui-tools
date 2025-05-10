"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { ImageIcon, Pipette, Upload, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

interface ImageColorPickerProps {
	setHexValue: (hex: string) => void;
	hexValue: string;
}

export function ImageColorPicker({
	setHexValue,
	hexValue,
}: ImageColorPickerProps) {
	const [image, setImage] = useState<string | null>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [isEyedropperActive, setIsEyedropperActive] = useState(false);
	const [pickedColor, setPickedColor] = useState<string | null>(null);
	const [hoverColor, setHoverColor] = useState<string | null>(null);
	const [cursorPosition, setCursorPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const _canvasRef = useRef<HTMLCanvasElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const dropZoneRef = useRef<HTMLDivElement>(null);
	const imageContainerRef = useRef<HTMLDivElement>(null);
	const pixelCanvasRef = useRef<HTMLCanvasElement>(null);

	// Reset eyedropper when image changes
	useEffect(() => {
		setIsEyedropperActive(false);
		setHoverColor(null);
		setCursorPosition(null);
	}, [image]);

	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setImage(event.target?.result as string);
				setPickedColor(null);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);

		const file = e.dataTransfer.files?.[0];
		if (file?.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setImage(event.target?.result as string);
				setPickedColor(null);
			};
			reader.readAsDataURL(file);
		}
	};

	const handlePaste = (e: React.ClipboardEvent) => {
		const items = e.clipboardData.items;
		for (let i = 0; i < items.length; i++) {
			if (items[i].type.indexOf("image") !== -1) {
				const blob = items[i].getAsFile();
				if (blob) {
					const reader = new FileReader();
					reader.onload = (event) => {
						setImage(event.target?.result as string);
						setPickedColor(null);
					};
					reader.readAsDataURL(blob);
				}
			}
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setPickedColor(null);
		setIsEyedropperActive(false);
		setHoverColor(null);
		setCursorPosition(null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	// Custom eyedropper cursor styles
	const eyedropperCursorStyle = isEyedropperActive ? "cursor-none" : "";

	return (
		<div className="mb-6 rounded-xl bg-card-bg p-4 shadow-[0px_1px_0px_0px_rgba(17,17,26,0.1)] dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)]">
			{/* Header with color preview */}
			<div className="mb-4 flex flex-col gap-3">
				<div className="flex items-center justify-between">
					<h3 className="font-medium text-lg">Image Color Picker</h3>
				</div>

				{/* Full-width color preview bar */}
				{(hoverColor || pickedColor) && (
					<div className="flex h-12 w-full items-center overflow-hidden rounded-md border">
						<div
							className="h-full flex-grow"
							style={{
								backgroundColor: isEyedropperActive
									? hoverColor || "#000000"
									: pickedColor || "#000000",
							}}
						/>
						<div className="flex h-full items-center justify-center border-l bg-white px-3 py-2">
							<span className="font-mono text-sm">
								{isEyedropperActive ? hoverColor : pickedColor}
							</span>
						</div>
					</div>
				)}
			</div>

			<div
				ref={dropZoneRef}
				className={`relative rounded-lg border-2 border-dashed bg-main p-4 transition-colors ${
					isDragging
						? "border-primary bg-primary/5"
						: "border-muted-foreground/20"
				}`}
				onDragOver={handleDragOver}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
				onPaste={handlePaste}
			>
				{image ? (
					<div className="relative">
						<div
							ref={imageContainerRef}
							className={`relative ${eyedropperCursorStyle}`}
						>
							<img
								ref={imageRef}
								src={image || "/placeholder.svg"}
								alt="Uploaded"
								className="h-72 w-full max-w-full rounded-md object-contain"
							/>

							{/* Custom eyedropper cursor with color preview */}
							{isEyedropperActive && cursorPosition && (
								<div
									className="pointer-events-none fixed z-50"
									style={{
										left: `${cursorPosition.x}px`,
										top: `${cursorPosition.y}px`,
										transform: "translate(-50%, -50%)",
									}}
								>
									{/* Integrated magnifier with color preview */}
									<div className="relative">
										<div className="flex h-20 w-20 flex-col items-center justify-center overflow-hidden rounded-full border-2 border-white shadow-lg">
											{/* Canvas for pixel-perfect magnification */}
											<canvas
												ref={pixelCanvasRef}
												width="20"
												height="20"
												className="absolute inset-0 h-full w-full"
											/>

											{/* Center target */}
											<div className="absolute z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
												<div
													className="h-4 w-4 rounded-full"
													style={{
														backgroundColor: hoverColor || "transparent",
													}}
												/>
											</div>

											{/* Color hex value inside the magnifier */}
											<div className="absolute right-0 bottom-1 left-0 z-10 text-center">
												<div className="inline-block rounded-sm bg-black/70 px-1 py-0.5 font-mono text-white text-xs">
													{hoverColor || ""}
												</div>
											</div>
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Image controls */}
						<div className="absolute top-2 right-2">
							<Button
								variant="outline"
								size="icon"
								className="bg-white/80 hover:bg-white"
								onClick={handleRemoveImage}
							>
								<X className="h-4 w-4" />
							</Button>
						</div>
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-8 text-center">
						<ImageIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
						<h4 className="mb-2 font-medium text-lg">
							Drop image here or click to upload
						</h4>
						<p className="mb-4 text-muted-foreground text-sm">
							You can also paste an image from clipboard (Ctrl+V)
						</p>
						<Button
							variant="outline"
							onClick={() => fileInputRef.current?.click()}
						>
							<Upload className="mr-2 h-4 w-4" />
							Select Image
						</Button>
						<input
							ref={fileInputRef}
							type="file"
							accept="image/*"
							className="hidden"
							onChange={handleImageUpload}
						/>
					</div>
				)}
			</div>
		</div>
	);
}
