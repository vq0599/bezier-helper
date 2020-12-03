import { SPACING, UNIT_WIDTH, STRIPE_COLOR } from "./constants"

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
  ctx.lineTo(width - SPACING, SPACING);
  while (x < width - SPACING) {
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
 * @param {Canvas} $canvas
 */
export const drawBackground = ($canvas) => {
  const ctx = $canvas.getContext('2d')
  const { height, width } = $canvas

  ctx.beginPath()
  ctx.fillStyle = STRIPE_COLOR
  let y = SPACING + UNIT_WIDTH / 2
  while (y < height) {
    ctx.fillRect(SPACING, y, width - SPACING * 2, SPACING / 2)
    y += UNIT_WIDTH
  }
  ctx.closePath()

  drawCoordinate($canvas)
}
