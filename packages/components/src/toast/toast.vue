<template>
  <div class="md-toast" :class="[`md-toast-${position}`, `md-toast-${direction}`]">
    <md-popup
      class="md-popup"
      :value="visible"
      :position="position === 'center' ? position : `center-${position}`"
      :hasMask="hasMask"
      :maskClosable="false"
      @show="$_onShow"
      @hide="$_onHide"
    >
      <div class="md-toast_content" v-if="$slots.default">
        <slot/>
      </div>
      <div class="md-toast_content" v-else>
        <md-icon
          v-if="innerIcon"
          class="md-icon"
          :name="innerIcon"
          :svg="iconSvg"
          size="md"
        />
        <div class="md-toast_text" v-if="content" v-text="content"></div>
      </div>
    </md-popup>
  </div>
</template>

<script>
import Popup from '../popup'
import Icon from '../icon'

export default {
  name: 'md-toast',

  components: {
    'md-popup': Popup,
    'md-icon': Icon,
  },

  props: {
    type: {
      // info, succeed, failed
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
    iconSvg: {
      type: Boolean,
      default: false,
    },
    content: {
      type: [String, Number],
      default: '',
    },
    duration: {
      type: Number,
      default: 3000,
    },
    position: {
      // top, center, bottom
      type: String,
      default: 'center',
    },
    direction: {
      // horizontal, vertical
      type: String,
      default: 'horizontal',
    },
    hasMask: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      visible: false,
    }
  },

  computed: {
    innerIcon() {
      switch (this.type) {
        case 'info':
          return this.icon || 'info'
        case 'succeed':
          return this.icon || 'success'
        case 'failed':
          return this.icon || 'fail'
        case 'loading':
          return this.icon || 'ring'
        default:
          return this.icon
      }
    },
  },

  beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },

  methods: {
    $_onShow() {
      this.$emit('show')
    },
    $_onHide() {
      this.$emit('hide')
    },
    fire() {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.visible && this.duration) {
        this.timer = setTimeout(() => {
          this.hide()
        }, this.duration)
      }
    },
    show() {
      this.visible = true
      this.fire()
    },
    hide() {
      this.visible = false
    },
  },
}

</script>

<style lang="stylus">
.md-toast
  .md-popup
    z-index md-toast-zindex
    .md-popup_box
      width 540px
      display flex
      justify-content center
    .md-popup_mask
      background transparent
  .md-icon
    flex-shrink 0
    color md-toast-color
  .md-icon + .md-toast_text
    margin-left md-h-gap-sm
  &-vertical
    .md-toast_content
      display flex
      flex-direction column
      justify-content center
      width 300px
      height 240px
      .md-icon
        width 60px
        height 60px
        font-size 60px
      .md-toast_text
        margin-top 32px
        margin-left 0


.md-toast_content
  display inline-flex
  align-items center
  max-width 100%
  min-width 80px
  padding md-toast-padding
  line-height 1.42857142
  text-align left
  font-size md-toast-font-size
  color md-toast-color
  background-color md-toast-fill
  box-sizing border-box
  border-radius md-toast-radius
  overflow hidden

.md-toast_text
  white-space nowrap
  text-overflow ellipsis
  overflow hidden
</style>
