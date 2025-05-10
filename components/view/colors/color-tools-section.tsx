"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ColorBlindnessSimulator } from "./color-blindness-simulator";
import { ColorContrastChecker } from "./color-contrast-checker";
import { ColorGradientGenerator } from "./color-gradient-generator";
import { ColorHarmonyGenerator } from "./color-harmony-generator";

interface ColorToolsSectionProps {
	hexValue: string;
	setHexValue: (hex: string) => void;
}

export function ColorToolsSection({
	hexValue,
	setHexValue,
}: ColorToolsSectionProps) {
	const [activeTab, setActiveTab] = useState<
		"contrast" | "harmony" | "blindness" | "gradient"
	>("contrast");

	return (
		<div className="space-y-4">
			<h3 className="font-medium text-lg">Color Tools</h3>

			<Tabs
				value={activeTab}
				onValueChange={(value) => setActiveTab(value as typeof activeTab)}
			>
				<TabsList className="grid grid-cols-2 md:grid-cols-4">
					<TabsTrigger value="contrast">Contrast</TabsTrigger>
					<TabsTrigger value="harmony">Harmony</TabsTrigger>
					<TabsTrigger value="blindness">Color Blindness</TabsTrigger>
					<TabsTrigger value="gradient">Gradient</TabsTrigger>
				</TabsList>

				<TabsContent value="contrast" className="mt-4">
					<ColorContrastChecker
						initialForeground={hexValue}
						initialBackground="#FFFFFF"
					/>
				</TabsContent>

				<TabsContent value="harmony" className="mt-4">
					<ColorHarmonyGenerator
						hexValue={hexValue}
						setHexValue={setHexValue}
					/>
				</TabsContent>

				<TabsContent value="blindness" className="mt-4">
					<ColorBlindnessSimulator hexValue={hexValue} />
				</TabsContent>

				<TabsContent value="gradient" className="mt-4">
					<ColorGradientGenerator
						initialStartColor={hexValue}
						initialEndColor="#FFFFFF"
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
