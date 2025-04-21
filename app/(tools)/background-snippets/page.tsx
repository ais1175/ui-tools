import BackgroundSnippetsGenerator from "@/components/view/background-snippets";
import { siteConfig } from "@/lib/utils";
import type { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
	title: "BG Snippets Generator",
	description: "Generate background snippets for your website.",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: `${siteConfig.url}/background-snippets`,
		title: "BG Snippets Generator",
		description: "Generate background snippets for your website.",
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.bgSnippetsOgImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "BG Snippets Generator",
		description: "Generate background snippets for your website.",
		images: [siteConfig.bgSnippetsOgImage],
		creator: "@naymur_dev",
	},
};
function page() {
	return (
		<>
			<BackgroundSnippetsGenerator />
		</>
	);
}

export default page;
