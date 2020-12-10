<template>
  <div class="page">
    <div class="tips">
      <span>👇️&nbsp;&nbsp;{{ tips[step] }}</span>
    </div>
    <div class="main">
      <div class="container">
        <canvas
          ref="b-canvas"
          :width="width + spacing"
          :height="height + spacing + 20"
          class="coordinate"
        />
        <div class="content">
          <canvas
            ref="c-canvas"
            :width="width"
            :height="height"
            @mousedown="onMouseDown"
          />
          <template v-for="p in pointerList">
            <button
              v-if="p.visible"
              :key="p.key"
              :style="generatePointerStyle(p)"
              :class="['pointer', `pointer-${p.key}`, { active: p.active }]"
              @mousedown="onAddDragEvent($event, p.key)"
            />
          </template>
        </div>
      </div>
      <div class="form">
        <div
          v-for="p in pointerList"
          :key="p.key"
          class="form-item"
        >
          <span>{{ poiners_name[p.key] }}：</span>
          <NumberInput
            :disabled="!p.visible"
            :value="$data[p.key].x"
            @input="onInput($event, p.key, 'x')"
          />
          <NumberInput
            :disabled="!p.visible"
            :value="$data[p.key].y"
            @input="onInput($event, p.key, 'y')"
          />
          <span
            v-if="!p.visible"
            class="form-item-tip"
          >(未绘制)</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { drawCoordinate, drawStripe, drawLine, drawBezierCurve } from '../utils/draw'
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  LINE_COLOR,
  TANGENT_COLOR,
  POINTER_RADIUS,
  LINE_WIDTH,
  TANGENT_WIDTH,
  SPACING,
} from '../utils/constants'
import { fixNumberInRange } from '../utils/tool'

const tips = [
  '请点击绘制起点',
  '请点击绘制终点',
  '请点击绘制第一个控制点',
  '请点击绘制第二个控制点',
  'OK，现在你可以随意拖动各个点以构造不同的贝塞尔曲线了',
]

const poiners_name = {
  start: '起点',
  end: '终点',
  ctrl1: '控制点1',
  ctrl2: '控制点2',
}

export default {
  data() {
    return {
      start: { x: 0, y: 0, visible: false, active: false },
      end: { x: 0, y: 0, visible: false, active: false },
      ctrl1: { x: 0, y: 0, visible: false, active: false },
      ctrl2: { x: 0, y: 0, visible: false, active: false },
      tips,
      poiners_name,
      step: 0,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      spacing: SPACING
    }
  },
  computed: {
    pointerList() {
      const { start, end, ctrl1, ctrl2 } = this
      return Object.entries({ start, end, ctrl1, ctrl2 }).map(([key, p]) => ({ key, ...p }))
    },
    /**
     * @returns {HTMLCanvasElement}
     */
    $c() {
      return this.$refs['c-canvas']
    },
    /**
     * @returns {HTMLCanvasElement}
     */
    $b() {
      return this.$refs['b-canvas']
    },
    /**
     * @returns {CanvasRenderingContext2D}
     */
    ctx() {
      return this.$c.getContext('2d')
    }
  },
  mounted() {
    drawStripe(this.$b)
    drawCoordinate(this.$b)
  },
  methods: {
    generatePointerStyle(p) {
      if (!p) return
      return {
        left: `${p.x - POINTER_RADIUS}px`,
        top: `${p.y - POINTER_RADIUS}px`,
        width: `${POINTER_RADIUS * 2 + 1}px`,
        height: `${POINTER_RADIUS * 2 + 1}px`,
      }
    },
    renderControlPoiner({ x, y }) {
      for (let i = 0; i < this.pointerList.length; i++) {
        const p = this.pointerList[i];
        if (p.visible) continue;
        this[p.key].x = x;
        this[p.key].y = y;
        this[p.key].visible = true
        this.step ++
        break
      }
    },
    draw() {
      const { start, end, ctrl1, ctrl2, ctx, $c } = this

      // 清空内容画布
      ctx.clearRect(0, 0, $c.width, $c.height)

      if (end.visible) {
        // 画始末点连接性
        drawLine(ctx, start, end, LINE_WIDTH, LINE_COLOR)
      }

      if (ctrl1.visible) {
        // 画第一个控制点的切线
        drawLine(ctx, start, ctrl1, TANGENT_WIDTH, TANGENT_COLOR)

        if (ctrl2.visible) {
          // 画第二个控制点的切线
          drawLine(ctx, end, ctrl2, TANGENT_WIDTH, TANGENT_COLOR)
          // 画贝塞尔曲线
          drawBezierCurve(ctx, start, ctrl1, ctrl2, end)
        } else {
          // 如果没有第二个控制点，则以终点作为第二个控制点画贝塞尔曲线
          drawBezierCurve(ctx, start, ctrl1, end, end)
        }
      }
    },
    onInput(value, key, direction) {
      this[key][direction] = value
      this.draw()
    },
    onMouseDown(ev) {
      const { offsetX: x, offsetY: y } = ev
      this.renderControlPoiner({ x, y })
      this.draw()
    },
    onAddDragEvent(ev, key) {
      const p = this[key]
      const originMouseX = ev.x
      const originMouseY = ev.y
      const originPointerX = p.x
      const originPointerY = p.y

      document.onmousemove = ev => {
        const { x, y } = ev
        let nX = originPointerX + (x - originMouseX)
        let nY = originPointerY + (y - originMouseY)
        this[key].x = fixNumberInRange(nX, 0, this.$c.width)
        this[key].y = fixNumberInRange(nY, 0, this.$c.height)
        this.draw()
      }
      document.onmouseup = () => {
        document.onmousemove = null
      }
    },
  },
}
</script>

<style lang="scss">
.page {
  max-width: 1200px;
  margin: 20px auto;
  .main {
    display: flex;
    margin-top: 20px;
  }
}
.container {
  display: inline-block;
  position: relative;
  margin-right: 20px;
  .content {
    display: flex;
    position: absolute;
    top: 40px;
    left: 40px;
  }
}
.canvas {
  display: flex;
  position: relative;
}
.pointer {
  position: absolute;
  border-radius: 50%;
  background: transparent;
  border: 1px solid rgba(0, 0, 0, .3);
  padding: 0;
  outline: 0;
  cursor: move;

  &-start {
    background: #fff;
  }
  &-end {
    background: #fff;
  }
  &-ctrl1 {
    background: #cc3834;
  }
  &-ctrl2 {
    background: #62a6ae;
  }
}

.form {
  &-item {
    display: flex;
    margin-bottom: 10px;
    align-items: center;
    &-tip {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
