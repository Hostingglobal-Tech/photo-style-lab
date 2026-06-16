/**
 * Core filter operations for image processing
 * TypeScript implementation inspired by filterous-2
 */

import { RGBtoHSV, HSVtoRGB } from './colorUtils';

/**
 * Convert image to grayscale
 */
export function grayscale(pixels: ImageData): ImageData {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    // Luminosity method (weighted average)
    const avg = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    d[i] = d[i + 1] = d[i + 2] = avg;
  }
  return pixels;
}

/**
 * Apply sepia tone effect
 * @param adj - Adjustment level (0 = unchanged, 1 = full sepia)
 */
export function sepia(pixels: ImageData, adj: number): ImageData {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    d[i] = (r * (1 - (0.607 * adj))) + (g * 0.769 * adj) + (b * 0.189 * adj);
    d[i + 1] = (r * 0.349 * adj) + (g * (1 - (0.314 * adj))) + (b * 0.168 * adj);
    d[i + 2] = (r * 0.272 * adj) + (g * 0.534 * adj) + (b * (1 - (0.869 * adj)));
  }
  return pixels;
}

/**
 * Invert colors
 */
export function invert(pixels: ImageData): ImageData {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    d[i] = 255 - d[i];
    d[i + 1] = 255 - d[i + 1];
    d[i + 2] = 255 - d[i + 2];
  }
  return pixels;
}

/**
 * Adjust brightness
 * @param adj - Adjustment level (-1 = darker, 1 = lighter, 0 = unchanged)
 */
export function brightness(pixels: ImageData, adj: number): ImageData {
  const d = pixels.data;
  adj = Math.max(-1, Math.min(1, adj));
  const adjValue = Math.round(255 * adj);

  for (let i = 0; i < d.length; i += 4) {
    d[i] = Math.max(0, Math.min(255, d[i] + adjValue));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + adjValue));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + adjValue));
  }
  return pixels;
}

/**
 * Adjust saturation using HSV conversion (more accurate but slower)
 * @param adj - Adjustment level (< 1 = desaturated, 1 = unchanged, > 1 = saturated)
 */
export function hueSaturation(pixels: ImageData, adj: number): ImageData {
  const d = pixels.data;
  for (let i = 0; i < d.length; i += 4) {
    const hsv = RGBtoHSV(d[i], d[i + 1], d[i + 2]);
    hsv[1] *= adj;
    hsv[1] = Math.max(0, Math.min(1, hsv[1]));
    const rgb = HSVtoRGB(hsv[0], hsv[1], hsv[2]);
    d[i] = rgb[0];
    d[i + 1] = rgb[1];
    d[i + 2] = rgb[2];
  }
  return pixels;
}

/**
 * Adjust perceived saturation (faster method)
 * @param adj - Adjustment level (-1 = desaturated, 0 = unchanged, > 0 = saturated)
 */
export function saturation(pixels: ImageData, adj: number): ImageData {
  const d = pixels.data;
  adj = Math.max(-1, adj);

  for (let i = 0; i < d.length; i += 4) {
    const r = d[i], g = d[i + 1], b = d[i + 2];
    // Weights from CCIR 601 spec
    const gray = 0.2989 * r + 0.5870 * g + 0.1140 * b;
    d[i] = Math.max(0, Math.min(255, -gray * adj + d[i] * (1 + adj)));
    d[i + 1] = Math.max(0, Math.min(255, -gray * adj + d[i + 1] * (1 + adj)));
    d[i + 2] = Math.max(0, Math.min(255, -gray * adj + d[i + 2] * (1 + adj)));
  }
  return pixels;
}

/**
 * Adjust contrast
 * @param adj - Adjustment level (-1 to 1)
 */
export function contrast(pixels: ImageData, adj: number): ImageData {
  const adjValue = adj * 255;
  const d = pixels.data;
  const factor = (259 * (adjValue + 255)) / (255 * (259 - adjValue));

  for (let i = 0; i < d.length; i += 4) {
    d[i] = Math.max(0, Math.min(255, factor * (d[i] - 128) + 128));
    d[i + 1] = Math.max(0, Math.min(255, factor * (d[i + 1] - 128) + 128));
    d[i + 2] = Math.max(0, Math.min(255, factor * (d[i + 2] - 128) + 128));
  }
  return pixels;
}

