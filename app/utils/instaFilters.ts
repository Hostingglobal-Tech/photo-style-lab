/**
 * Instagram-style photo filters
 * TypeScript implementation inspired by filterous-2
 * These filters combine basic operations to create popular photo effects
 */

import * as filters from './filters';

export type FilterFunction = (pixels: ImageData) => ImageData;

export interface FilterPreset {
  id: string;
  name: string;
  nameKo: string;
  description: string;
  category: 'google' | 'vintage' | 'bw' | 'warm' | 'cool' | 'vivid' | 'soft' | 'artistic';
  apply: FilterFunction;
}

// ============================================
// Normal - No filter
// ============================================
export const normal: FilterFunction = (pixels) => pixels;

// ============================================
// Vintage & Retro Filters
// ============================================

/** Clarendon: adds light to lighter areas and dark to darker areas */
export const clarendon: FilterFunction = (pixels) => {
  pixels = filters.brightness(pixels, 0.1);
  pixels = filters.contrast(pixels, 0.1);
  pixels = filters.saturation(pixels, 0.15);
  return pixels;
};

/** Gingham: Vintage-inspired, taking some color out */
export const gingham: FilterFunction = (pixels) => {
  pixels = filters.sepia(pixels, 0.04);
  pixels = filters.contrast(pixels, -0.15);
  return pixels;
};

/** Reyes: a new vintage filter, gives your photos a "dusty" look */
export const reyes: FilterFunction = (pixels) => {
  pixels = filters.sepia(pixels, 0.4);
  pixels = filters.brightness(pixels, 0.13);
  pixels = filters.contrast(pixels, -0.05);
  return pixels;
};

/** Stinson: washing out the colors ever so slightly */
export const stinson: FilterFunction = (pixels) => {
  pixels = filters.brightness(pixels, 0.1);
  pixels = filters.sepia(pixels, 0.3);
  return pixels;
};

/** Earlybird: Gives an older look with a sepia tint and warm temperature */
export const earlybird: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [255, 165, 40, 0.2]);
  return pixels;
};

/** Toaster: Ages the image by "burning" the centre and adds a dramatic vignette */
export const toaster: FilterFunction = (pixels) => {
  pixels = filters.sepia(pixels, 0.1);
  pixels = filters.colorFilter(pixels, [255, 145, 0, 0.2]);
  return pixels;
};

/** Walden: Increases exposure and adds a yellow tint */
export const walden: FilterFunction = (pixels) => {
  pixels = filters.brightness(pixels, 0.1);
  pixels = filters.colorFilter(pixels, [255, 255, 0, 0.2]);
  return pixels;
};

/** 1977: The increased exposure with a red tint gives the photograph a rosy, brighter, faded look */
export const f1977: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [255, 25, 0, 0.15]);
  pixels = filters.brightness(pixels, 0.1);
  return pixels;
};

/** Brooklyn: Cool tint with sepia */
export const brooklyn: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [25, 240, 252, 0.05]);
  pixels = filters.sepia(pixels, 0.3);
  return pixels;
};

// ============================================
// Black & White Filters
// ============================================

/** Moon: B/W, increase brightness and decrease contrast */
export const moon: FilterFunction = (pixels) => {
  pixels = filters.grayscale(pixels);
  pixels = filters.contrast(pixels, -0.04);
  pixels = filters.brightness(pixels, 0.1);
  return pixels;
};

/** Willow: A monochromatic filter with subtle purple tones */
export const willow: FilterFunction = (pixels) => {
  pixels = filters.grayscale(pixels);
  pixels = filters.colorFilter(pixels, [100, 28, 210, 0.03]);
  pixels = filters.brightness(pixels, 0.1);
  return pixels;
};

/** Inkwell: Direct shift to black and white */
export const inkwell: FilterFunction = (pixels) => {
  pixels = filters.grayscale(pixels);
  return pixels;
};

// ============================================
// Warm Tone Filters
// ============================================

/** Lark: Brightens and intensifies colours but not red hues */
export const lark: FilterFunction = (pixels) => {
  pixels = filters.brightness(pixels, 0.08);
  pixels = filters.rgbAdjust(pixels, [1, 1.03, 1.05]);
  pixels = filters.saturation(pixels, 0.12);
  return pixels;
};

/** Juno: Brightens colors, and intensifies red and yellow hues */
export const juno: FilterFunction = (pixels) => {
  pixels = filters.rgbAdjust(pixels, [1.01, 1.04, 1]);
  pixels = filters.saturation(pixels, 0.3);
  return pixels;
};

