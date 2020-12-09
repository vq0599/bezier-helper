/**
 * 16进制转rgb/rgba
 * @param {string} hex 16进制颜色
 * @param {number} opacity 透明度
 */
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

/**
 * 限制取值在范围之内
 * @param {number} v 目标
 * @param {number} min 最小值
 * @param {number} max 最大值
 */
export function fixNumberInRange(v, min, max) {
  if (v < min) {
    v = 0
  } else if (v > max) {
    v = max
  }
  return v
}
