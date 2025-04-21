"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface CustomShapeFormProps {
	customName: string;
	setCustomName: (name: string) => void;
	customPath: string;
	setCustomPath: (path: string) => void;
	onAddCustomShape: () => void;
	disabled?: boolean;
}

export function CustomShapeForm({
	customName,
	setCustomName,
	customPath,
	setCustomPath,
	onAddCustomShape,
	disabled = false,
}: CustomShapeFormProps) {
	return (
		<div className="space-y-4">
			<div className="space-y-3">
				<Label htmlFor="custom-name">Custom Shape Name</Label>
				<Input
					id="custom-name"
					value={customName}
					onChange={(e) => setCustomName(e.target.value)}
					placeholder="Enter a name for your custom shape"
					className="mt-1 w-full rounded-md border px-3 py-2"
					disabled={disabled}
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="custom-path">Custom SVG Path</Label>
				<Textarea
					id="custom-path"
					value={customPath}
					onChange={(e) => setCustomPath(e.target.value)}
					placeholder="Enter a custom SVG path (d attribute)"
					className="min-h-[150px] font-mono text-sm"
					disabled={disabled}
				/>
				<p className="text-muted-foreground text-xs">
					Enter a valid SVG path data (d attribute). The path should be
					normalized to a 0-1 coordinate space.
				</p>
			</div>

			<div className="flex gap-2">
				<Button
					variant="default"
					className="flex-1"
					onClick={onAddCustomShape}
					disabled={!customPath || disabled}
				>
					Add Custom Shape
				</Button>
			</div>
		</div>
	);
}
