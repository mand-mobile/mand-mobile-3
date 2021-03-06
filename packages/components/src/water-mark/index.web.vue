<template>
  <div class="md-water-mark" :style="inlineStyles">
    <div class="md-water-mark_container">
      <slot></slot>
    </div>
    <div
      v-if="!!$scopedSlots.watermark || content"
      class="md-water-mark_list"
      ref="mark"
    >
      <div
        class="md-water-mark_list_wrapper"
        :style="{
           opacity,
           transform: `rotate(${rotate}deg)`
         }"
      >
        <template v-if="content">
          <canvas ref="canvas" class="md-water-mark_list_canvas"></canvas>
        </template>
        <template v-else-if="!!$scopedSlots.watermark">
          <ul
            v-for="i in (repeatY ? repetition : 1)"
            class="md-water-mark_list_wrap_line"
            :style="{
            marginBottom: spacing,
          }"
            :key="`line-${i}`"
          >
            <li
              v-for="j in (repeatX ? repetition : 1)"
              class="water-mark_list_wrap_line_item"
              :style="i % 2 === 0 ? {
              marginLeft: repeatX ? spacing : 0,
            } : {
              marginRight: repeatX ? spacing : 0,
            }"
              :key="`item-${j}`"
            >
              <slot
                name="watermark"
                :coord="{row: i, col: j}"
              ></slot>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import {getDpr, flatStyleObject} from '@mand-mobile/shared/lib/util'
import commonMixin from './mixins'
import './common.styl'

export default {
  name: 'md-water-mark',

  mixins: [commonMixin],

  data() {
    return {
      repetition: process.env.NODE_ENV === 'test' ? 2 : 50,
    }
  },

  computed: {
    inlineStyles() {
      return flatStyleObject(this.styles)
    },
  },

  mounted() {
    if (this.content) {
      this.ctx = this.$refs.canvas.getContext('2d')
      this.ratio = Math.max(getDpr(), 2) // min ratio = 2

      this.$_initCanvas()
      this.$_computedSpacing()
      this.$_draw()
    }
  },

  methods: {
    $_initCanvas() {
      const {ctx, ratio, $refs} = this
      const {mark, canvas} = $refs
      const {clientWidth, clientHeight} = mark

      this.ctxWidth = canvas.width = clientWidth * ratio
      this.ctxHeight = canvas.height = clientHeight * ratio

      ctx.scale(1 / ratio, 1 / ratio)
    },

    $_computedSpacing() {
      const {spacing, ratio} = this

      if (typeof spacing === 'number') {
        this.realSpacing = spacing
        return
      }
      const [, amount = 20, unit = 'vw'] = /([0-9]+)([A-Za-z]+)/.exec(spacing)

      if (unit === 'px') {
        this.realSpacing = amount
      } else if (unit === 'vh') {
        const height = window.screen.height
        this.realSpacing = amount * height / 100
      } else if (unit === 'vw') {
        const width = window.screen.width
        this.realSpacing = amount * width / 100
      }

      this.realSpacing *= ratio
    },

    $_draw() {
      const {content, ctx, realSpacing, ratio, color, fontSize, ctxWidth, ctxHeight} = this

      const _fontSize = fontSize * ratio
      const contentLength = content.length * _fontSize
      const xCount = Math.ceil(ctxWidth * ratio / (contentLength + realSpacing))
      const yCount = Math.ceil(ctxHeight * ratio / (_fontSize + realSpacing))

      ctx.font = `${_fontSize}px "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif`
      ctx.fillStyle = color

      let ctxX = 0
      let ctxY = 0
      for (let y = 0; y < yCount; y++) {
        ctxX = 0
        for (let x = 0; x < xCount; x++) {
          ctx.fillText(content, ctxX, ctxY)
          ctxX += contentLength
        }
        ctxY += _fontSize + realSpacing
      }
    },
  },
}

</script>

