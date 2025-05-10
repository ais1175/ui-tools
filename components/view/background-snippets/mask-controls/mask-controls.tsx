"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CustomSlider } from "@/components/ui/range-slider";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface MaskControlsProps {
	useMask: boolean;
	setUseMask: (use: boolean) => void;
	customMaskPosition: boolean;
	setCustomMaskPosition: (custom: boolean) => void;
	maskType: string;
	setMaskType: (type: string) => void;
	maskPositionX: number;
	setMaskPositionX: (position: number) => void;
	maskPositionY: number;
	setMaskPositionY: (position: number) => void;
	maskWidth: number;
	setMaskWidth: (width: number) => void;
	maskHeight: number;
	setMaskHeight: (height: number) => void;
	maskOpacity: number;
	setMaskOpacity: (opacity: number) => void;
	maskFade: number;
	setMaskFade: (fade: number) => void;
}

export function MaskControls({
	useMask,
	setUseMask,
	customMaskPosition,
	setCustomMaskPosition,
	maskType,
	setMaskType,
	maskPositionX,
	setMaskPositionX,
	maskPositionY,
	setMaskPositionY,
	maskWidth,
	setMaskWidth,
	maskHeight,
	setMaskHeight,
	maskOpacity,
	setMaskOpacity,
	maskFade,
	setMaskFade,
}: MaskControlsProps) {
	return (
		<div
			className={`relative mt-4 space-y-2 rounded-lg ${!useMask && "h-32 overflow-hidden"}`}
		>
			{!useMask && (
				<div className="-bottom-5 absolute left-0 h-[6.5rem] w-full bg-linear-to-t/srgb from-background dark:from-black" />
			)}
			<div className="mb-4 flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<Switch id="useMask" checked={useMask} onCheckedChange={setUseMask} />
					<Label htmlFor="useMask">Use Mask</Label>
				</div>
			</div>

			<div className="mb-4 flex items-center space-x-2">
				<Switch
					id="customMaskPosition"
					checked={customMaskPosition}
					onCheckedChange={setCustomMaskPosition}
				/>
				<Label htmlFor="customMaskPosition">Use Custom Position</Label>
			</div>

			{!customMaskPosition && (
				<div className="space-y-2">
					<Label htmlFor="maskType">Mask Position</Label>
					<Select value={maskType} onValueChange={setMaskType}>
						<SelectTrigger id="maskType">
							<SelectValue placeholder="Select mask position" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="top">Top</SelectItem>
							<SelectItem value="bottom">Bottom</SelectItem>
							<SelectItem value="left">Left</SelectItem>
							<SelectItem value="right">Right</SelectItem>
							<SelectItem value="topLeft">Top Left</SelectItem>
							<SelectItem value="topRight">Top Right</SelectItem>
							<SelectItem value="bottomLeft">Bottom Left</SelectItem>
							<SelectItem value="bottomRight">Bottom Right</SelectItem>
							<SelectItem value="center">Center</SelectItem>
							<SelectItem value="circle">Circle</SelectItem>
						</SelectContent>
					</Select>
				</div>
			)}

			{customMaskPosition && (
				<div className="space-y-2 rounded-lg border p-2">
					<div className="space-y-2">
						<Label>Position X: {maskPositionX}%</Label>
						<CustomSlider
							value={[maskPositionX]}
							min={0}
							max={100}
							step={1}
							onValueChange={(value) => setMaskPositionX(value[0])}
						/>
					</div>
					<div className="space-y-2">
						<Label>Position Y: {maskPositionY}%</Label>
						<CustomSlider
							value={[maskPositionY]}
							min={0}
							max={100}
							step={1}
							onValueChange={(value) => setMaskPositionY(value[0])}
						/>
					</div>
				</div>
			)}

			<div className="space-y-2">
				<Label>Mask Width: {maskWidth}%</Label>
				<CustomSlider
					value={[maskWidth]}
					min={10}
					max={150}
					step={5}
					onValueChange={(value) => setMaskWidth(value[0])}
				/>
			</div>
			<div className="space-y-2">
				<Label>Mask Height: {maskHeight}%</Label>
				<CustomSlider
					value={[maskHeight]}
					min={10}
					max={150}
					step={5}
					onValueChange={(value) => setMaskHeight(value[0])}
				/>
			</div>

			<div className="space-y-2">
				<Label>Mask Opacity: {maskOpacity}%</Label>
				<CustomSlider
					value={[maskOpacity]}
					min={0}
					max={100}
					step={5}
					onValueChange={(value) => setMaskOpacity(value[0])}
				/>
			</div>

			<div className="space-y-2">
				<Label>Mask Fade: {maskFade}%</Label>
				<CustomSlider
					value={[maskFade]}
					min={maskOpacity + 5}
					max={200}
					step={5}
					onValueChange={(value) => setMaskFade(value[0])}
				/>
			</div>
		</div>
	);
}
