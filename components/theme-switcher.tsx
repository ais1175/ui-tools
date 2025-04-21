"use client";

import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeSwitch({ className }: { className?: string }) {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		// Toggle between light and dark themes
		setTheme(theme === "light" ? "dark" : "light");
	};

	return (
		<button
			onClick={toggleTheme}
			className={cn(
				"inline-flex h-9 w-9 items-center justify-center",
				className,
			)}
			aria-label="Toggle theme"
			type="button"
		>
			{theme === "light" ? (
				<SunIcon className="h-5 w-5" />
			) : (
				<MoonIcon className="h-5 w-5" />
			)}
			<span className="sr-only">Toggle theme</span>
		</button>
	);
}
