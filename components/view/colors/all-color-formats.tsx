"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ColorFormats } from "@/types/color";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";

interface AllColorFormatsProps {
	colorFormats: ColorFormats;
	formatHandlers: Record<
		string,
		(e: React.ChangeEvent<HTMLInputElement>) => void
	>;
}

export function AllColorFormats({
	colorFormats,
	formatHandlers,
}: AllColorFormatsProps) {
	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success(`${text} copied to clipboard`, {
			duration: 2000,
		});
	};

	return (
		<div className="rounded-lg bg-card-bg p-4 shadow-[0px_1px_0px_0px_rgba(17,17,26,0.1)] dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)]">
			<h3 className="mb-4 font-medium text-lg">All Color Formats</h3>
			<div className="grid grid-cols-2 gap-3">
				{Object.entries(colorFormats).map(([format, value]) => (
					<div key={format} className="flex items-center gap-2">
						<div className="w-9 font-medium text-xs uppercase">{format}:</div>
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
								className="absolute top-1.5 right-1.5 h-7 w-7 bg-card-bg"
								onClick={() => copyToClipboard(value)}
							>
								<Copy size={"3"} />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
