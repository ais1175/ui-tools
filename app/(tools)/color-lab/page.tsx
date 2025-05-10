import ClipPathGenerator from "@/components/view/clip-path";
import ColorConverter from "@/components/view/colors";
import { siteConfig } from "@/lib/utils";
import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
	title: "Color Lab – Play, Pick, Convert & Generate Beautiful Color Palettes",
	description:
		"Color Lab is your ultimate color toolkit. Generate stunning palettes, convert between HEX, RGB, HSL, and explore StatsCN Theme Generator – perfect for designers and developers.",
	keywords: [
		"Color palette generator",
		"Color converter HEX to RGB",
		"Color tools for developers",
		"Online color picker",
		"HEX to HSL converter",
		"Generate color schemes",
		"Design tools for UI",
		"Theme generator",
		"StatsCN theme generator",
		"Frontend UI tools",
		"Web design color tool",
		"HSL to HEX",
		"Color lab",
		"Web color utilities",
		"Tailwind color generator",
		"CSS color tools",
		"UI color editor",
		"Free design tools",
		"Color labs online",
		"Ultimate color toolkit",
	],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: `${siteConfig.url}/color-lab`,
		title: "Color Lab – Play, Pick, Convert & Generate Colors",
		description:
			"Generate palettes, convert HEX, RGB, HSL, and create custom themes. Color Lab is your all-in-one color tool for designers and developers.",
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.colorOgImage, // consider using a new OG image for Color Lab
				width: 1200,
				height: 630,
				alt: `Color Lab by ${siteConfig.name}`,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Color Labs – The Ultimate Color Toolkit 🎨🌈",
		description:
			"Pick, convert, and generate perfect colors for your UI. Try the free Color Lab with StatsCN Theme Generator.",
		images: [siteConfig.colorOgImage],
		creator: "@naymur_dev",
	},
};

function page() {
	return (
		<>
			<ColorConverter />
		</>
	);
}

export default page;
