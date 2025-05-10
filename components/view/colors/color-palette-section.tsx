"use client";

import { Button } from "@/components/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorPaletteSectionProps {
	showPalette: boolean;
	setShowPalette: (show: boolean) => void;
	palette: string[];
	setHexValue: (hex: string) => void;
}

export function ColorPaletteSection({
	showPalette,
	setShowPalette,
	palette,
	setHexValue,
}: ColorPaletteSectionProps) {
	return (
		<div className="mb-6 space-y-2">
			<div className="flex items-center justify-between">
				<h3 className="font-medium text-lg">Color Palette</h3>
				{/* <Button variant="outline" size="sm" onClick={() => setShowPalette(!showPalette)}>
          {showPalette ? "Hide" : "Show"}
        </Button> */}
			</div>
			{showPalette && (
				<div className="grid grid-cols-5 gap-1 overflow-hidden rounded-md md:grid-cols-10">
					{palette.map((color, index) => (
						<TooltipProvider key={index}>
							<Tooltip>
								<TooltipTrigger asChild>
									{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
									<button
										className="h-12 w-full transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
										style={{ backgroundColor: color }}
										onClick={() => setHexValue(color)}
									/>
								</TooltipTrigger>
								<TooltipContent>
									<p>{color}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					))}
				</div>
			)}
		</div>
	);
}