/** Amaro: Adds light to an image, with the focus on the centre */
export const amaro: FilterFunction = (pixels) => {
  pixels = filters.saturation(pixels, 0.3);
  pixels = filters.brightness(pixels, 0.15);
  return pixels;
};

/** Mayfair: Applies a warm pink tone */
export const mayfair: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [230, 115, 108, 0.05]);
  pixels = filters.saturation(pixels, 0.15);
  return pixels;
};

/** Rise: Adds a "glow" to the image, with softer lighting */
export const rise: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [255, 170, 0, 0.1]);
  pixels = filters.brightness(pixels, 0.09);
  pixels = filters.saturation(pixels, 0.1);
  return pixels;
};

/** Valencia: Fades the image by increasing exposure and warming the colors */
export const valencia: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [255, 225, 80, 0.08]);
  pixels = filters.saturation(pixels, 0.1);
  pixels = filters.contrast(pixels, 0.05);
  return pixels;
};

/** Kelvin: Increases saturation and temperature to give it a radiant "glow" */
export const kelvin: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [255, 140, 0, 0.1]);
  pixels = filters.rgbAdjust(pixels, [1.15, 1.05, 1]);
  pixels = filters.saturation(pixels, 0.35);
  return pixels;
};

/** Nashville: Warms the temperature, lowers contrast and increases exposure */
export const nashville: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [220, 115, 188, 0.12]);
  pixels = filters.contrast(pixels, -0.05);
  return pixels;
};

/** Vesper: adds a yellow tint */
export const vesper: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [255, 225, 0, 0.05]);
  pixels = filters.brightness(pixels, 0.06);
  pixels = filters.contrast(pixels, 0.06);
  return pixels;
};

/** Ashby: gives images a great golden glow and a subtle vintage feel */
export const ashby: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [255, 160, 25, 0.1]);
  pixels = filters.brightness(pixels, 0.1);
  return pixels;
};

/** Charmes: a high contrast filter, warming up colors with a red tint */
export const charmes: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [255, 50, 80, 0.12]);
  pixels = filters.contrast(pixels, 0.05);
  return pixels;
};

/** Ginza: brightens and adds a warm glow */
export const ginza: FilterFunction = (pixels) => {
  pixels = filters.sepia(pixels, 0.06);
  pixels = filters.brightness(pixels, 0.1);
  return pixels;
};

// ============================================
// Cool Tone Filters
// ============================================

/** Hudson: Creates an "icy" illusion with heightened shadows, cool tint */
export const hudson: FilterFunction = (pixels) => {
  pixels = filters.rgbAdjust(pixels, [1, 1, 1.25]);
  pixels = filters.contrast(pixels, 0.1);
  pixels = filters.brightness(pixels, 0.15);
  return pixels;
};

/** Slumber: Desaturates the image as well as adds haze for a retro, dreamy look */
export const slumber: FilterFunction = (pixels) => {
  pixels = filters.brightness(pixels, 0.1);
  pixels = filters.saturation(pixels, -0.5);
  return pixels;
};

/** Aden: This filter gives a blue/pink natural look */
export const aden: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [228, 130, 225, 0.13]);
  pixels = filters.saturation(pixels, -0.2);
  return pixels;
};

/** Perpetua: Adding a pastel look, this filter is ideal for portraits */
export const perpetua: FilterFunction = (pixels) => {
  pixels = filters.rgbAdjust(pixels, [1.05, 1.1, 1]);
  return pixels;
};

/** Crema: Adds a creamy look that both warms and cools the image */
export const crema: FilterFunction = (pixels) => {
  pixels = filters.rgbAdjust(pixels, [1.04, 1, 1.02]);
  pixels = filters.saturation(pixels, -0.05);
  return pixels;
};

/** Ludwig: A slight hint of desaturation that also enhances light */
export const ludwig: FilterFunction = (pixels) => {
  pixels = filters.brightness(pixels, 0.05);
  pixels = filters.saturation(pixels, -0.03);
  return pixels;
};

// ============================================
// High Contrast / Vivid Filters
// ============================================

/** X-Pro II: Increases color vibrance with a golden tint, high contrast */
export const xpro2: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [255, 255, 0, 0.07]);
  pixels = filters.saturation(pixels, 0.2);
  pixels = filters.contrast(pixels, 0.15);
  return pixels;
};

