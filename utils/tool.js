export function hexToRgb(hex, opacity) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  }
  if (opacity) {
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
  }
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
}
