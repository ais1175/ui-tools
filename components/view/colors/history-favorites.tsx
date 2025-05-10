"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useColorStore } from "@/store/colors-store";
import { Bookmark, History } from "lucide-react";

interface HistoryFavoritesProps {
	history: string[];
	setHexValue: (hex: string) => void;
}

export function HistoryFavorites({
	history,
	setHexValue,
}: HistoryFavoritesProps) {
	const { favorites } = useColorStore();

	return (
		<div className=" grid grid-cols-1 gap-6 rounded-xl bg-card-bg p-4 shadow-[0px_1px_0px_0px_rgba(17,17,26,0.1)] md:grid-cols-2 dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)]">
			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<h3 className="font-medium text-lg">History</h3>
					<History className="h-4 w-4" />
				</div>
				<ScrollArea>
					<div className="flex gap-1">
						{history.map((color, index) => (
							<TooltipProvider key={index}>
								<Tooltip>
									<TooltipTrigger asChild>
										{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
											className="h-8 w-8 rounded-md border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
				</ScrollArea>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<h3 className="font-medium text-lg">Favorites</h3>
					<Bookmark className="h-4 w-4" />
				</div>
				<ScrollArea>
					<div className="flex gap-1">
						{favorites.length > 0 ? (
							favorites.map((color, index) => (
								<TooltipProvider key={index}>
									<Tooltip>
										<TooltipTrigger asChild>
											{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
												className="h-8 w-8 rounded-md border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
												style={{ backgroundColor: color }}
												onClick={() => setHexValue(color)}
											/>
										</TooltipTrigger>
										<TooltipContent>
											<p>{color}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							))
						) : (
							<div className="p-2 text-muted-foreground text-sm">
								No favorites yet. Click the bookmark icon to add colors.
							</div>
						)}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}
