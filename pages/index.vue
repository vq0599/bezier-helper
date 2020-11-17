<template>
  <div class="page">
    <div class="tips">
      <span>👇️&nbsp;&nbsp;{{ tips[step] }}</span>
    </div>
    <div class="main">
      <div class="container">
        <canvas
          ref="canvas"
          class="canvas"
          width="800"
          height="500"
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
const POINTER_RADIUS = 5

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
      PR: POINTER_RADIUS,
      tips,
      poiners_name,
      step: 0,
    }
  },
  computed: {
    pointerList() {
      const { start, end, ctrl1, ctrl2 } = this
      return Object.entries({ start, end, ctrl1, ctrl2 }).map(([key, p]) => ({ key, ...p }))
    },
    $canvas() {
      return this.$refs.canvas
    },
    ctx() {
      return this.$canvas.getContext('2d')
    }
  },
  methods: {
    generatePointerStyle(p) {
      if (!p) return
      const { PR } = this
      return {
        left: `${p.x - PR}px`,
        top: `${p.y - PR}px`,
        width: `${PR * 2 + 1}px`,
        height: `${PR * 2 + 1}px`,
      }
    },
    drawPoiner({ x, y }) {
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
    drawLine(p1, p2, width, color) {
      const { ctx } = this
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineWidth = width;
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.closePath();
    },
    drawBezierCurve() {
      const { ctx, start, end, ctrl1: originC1, ctrl2: originC2 } = this

      // 始末点作为控制点的默认值
      const ctrl1 = originC1.visible ? originC1 : start
      const ctrl2 = originC2.visible ? originC2 : end

      //画贝塞尔曲线
      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.bezierCurveTo(ctrl1.x, ctrl1.y, ctrl2.x, ctrl2.y, end.x, end.y);
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.closePath();
    },
    draw() {
      this.clearRect()
      const { start, end, ctrl1, ctrl2 } = this
      if (this.end.visible) {
        this.drawLine(start, end, 3, 'rgba(255, 165, 0, .2)')
      }
      if (this.ctrl1.visible) {
        this.drawLine(start, ctrl1, 1, '#333')
        this.drawBezierCurve()
      }
      if (this.ctrl2.visible) {
        this.drawLine(end, ctrl2, 1, '#333')
      }
    },
    clearRect() {
      const { ctx, $canvas } = this
      ctx.clearRect(0, 0, $canvas.width, $canvas.height)
    },
    onInput(value, key, direction) {
      this[key][direction] = value
      this.draw()
    },
    onMouseDown(ev) {
      const { offsetX: x, offsetY: y } = ev
      this.drawPoiner({ x, y })
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
        this[key].x = originPointerX + (x - originMouseX)
        this[key].y = originPointerY + (y - originMouseY)
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
  overflow: hidden;
  outline: 1px solid #ccc;
  margin-right: 20px;
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
    background: #f08;
  }
  &-ctrl2 {
    background: #0ab;
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
