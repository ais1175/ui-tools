"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { ClipPathShape } from "./data";
interface CodeOutputProps {
	selectedShape: ClipPathShape;
	currentEditPath?: string;
	editMode: boolean;
	showOnlyCopyButton?: boolean;
	className?: string;
}

export function CodeOutput({
	showOnlyCopyButton = false,
	selectedShape,
	currentEditPath,
	editMode,
	className,
}: CodeOutputProps) {
	const [copied, setCopied] = useState(false);

	// Generate SVG clip path
	const generateSvgClipPath = () => {
		const _id = selectedShape.id;
		const pathData =
			editMode && currentEditPath ? currentEditPath : selectedShape.path;

		return `<svg width="1" height="1" viewBox="0 0 1 1" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="${pathData}"
    fill="black"
  />
</svg>`;
	};

	// Generate CSS code
	const generateCssCode = () => {
		const id = selectedShape.id;
		return `style={{ clipPath: 'url(#${id})' }}`;
	};

	// Generate full component code
	const generateFullCode = () => {
		const id = selectedShape.id;
		const pathData =
			editMode && currentEditPath ? currentEditPath : selectedShape.path;
		const className = selectedShape.className || "";

		return `import React from 'react';

function ClipPathImage() {
  return (
    <>
      {/* Hidden SVG with clip path definition */}
      <svg className="absolute -top-[999px] -left-[999px] w-0 h-0">
        <defs>
          <clipPath id="${id}" clipPathUnits="objectBoundingBox">
            <path
              d="${pathData}"
              fill="black"
            />
          </clipPath>
        </defs>
      </svg>
      
      {/* Image with clip path applied */}
      <figure ${generateCssCode()} className="${className}">
        <img
          src="your-image-url.jpg"
          alt="Description"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </figure>
    </>
  );
}

export default ClipPathImage;`;
	};

	// Copy code to clipboard
	const copyToClipboard = (code: string) => {
		navigator.clipboard.writeText(code);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<>
			{showOnlyCopyButton ? (
				<>
					<Button
						variant="base"
						size="icon"
						className="absolute top-2 right-4 p-0"
						onClick={() => copyToClipboard(generateFullCode())}
					>
						{copied ? (
							<Check className="h-4 w-4" />
						) : (
							<Copy className="h-4 w-4" />
						)}
					</Button>
				</>
			) : (
				<>
					<Tabs defaultValue="component" className={cn("", className)}>
						<TabsList className="flex h-12 w-full gap-1 rounded-md border bg-card p-1.5 dark:inset-shadow-[0_1px_rgb(255_255_255/0.15)]">
							<TabsTrigger
								value="component"
								className="relative h-full w-full cursor-pointer rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<span className="relative z-[2] uppercase">Component</span>
							</TabsTrigger>
							<TabsTrigger
								value="svg"
								className="relative h-full w-full cursor-pointer rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
							>
								<span className="relative z-[2] uppercase">SVG</span>
							</TabsTrigger>
						</TabsList>
						<TabsContent value="component" className="space-y-2 p-0">
							<div className="relative">
								<Textarea
									readOnly
									value={generateFullCode()}
									className="min-h-[400px] w-full rounded-lg bg-main p-3 font-mono text-sm outline-none ring-0 focus-visible:ring-0"
								/>
								<Button
									variant="base"
									size="icon"
									className="absolute top-2 right-4 p-0"
									onClick={() => copyToClipboard(generateFullCode())}
								>
									{copied ? (
										<Check className="h-4 w-4" />
									) : (
										<Copy className="h-4 w-4" />
									)}
								</Button>
							</div>
						</TabsContent>
						<TabsContent value="svg" className="space-y-2 p-0">
							<div className="relative">
								<Textarea
									readOnly
									value={generateSvgClipPath()}
									className="min-h-[400px] w-full rounded-lg bg-main p-3 font-mono text-sm outline-none ring-0 focus-visible:ring-0"
								/>
								<Button
									variant="base"
									size="icon"
									className="absolute top-2 right-4"
									onClick={() => copyToClipboard(generateSvgClipPath())}
								>
									{copied ? (
										<Check className="h-4 w-4" />
									) : (
										<Copy className="h-4 w-4" />
									)}
								</Button>
							</div>
							<p className="text-muted-foreground text-xs">
								Add this SVG to your HTML/JSX, typically at the top of your
								component.
							</p>
						</TabsContent>
					</Tabs>
				</>
			)}
		</>
	);
}