/** Lo-Fi: Enriches color and adds strong shadows through saturation */
export const lofi: FilterFunction = (pixels) => {
  pixels = filters.contrast(pixels, 0.15);
  pixels = filters.saturation(pixels, 0.2);
  return pixels;
};

/** Hefe: High contrast and saturation, similar effect to Lo-Fi */
export const hefe: FilterFunction = (pixels) => {
  pixels = filters.contrast(pixels, 0.1);
  pixels = filters.saturation(pixels, 0.15);
  return pixels;
};

/** Brannan: Increases contrast and exposure and adds a metallic tint */
export const brannan: FilterFunction = (pixels) => {
  pixels = filters.contrast(pixels, 0.2);
  pixels = filters.colorFilter(pixels, [140, 10, 185, 0.1]);
  return pixels;
};

/** Sutro: Burns photo edges, increases highlights and shadows */
export const sutro: FilterFunction = (pixels) => {
  pixels = filters.brightness(pixels, -0.1);
  pixels = filters.saturation(pixels, -0.1);
  return pixels;
};

/** Skyline: brightens to make the image pop */
export const skyline: FilterFunction = (pixels) => {
  pixels = filters.saturation(pixels, 0.35);
  pixels = filters.brightness(pixels, 0.1);
  return pixels;
};

/** Dogpatch: increases the contrast, while washing out the lighter colors */
export const dogpatch: FilterFunction = (pixels) => {
  pixels = filters.contrast(pixels, 0.15);
  pixels = filters.brightness(pixels, 0.1);
  return pixels;
};

/** Maven: darkens images, increases shadows, and adds a slightly yellow tint */
export const maven: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [225, 240, 0, 0.1]);
  pixels = filters.saturation(pixels, 0.25);
  pixels = filters.contrast(pixels, 0.05);
  return pixels;
};

/** Helena: adds an orange and teal vibe */
export const helena: FilterFunction = (pixels) => {
  pixels = filters.colorFilter(pixels, [208, 208, 86, 0.2]);
  pixels = filters.contrast(pixels, 0.15);
  return pixels;
};

// ============================================
// Soft / Faded Filters
// ============================================

/** Sierra: Gives a faded, softer look */
export const sierra: FilterFunction = (pixels) => {
  pixels = filters.contrast(pixels, -0.15);
  pixels = filters.saturation(pixels, 0.1);
  return pixels;
};

// ============================================
// Google Photos Style Filters
// ============================================

/** Google Style: Enhanced colors with vivid blues and greens, increased contrast and sharpness */
export const googleStyle: FilterFunction = (pixels) => {
  // 1. Increase saturation significantly (colors more vivid)
  pixels = filters.saturation(pixels, 0.35);
  // 2. Boost contrast for more dynamic range
  pixels = filters.contrast(pixels, 0.12);
  // 3. Enhance blue channel for vivid sky
  pixels = filters.rgbAdjust(pixels, [0.98, 1.0, 1.12]);
  // 4. Slight brightness increase
  pixels = filters.brightness(pixels, 0.05);
  // 5. Apply subtle sharpening
  pixels = filters.sharpen(pixels, 0.3);
  return pixels;
};

/** Google Pop: More aggressive color pop effect */
export const googlePop: FilterFunction = (pixels) => {
  // Strong saturation boost
  pixels = filters.saturation(pixels, 0.5);
  // High contrast
  pixels = filters.contrast(pixels, 0.18);
  // Enhance all colors slightly, emphasize blue
  pixels = filters.rgbAdjust(pixels, [1.02, 1.05, 1.15]);
  // Sharpening for crisp details
  pixels = filters.sharpen(pixels, 0.4);
  return pixels;
};

/** Google Vivid: Extreme color enhancement */
export const googleVivid: FilterFunction = (pixels) => {
  // Maximum saturation
  pixels = filters.saturation(pixels, 0.6);
  // Strong contrast
  pixels = filters.contrast(pixels, 0.2);
  // Blue sky enhancement
  pixels = filters.rgbAdjust(pixels, [1.0, 1.02, 1.18]);
  // Brightness adjustment
  pixels = filters.brightness(pixels, 0.03);
  // Strong sharpening
  pixels = filters.sharpen(pixels, 0.5);
  return pixels;
};

/** Google Natural: Subtle enhancement that looks natural */
export const googleNatural: FilterFunction = (pixels) => {
  // Moderate saturation
  pixels = filters.saturation(pixels, 0.2);
  // Slight contrast boost
  pixels = filters.contrast(pixels, 0.08);
  // Balanced color adjustment
  pixels = filters.rgbAdjust(pixels, [1.0, 1.02, 1.08]);
  // Light sharpening
  pixels = filters.sharpen(pixels, 0.2);
  return pixels;
};

