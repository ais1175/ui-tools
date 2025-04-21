"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Pencil, Trash2 } from "lucide-react";
import type { ClipPathShape } from "./data";

interface ShapeGridProps {
	shapes: ClipPathShape[];
	selectedShapeId: string;
	onSelectShape: (id: string) => void;
	onEditShape?: (id: string) => void;
	onDeleteShape?: (id: string) => void;
	disabled?: boolean;
	compact?: boolean;
	className?: string;
}

export function ShapeGrid({
	shapes,
	selectedShapeId,
	onSelectShape,
	onEditShape,
	onDeleteShape,
	disabled = false,
	compact = false,
	className,
}: ShapeGridProps) {
	if (shapes.length === 0) {
		return <p>No shapes found</p>;
	}

	return (
		<div
			className={cn(
				"grid grid-cols-3 gap-3 rounded-md bg-card-bg p-4 xl:grid-cols-4",
				className,
			)}
		>
			{shapes.map((shape) => (
				<div key={shape.id} className="group relative h-fit">
					<Button
						variant={
							selectedShapeId === shape.id
								? "default"
								: compact
									? "outline"
									: "secondary"
						}
						className="relative h-16 w-full overflow-hidden border-0 py-2"
						onClick={() => onSelectShape(shape.id)}
						disabled={disabled}
					>
						<div className="grid w-full scale-150 place-items-center rounded-sm py-4">
							<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">
								<path
									d={shape.path}
									fill="currentColor"
									transform={"scale(100)"}
								/>
							</svg>
						</div>
					</Button>

					{(onEditShape || onDeleteShape) && (
						<div className="absolute top-1 right-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
							{onEditShape && (
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6 bg-background/80 backdrop-blur-sm"
									onClick={(e) => {
										e.stopPropagation();
										onEditShape(shape.id);
									}}
									disabled={disabled}
								>
									<Pencil className="h-3 w-3" />
								</Button>
							)}

							{onDeleteShape && (
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6 bg-background/80 text-destructive backdrop-blur-sm"
									onClick={(e) => {
										e.stopPropagation();
										onDeleteShape(shape.id);
									}}
									disabled={disabled}
								>
									<Trash2 className="h-3 w-3" />
								</Button>
							)}
						</div>
					)}
				</div>
			))}
		</div>
	);
}
