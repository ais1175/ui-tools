import { hexToRgb, rgbToHsl } from "./color-utils";

// Generate shadcn theme colors based on a base color
export function generateShadcnTheme(baseColor: string) {
	const rgb = hexToRgb(baseColor);
	if (!rgb) return null;

	const { h, s, l } = rgbToHsl(rgb.r, rgb.g, rgb.b);

	// Generate light theme colors
	const lightTheme = {
		background: "0 0% 100%",
		foreground: `${h} ${Math.max(5, s)}% ${Math.max(5, Math.min(15, l))}%`,
		card: "0 0% 100%",
		"card-foreground": `${h} ${Math.max(5, s)}% ${Math.max(5, Math.min(15, l))}%`,
		popover: "0 0% 100%",
		"popover-foreground": `${h} ${Math.max(5, s)}% ${Math.max(5, Math.min(15, l))}%`,
		primary: `${h} ${Math.min(90, Math.max(50, s))}% ${Math.min(50, Math.max(40, l))}%`,
		"primary-foreground": "0 0% 98%",
		secondary: `${h} ${Math.min(30, Math.max(5, s))}% ${Math.min(96, Math.max(90, 100 - l))}%`,
		"secondary-foreground": `${h} ${Math.min(90, Math.max(50, s))}% ${Math.min(50, Math.max(40, l))}%`,
		muted: `${h} ${Math.min(10, Math.max(0, s))}% ${Math.min(96, Math.max(90, 100 - l))}%`,
		"muted-foreground": `${h} ${Math.min(30, Math.max(10, s))}% ${Math.min(40, Math.max(30, l))}%`,
		accent: `${h} ${Math.min(30, Math.max(5, s))}% ${Math.min(96, Math.max(90, 100 - l))}%`,
		"accent-foreground": `${h} ${Math.min(90, Math.max(50, s))}% ${Math.min(50, Math.max(40, l))}%`,
		destructive: "0 84% 60%",
		"destructive-foreground": "0 0% 98%",
		border: `${h} ${Math.min(20, Math.max(5, s))}% 90%`,
		input: `${h} ${Math.min(20, Math.max(5, s))}% 90%`,
		ring: `${h} ${Math.min(90, Math.max(50, s))}% ${Math.min(50, Math.max(40, l))}%`,
		radius: "0.5rem",
	};

	// Generate dark theme colors
	const darkTheme = {
		background: `${h} ${Math.min(10, Math.max(5, s))}% ${Math.min(10, Math.max(5, l))}%`,
		foreground: "0 0% 98%",
		card: `${h} ${Math.min(10, Math.max(5, s))}% ${Math.min(10, Math.max(5, l))}%`,
		"card-foreground": "0 0% 98%",
		popover: `${h} ${Math.min(10, Math.max(5, s))}% ${Math.min(10, Math.max(5, l))}%`,
		"popover-foreground": "0 0% 98%",
		primary: `${h} ${Math.min(90, Math.max(50, s))}% ${Math.min(60, Math.max(50, l))}%`,
		"primary-foreground": "0 0% 98%",
		secondary: `${h} ${Math.min(30, Math.max(15, s))}% ${Math.min(25, Math.max(15, l))}%`,
		"secondary-foreground": "0 0% 98%",
		muted: `${h} ${Math.min(30, Math.max(15, s))}% ${Math.min(25, Math.max(15, l))}%`,
		"muted-foreground": `${h} ${Math.min(20, Math.max(10, s))}% ${Math.min(70, Math.max(60, 100 - l))}%`,
		accent: `${h} ${Math.min(30, Math.max(15, s))}% ${Math.min(25, Math.max(15, l))}%`,
		"accent-foreground": "0 0% 98%",
		destructive: "0 62% 30%",
		"destructive-foreground": "0 0% 98%",
		border: `${h} ${Math.min(20, Math.max(10, s))}% ${Math.min(25, Math.max(15, l))}%`,
		input: `${h} ${Math.min(20, Math.max(10, s))}% ${Math.min(25, Math.max(15, l))}%`,
		ring: `${h} ${Math.min(90, Math.max(50, s))}% ${Math.min(60, Math.max(50, l))}%`,
	};

	return { lightTheme, darkTheme };
}

// Format theme for CSS variables
export function formatThemeForCSS(theme: Record<string, string>) {
	return Object.entries(theme)
		.map(([key, value]) => `  --${key}: ${value};`)
		.join("\n");
}

// Generate the full CSS for the theme
export function generateThemeCSS(
	lightTheme: Record<string, string>,
	darkTheme: Record<string, string>,
) {
	return `:root {
${formatThemeForCSS(lightTheme)}
}

.dark {
${formatThemeForCSS(darkTheme)}
}
`;
}

// Generate the full CSS for the theme with Tailwind v4 syntax
export function generateThemeCSSv4(
	lightTheme: Record<string, string>,
	darkTheme: Record<string, string>,
) {
	return `
// global.css

@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
${formatThemeForCSS(lightTheme)}
}

.dark {
${formatThemeForCSS(darkTheme)}
}

@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --radius: var(--radius);
}
`;
}

// Generate the Tailwind config for the theme
export function generateTailwindConfig(_baseColor: string) {
	return `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;
}
