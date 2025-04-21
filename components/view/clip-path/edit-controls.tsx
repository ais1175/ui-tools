"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface EditControlsProps {
	historyIndex: number;
	onSave: () => void;
	onCancel: () => void;
}

export function EditControls({
	historyIndex,
	onSave,
	onCancel,
}: EditControlsProps) {
	return (
		<div className="mt-4 space-y-4 p-2">
			<h3 className="font-medium text-lg">Edit Mode</h3>
			<p className="text-muted-foreground text-sm">
				Drag the control points to edit the shape. Blue points are anchor
				points, and red points are bezier curve control points.
			</p>
			<div className="space-y-2">
				<Label>Editing Tips</Label>
				<ul className="list-disc space-y-1 pl-4 text-muted-foreground text-xs">
					<li>Drag blue points to move anchor points</li>
					<li>Drag red points to adjust curve handles</li>
					<li>Zoom in for precise edits, zoom out for overview</li>
					<li>Click "Save Edits" when you're done</li>
				</ul>
			</div>

			<div className="mt-2 text-muted-foreground text-xs">
				{historyIndex > 0 ? (
					<p>
						Press Ctrl+Z to undo changes ({historyIndex}{" "}
						{historyIndex === 1 ? "change" : "changes"} made)
					</p>
				) : (
					<p>Original shape (no changes to undo)</p>
				)}
			</div>

			<Button variant="default" className="w-full" onClick={onSave}>
				Save Edits
			</Button>

			<Button variant="outline" className="w-full" onClick={onCancel}>
				Cancel
			</Button>
		</div>
	);
}
