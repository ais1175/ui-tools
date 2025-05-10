export const hexToRgb = (
	hex: string,
): { r: number; g: number; b: number } | null => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: Number.parseInt(result[1], 16),
				g: Number.parseInt(result[2], 16),
				b: Number.parseInt(result[3], 16),
			}
		: null;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
	return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

export const rgbToHsl = (
	r: number,
	g: number,
	b: number,
): { h: number; s: number; l: number } => {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
};

export const hslToRgb = (
	h: number,
	s: number,
	l: number,
): { r: number; g: number; b: number } => {
	h /= 360;
	s /= 100;
	l /= 100;
	let r;
	let g;
	let b;

	if (s === 0) {
		r = g = b = l;
	} else {
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1;
			if (t > 1) t -= 1;
			if (t < 1 / 6) return p + (q - p) * 6 * t;
			if (t < 1 / 2) return q;
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
			return p;
		};

		const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		const p = 2 * l - q;
		r = hue2rgb(p, q, h + 1 / 3);
		g = hue2rgb(p, q, h);
		b = hue2rgb(p, q, h - 1 / 3);
	}

	return {
		r: Math.round(r * 255),
		g: Math.round(g * 255),
		b: Math.round(b * 255),
	};
};

export const rgbToCmyk = (
	r: number,
	g: number,
	b: number,
): { c: number; m: number; y: number; k: number } => {
	r /= 255;
	g /= 255;
	b /= 255;

	const k = 1 - Math.max(r, g, b);
	const c = k === 1 ? 0 : (1 - r - k) / (1 - k);
	const m = k === 1 ? 0 : (1 - g - k) / (1 - k);
	const y = k === 1 ? 0 : (1 - b - k) / (1 - k);

	return {
		c: Math.round(c * 100),
		m: Math.round(m * 100),
		y: Math.round(y * 100),
		k: Math.round(k * 100),
	};
};

export const rgbToHsv = (
	r: number,
	g: number,
	b: number,
): { h: number; s: number; v: number } => {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	const v = max;
	const d = max - min;
	const s = max === 0 ? 0 : d / max;

	if (max !== min) {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		v: Math.round(v * 100),
	};
};

export const getContrastRatio = (
	rgb1: { r: number; g: number; b: number },
	rgb2: { r: number; g: number; b: number },
): number => {
	const getLuminance = (rgb: { r: number; g: number; b: number }) => {
		const a = [rgb.r, rgb.g, rgb.b].map((v) => {
			v /= 255;
			return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
		});
		return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
	};

	const luminance1 = getLuminance(rgb1);
	const luminance2 = getLuminance(rgb2);

	const brightest = Math.max(luminance1, luminance2);
	const darkest = Math.min(luminance1, luminance2);

	return (brightest + 0.05) / (darkest + 0.05);
};

export const getAccessibilityLevel = (ratio: number): string => {
	if (ratio >= 7) return "AAA";
	if (ratio >= 4.5) return "AA";
	if (ratio >= 3) return "AA Large";
	return "Fail";
};

export const generatePalette = (hex: string): string[] => {
	const rgb = hexToRgb(hex);
	if (!rgb) return [];

	const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
	const palette = [];

	// Generate lighter shades
	for (let i = 9; i >= 1; i--) {
		const lightness = Math.min(hsl.l + i * 5, 95);
		const rgbColor = hslToRgb(hsl.h, hsl.s, lightness);
		palette.push(rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b));
	}

	// Add the original color
	palette.push(hex);

	// Generate darker shades
	for (let i = 1; i <= 9; i++) {
		const lightness = Math.max(hsl.l - i * 5, 5);
		const rgbColor = hslToRgb(hsl.h, hsl.s, lightness);
		palette.push(rgbToHex(rgbColor.r, rgbColor.g, rgbColor.b));
	}

	return palette;
};

// Color name mapping (simplified)
export const colorNames: Record<string, string> = {
	"#FF0000": "Red",
	"#00FF00": "Green",
	"#0000FF": "Blue",
	"#FFFF00": "Yellow",
	"#FF00FF": "Magenta",
	"#00FFFF": "Cyan",
	"#000000": "Black",
	"#FFFFFF": "White",
	"#808080": "Gray",
	"#800000": "Maroon",
	"#808000": "Olive",
	"#008000": "Dark Green",
	"#800080": "Purple",
	"#008080": "Teal",
	"#000080": "Navy",
	"#FFA500": "Orange",
	"#A52A2A": "Brown",
	"#FFC0CB": "Pink",
};

