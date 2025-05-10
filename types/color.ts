export interface RgbColor {
	r: number;
	g: number;
	b: number;
}

export interface RgbaColor extends RgbColor {
	a: number;
}

export interface HslColor {
	h: number;
	s: number;
	l: number;
}

export interface HslaColor extends HslColor {
	a: number;
}

export interface CmykColor {
	c: number;
	m: number;
	y: number;
	k: number;
}

export interface HsvColor {
	h: number;
	s: number;
	v: number;
}

export interface ColorFormats {
	hex: string;
	rgb: string;
	rgba: string;
	hsl: string;
	hsla: string;
	cmyk: string;
	hsv: string;
}