/** Google HDR: HDR-like effect with enhanced dynamic range */
export const googleHDR: FilterFunction = (pixels) => {
  // Saturation boost
  pixels = filters.saturation(pixels, 0.4);
  // Strong contrast for HDR effect
  pixels = filters.contrast(pixels, 0.22);
  // Color adjustment
  pixels = filters.rgbAdjust(pixels, [1.02, 1.04, 1.12]);
  // Slight brightness reduction for drama
  pixels = filters.brightness(pixels, -0.02);
  // Sharpening
  pixels = filters.sharpen(pixels, 0.35);
  return pixels;
};

// ============================================
// All Filter Presets
// ============================================

export const filterPresets: FilterPreset[] = [
  // Original
  { id: 'normal', name: 'Normal', nameKo: '원본', description: 'No filter applied', category: 'soft', apply: normal },

  // Google Photos Style (Most Important - First!)
  { id: 'google-style', name: 'Google Style', nameKo: '구글 스타일', description: '구글 포토 스타일사진 효과', category: 'google', apply: googleStyle },
  { id: 'google-pop', name: 'Google Pop', nameKo: '구글 팝', description: '강렬한 색상 팝 효과', category: 'google', apply: googlePop },
  { id: 'google-vivid', name: 'Google Vivid', nameKo: '구글 비비드', description: '극대화된 색상 강화', category: 'google', apply: googleVivid },
  { id: 'google-natural', name: 'Google Natural', nameKo: '구글 내추럴', description: '자연스러운 색상 향상', category: 'google', apply: googleNatural },
  { id: 'google-hdr', name: 'Google HDR', nameKo: '구글 HDR', description: 'HDR 효과로 다이나믹한 느낌', category: 'google', apply: googleHDR },

  // Vintage & Retro
  { id: 'clarendon', name: 'Clarendon', nameKo: '클라렌돈', description: 'Light to lighter, dark to darker', category: 'vintage', apply: clarendon },
  { id: 'gingham', name: 'Gingham', nameKo: '깅엄', description: 'Vintage-inspired, muted colors', category: 'vintage', apply: gingham },
  { id: 'reyes', name: 'Reyes', nameKo: '레예스', description: 'Dusty vintage look', category: 'vintage', apply: reyes },
  { id: 'stinson', name: 'Stinson', nameKo: '스틴슨', description: 'Washed out colors', category: 'vintage', apply: stinson },
  { id: 'earlybird', name: 'Earlybird', nameKo: '얼리버드', description: 'Sepia tint, warm temperature', category: 'vintage', apply: earlybird },
  { id: 'toaster', name: 'Toaster', nameKo: '토스터', description: 'Aged look with dramatic vignette', category: 'vintage', apply: toaster },
  { id: 'walden', name: 'Walden', nameKo: '월든', description: 'Increased exposure, yellow tint', category: 'vintage', apply: walden },
  { id: '1977', name: '1977', nameKo: '1977', description: 'Rosy, brighter, faded look', category: 'vintage', apply: f1977 },
  { id: 'brooklyn', name: 'Brooklyn', nameKo: '브루클린', description: 'Cool tint with sepia', category: 'vintage', apply: brooklyn },

  // Black & White
  { id: 'moon', name: 'Moon', nameKo: '문', description: 'B/W with increased brightness', category: 'bw', apply: moon },
  { id: 'willow', name: 'Willow', nameKo: '윌로우', description: 'Monochromatic with purple tones', category: 'bw', apply: willow },
  { id: 'inkwell', name: 'Inkwell', nameKo: '잉크웰', description: 'Classic black and white', category: 'bw', apply: inkwell },

  // Warm Tones
  { id: 'lark', name: 'Lark', nameKo: '라크', description: 'Brightens and intensifies colors', category: 'warm', apply: lark },
  { id: 'juno', name: 'Juno', nameKo: '주노', description: 'Intensifies red and yellow hues', category: 'warm', apply: juno },
  { id: 'amaro', name: 'Amaro', nameKo: '아마로', description: 'Adds light with center focus', category: 'warm', apply: amaro },
  { id: 'mayfair', name: 'Mayfair', nameKo: '메이페어', description: 'Warm pink tone', category: 'warm', apply: mayfair },
  { id: 'rise', name: 'Rise', nameKo: '라이즈', description: 'Glow with softer lighting', category: 'warm', apply: rise },
  { id: 'valencia', name: 'Valencia', nameKo: '발렌시아', description: 'Antique feel, warm colors', category: 'warm', apply: valencia },
  { id: 'kelvin', name: 'Kelvin', nameKo: '켈빈', description: 'Radiant glow, high saturation', category: 'warm', apply: kelvin },
  { id: 'nashville', name: 'Nashville', nameKo: '내슈빌', description: 'Nostalgic pink tint', category: 'warm', apply: nashville },
  { id: 'vesper', name: 'Vesper', nameKo: '베스퍼', description: 'Subtle yellow tint', category: 'warm', apply: vesper },
  { id: 'ashby', name: 'Ashby', nameKo: '애시비', description: 'Golden glow, vintage feel', category: 'warm', apply: ashby },
  { id: 'charmes', name: 'Charmes', nameKo: '샤름', description: 'High contrast, red tint', category: 'warm', apply: charmes },
  { id: 'ginza', name: 'Ginza', nameKo: '긴자', description: 'Bright with warm glow', category: 'warm', apply: ginza },

  // Cool Tones
  { id: 'hudson', name: 'Hudson', nameKo: '허드슨', description: 'Icy illusion, cool tint', category: 'cool', apply: hudson },
  { id: 'slumber', name: 'Slumber', nameKo: '슬럼버', description: 'Dreamy, desaturated look', category: 'cool', apply: slumber },
  { id: 'aden', name: 'Aden', nameKo: '에이든', description: 'Blue/pink natural look', category: 'cool', apply: aden },
  { id: 'perpetua', name: 'Perpetua', nameKo: '퍼페츄아', description: 'Pastel look for portraits', category: 'cool', apply: perpetua },
  { id: 'crema', name: 'Crema', nameKo: '크레마', description: 'Creamy, balanced tones', category: 'cool', apply: crema },
  { id: 'ludwig', name: 'Ludwig', nameKo: '루드비히', description: 'Subtle desaturation', category: 'cool', apply: ludwig },

  // High Contrast / Vivid
  { id: 'xpro2', name: 'X-Pro II', nameKo: '엑스프로 II', description: 'Vibrant with golden tint', category: 'vivid', apply: xpro2 },
  { id: 'lofi', name: 'Lo-Fi', nameKo: '로파이', description: 'Rich color, strong shadows', category: 'vivid', apply: lofi },
  { id: 'hefe', name: 'Hefe', nameKo: '헤페', description: 'High contrast and saturation', category: 'vivid', apply: hefe },
  { id: 'brannan', name: 'Brannan', nameKo: '브래넌', description: 'High contrast, metallic tint', category: 'vivid', apply: brannan },
  { id: 'sutro', name: 'Sutro', nameKo: '수트로', description: 'Dark edges, dramatic shadows', category: 'vivid', apply: sutro },
  { id: 'skyline', name: 'Skyline', nameKo: '스카이라인', description: 'Bright and vivid', category: 'vivid', apply: skyline },
  { id: 'dogpatch', name: 'Dogpatch', nameKo: '독패치', description: 'High contrast, washed highlights', category: 'vivid', apply: dogpatch },
  { id: 'maven', name: 'Maven', nameKo: '메이븐', description: 'Dark with yellow tint', category: 'vivid', apply: maven },
  { id: 'helena', name: 'Helena', nameKo: '헬레나', description: 'Orange and teal vibe', category: 'vivid', apply: helena },

  // Soft / Faded
  { id: 'sierra', name: 'Sierra', nameKo: '시에라', description: 'Faded, softer look', category: 'soft', apply: sierra },
];

// Category labels for UI
export const filterCategories = {
  google: { name: 'Google Style', nameKo: '구글 스타일' },
  vintage: { name: 'Vintage', nameKo: '빈티지' },
  bw: { name: 'Black & White', nameKo: '흑백' },
  warm: { name: 'Warm', nameKo: '따뜻한 톤' },
  cool: { name: 'Cool', nameKo: '차가운 톤' },
  vivid: { name: 'Vivid', nameKo: '선명한' },
  soft: { name: 'Soft', nameKo: '부드러운' },
  artistic: { name: 'Artistic', nameKo: '아티스틱' },
};

// Get filter by ID
export function getFilterById(id: string): FilterPreset | undefined {
  return filterPresets.find(f => f.id === id);
}

// Get filters by category
export function getFiltersByCategory(category: FilterPreset['category']): FilterPreset[] {
  return filterPresets.filter(f => f.category === category);
}
