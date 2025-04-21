"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ImageIcon } from "lucide-react";
import { useRef } from "react";

interface ImageSelectorProps {
	selectedImage: string;
	setSelectedImage: (url: string) => void;
	sampleImages: string[];
	uploadedImages: string[];
	onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
	disabled?: boolean;
}

export function ImageSelector({
	selectedImage,
	setSelectedImage,
	sampleImages,
	uploadedImages,
	onImageUpload,
	disabled = false,
}: ImageSelectorProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	// Combine sample and uploaded images for the select
	const _allImages = [...sampleImages, ...uploadedImages];

	return (
		<div className="flex items-center justify-between gap-2">
			<Select
				value={selectedImage}
				onValueChange={setSelectedImage}
				disabled={disabled}
			>
				<SelectTrigger id="image-select" className="w-full bg-main">
					<SelectValue placeholder="Select an image" />
				</SelectTrigger>
				<SelectContent>
					{sampleImages.map((img, index) => (
						<SelectItem key={`sample-${img}`} value={img}>
							Sample Image {index + 1}
						</SelectItem>
					))}
					{uploadedImages.map((img, index) => (
						<SelectItem key={`uploaded-${img}`} value={img}>
							Uploaded Image {index + 1}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			<div className="flex items-center gap-2">
				<Button
					variant="solid"
					size="sm"
					className="border-0"
					onClick={() => fileInputRef.current?.click()}
					disabled={disabled}
				>
					<ImageIcon className="mr-2 h-4 w-4" />
					Upload Image
				</Button>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					multiple
					className="hidden"
					onChange={onImageUpload}
				/>
			</div>
		</div>
	);
}