/**
 * Apply a color overlay/filter
 * @param rgbColor - [r, g, b, adj] where adj is the blend amount (0-1)
 */
export function colorFilter(pixels: ImageData, rgbColor: [number, number, number, number]): ImageData {
  const d = pixels.data;
  const adj = rgbColor[3];

  for (let i = 0; i < d.length; i += 4) {
    d[i] = d[i] - (d[i] - rgbColor[0]) * adj;
    d[i + 1] = d[i + 1] - (d[i + 1] - rgbColor[1]) * adj;
    d[i + 2] = d[i + 2] - (d[i + 2] - rgbColor[2]) * adj;
  }
  return pixels;
}

/**
 * Adjust RGB channels individually
 * @param rgbAdj - [rMult, gMult, bMult] multipliers for each channel
 */
export function rgbAdjust(pixels: ImageData, rgbAdj: [number, number, number]): ImageData {
  const d = pixels.data;

  for (let i = 0; i < d.length; i += 4) {
    d[i] = Math.max(0, Math.min(255, d[i] * rgbAdj[0]));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] * rgbAdj[1]));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] * rgbAdj[2]));
  }
  return pixels;
}

/**
 * Apply convolution matrix (for effects like blur, sharpen, edge detection)
 * @param weights - 3x3 convolution matrix (9 values)
 */
export function convolute(pixels: ImageData, weights: number[]): ImageData {
  const side = Math.round(Math.sqrt(weights.length));
  const halfSide = Math.floor(side / 2);

  const d = pixels.data;
  const sw = pixels.width;
  const sh = pixels.height;

  // Create a copy to read from
  const output = new Uint8ClampedArray(d.length);

  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      const dstOff = (y * sw + x) * 4;
      let r = 0, g = 0, b = 0;

      for (let cy = 0; cy < side; cy++) {
        for (let cx = 0; cx < side; cx++) {
          const scy = y + cy - halfSide;
          const scx = x + cx - halfSide;

          if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
            const srcOff = (scy * sw + scx) * 4;
            const wt = weights[cy * side + cx];
            r += d[srcOff] * wt;
            g += d[srcOff + 1] * wt;
            b += d[srcOff + 2] * wt;
          }
        }
      }

      output[dstOff] = Math.max(0, Math.min(255, r));
      output[dstOff + 1] = Math.max(0, Math.min(255, g));
      output[dstOff + 2] = Math.max(0, Math.min(255, b));
      output[dstOff + 3] = d[dstOff + 3]; // Keep alpha
    }
  }

  // Copy output back to original
  for (let i = 0; i < d.length; i++) {
    d[i] = output[i];
  }

  return pixels;
}

/**
 * Sharpen the image
 * @param amount - Sharpening strength (default 1)
 */
export function sharpen(pixels: ImageData, amount: number = 1): ImageData {
  return convolute(pixels, [
    0, -1 * amount, 0,
    -1 * amount, 1 + 4 * amount, -1 * amount,
    0, -1 * amount, 0
  ]);
}

/**
 * Apply vignette effect (darken corners)
 */
export function vignette(pixels: ImageData, amount: number = 0.5): ImageData {
  const d = pixels.data;
  const w = pixels.width;
  const h = pixels.height;
  const cx = w / 2;
  const cy = h / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const vignetteFactor = 1 - (dist / maxDist) * amount;

      d[i] = Math.max(0, d[i] * vignetteFactor);
      d[i + 1] = Math.max(0, d[i + 1] * vignetteFactor);
      d[i + 2] = Math.max(0, d[i + 2] * vignetteFactor);
    }
  }
  return pixels;
}

/**
 * Add noise to the image
 * @param amount - Noise intensity (0-100)
 */
export function noise(pixels: ImageData, amount: number = 20): ImageData {
  const d = pixels.data;

  for (let i = 0; i < d.length; i += 4) {
    const noiseVal = (Math.random() - 0.5) * amount;
    d[i] = Math.max(0, Math.min(255, d[i] + noiseVal));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + noiseVal));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + noiseVal));
  }
  return pixels;
}