export const findClosestColorName = (hex: string): string => {
	let closestColor = "";
	let minDistance = Number.MAX_VALUE;

	const rgb1 = hexToRgb(hex);
	if (!rgb1) return "Unknown";

	for (const [colorHex, colorName] of Object.entries(colorNames)) {
		const rgb2 = hexToRgb(colorHex);
		if (!rgb2) continue;

		const distance = Math.sqrt(
			(rgb1.r - rgb2.r) ** 2 + (rgb1.g - rgb2.g) ** 2 + (rgb1.b - rgb2.b) ** 2,
		);

		if (distance < minDistance) {
			minDistance = distance;
			closestColor = colorName;
		}
	}

	return closestColor;
};

// Format validation helpers
export const isValidHex = (value: string) =>
	/^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);
export const isValidRgb = (value: string) =>
	/^rgb$$\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$$$/.test(value);
export const isValidRgba = (value: string) =>
	/^rgba$$\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([01]|0?\.\d+)\s*$$$/.test(
		value,
	);
export const isValidHsl = (value: string) =>
	/^hsl$$\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*$$$/.test(value);
export const isValidHsla = (value: string) =>
	/^hsla$$\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([01]|0?\.\d+)\s*$$$/.test(
		value,
	);
export const isValidCmyk = (value: string) =>
	/^cmyk$$\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*$$$/.test(
		value,
	);
export const isValidHsv = (value: string) =>
	/^hsv$$\s*(\d{1,3})°\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*$$$/.test(value);

// Parse input values
export const parseRgb = (value: string) => {
	const match = value.match(
		/^rgb$$\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*$$$/,
	);
	if (match) {
		const r = Math.min(255, Math.max(0, Number.parseInt(match[1], 10)));
		const g = Math.min(255, Math.max(0, Number.parseInt(match[2], 10)));
		const b = Math.min(255, Math.max(0, Number.parseInt(match[3], 10)));
		return { r, g, b };
	}
	return null;
};

export const parseRgba = (value: string) => {
	const match = value.match(
		/^rgba$$\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([01]|0?\.\d+)\s*$$$/,
	);
	if (match) {
		const r = Math.min(255, Math.max(0, Number.parseInt(match[1], 10)));
		const g = Math.min(255, Math.max(0, Number.parseInt(match[2], 10)));
		const b = Math.min(255, Math.max(0, Number.parseInt(match[3], 10)));
		const a = Math.min(1, Math.max(0, Number.parseFloat(match[4])));
		return { r, g, b, a };
	}
	return null;
};

export const parseHsl = (value: string) => {
	const match = value.match(
		/^hsl$$\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*$$$/,
	);
	if (match) {
		const h = Math.min(360, Math.max(0, Number.parseInt(match[1], 10)));
		const s = Math.min(100, Math.max(0, Number.parseInt(match[2], 10)));
		const l = Math.min(100, Math.max(0, Number.parseInt(match[3], 10)));
		return { h, s, l };
	}
	return null;
};

export const parseHsla = (value: string) => {
	const match = value.match(
		/^hsla$$\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*([01]|0?\.\d+)\s*$$$/,
	);
	if (match) {
		const h = Math.min(360, Math.max(0, Number.parseInt(match[1], 10)));
		const s = Math.min(100, Math.max(0, Number.parseInt(match[2], 10)));
		const l = Math.min(100, Math.max(0, Number.parseInt(match[3], 10)));
		const a = Math.min(1, Math.max(0, Number.parseFloat(match[4])));
		return { h, s, l, a };
	}
	return null;
};

export const parseCmyk = (value: string) => {
	const match = value.match(
		/^cmyk$$\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*$$$/,
	);
	if (match) {
		const c = Math.min(100, Math.max(0, Number.parseInt(match[1], 10)));
		const m = Math.min(100, Math.max(0, Number.parseInt(match[2], 10)));
		const y = Math.min(100, Math.max(0, Number.parseInt(match[3], 10)));
		const k = Math.min(100, Math.max(0, Number.parseInt(match[4], 10)));
		return { c, m, y, k };
	}
	return null;
};

export const parseHsv = (value: string) => {
	const match = value.match(
		/^hsv$$\s*(\d{1,3})°\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*$$$/,
	);
	if (match) {
		const h = Math.min(360, Math.max(0, Number.parseInt(match[1], 10)));
		const s = Math.min(100, Math.max(0, Number.parseInt(match[2], 10)));
		const v = Math.min(100, Math.max(0, Number.parseInt(match[3], 10)));
		return { h, s, v };
	}
	return null;
};
