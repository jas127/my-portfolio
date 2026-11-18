/**
 * Picks near-black or warm cream text for a given background colour, so labels on
 * lime/pink stickers stay readable while labels on violet/red stay light.
 * Uses the standard WCAG relative-luminance formula.
 */
export function readableText(hex: string): string {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 0.35 ? '#191919' : '#FFF7E8';
}
