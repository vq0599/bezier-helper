import { SPACING, UNIT_WIDTH, STRIPE_COLOR, CURVE_WIDTH, CURVE_COLOR } from "./constants"

/**
 * 画x、y轴
 * @param {HTMLCanvasElement} $canvas
 */
export const drawCoordinate = ($canvas) => {
  const { height, width } = $canvas
  const ctx = $canvas.getContext('2d')

  let y = SPACING
  let x = SPACING
  ctx.beginPath()
  ctx.fillStyle = '#333'
  ctx.lineWidth = 1;

  // x轴
  ctx.moveTo(SPACING, SPACING)
  ctx.lineTo(width, SPACING);
  while (x < width) {
    ctx.moveTo(x, SPACING)
    ctx.lineTo(x, SPACING - 8)
    ctx.textAlign = 'center'
    ctx.fillText(x - SPACING, x , 28);
    x+= UNIT_WIDTH
  }

  // y轴
  ctx.moveTo(SPACING, SPACING)
  ctx.lineTo(SPACING, height);
  while (y <= height) {
    ctx.moveTo(SPACING, y)
    ctx.lineTo(SPACING - 8, y)
    ctx.textAlign = 'right'
    ctx.fillText(y - SPACING, 28, y + 3);
    y+= UNIT_WIDTH
  }

  ctx.strokeStyle = '#333';
  ctx.stroke();
  ctx.closePath()
}

/**
 * 画背景条纹
 * @param {HTMLCanvasElement} $canvas
 */
export const drawStripe = ($canvas) => {
  const ctx = $canvas.getContext('2d')
  const { height, width } = $canvas

  ctx.beginPath()
  ctx.fillStyle = STRIPE_COLOR
  let y = SPACING + UNIT_WIDTH / 2
  while (y < height) {
    ctx.fillRect(SPACING, y, width, SPACING / 2)
    y += UNIT_WIDTH
  }
  ctx.closePath()
}

/**
 * 画直线
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: Number, y: Number }} p1
 * @param {{ x: Number, y: Number }} p2
 * @param {Number} width
 * @param {String} color
 */
export const drawLine = (ctx, p1, p2, width, color) => {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.lineWidth = width;
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
}

/**
 * 画贝塞尔曲线
 * @param {CanvasRenderingContext2D} ctx
 * @param {{ x: Number, y: Number }} start
 * @param {{ x: Number, y: Number }} ctrl1
 * @param {{ x: Number, y: Number }} ctrl2
 * @param {{ x: Number, y: Number }} end
 */
export const drawBezierCurve = (ctx, start, ctrl1, ctrl2, end) => {
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.bezierCurveTo(ctrl1.x, ctrl1.y, ctrl2.x, ctrl2.y, end.x, end.y);
  ctx.lineWidth = CURVE_WIDTH;
  ctx.strokeStyle = CURVE_COLOR
  ctx.stroke();
  ctx.closePath();
}
