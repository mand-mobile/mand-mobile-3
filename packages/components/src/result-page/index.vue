<template>
  <div class="md-result">
    <div class="md-result_image">
      <img mode="widthFix" :src="actualImgUrl" :class="!imgUrl && type"/>
    </div>
    <div class="md-result_text" v-if="actualText">{{actualText}}</div>
    <div class="md-result_subtext" v-if="actualSubText">{{actualSubText}}</div>
    <div class="md-result_buttons" v-if="buttons.length">
      <template v-for="button of buttons">
        <md-button
          class="md-button"
          :type="button.type"
          :plain="button.plain === undefined || button.plain"
          :round="button.round"
          :inactive="button.inactive"
          :loading="button.loading"
          :icon="button.icon"
          :icon-svg="button.iconSvg"
          :key="button.text"
          size="small"
          inline
          @click="onButtonClick(button)"
        >{{button.text}}</md-button>
      </template>
    </div>
  </div>
</template>

<script>
import Button from '../button'

export default {
  name: 'md-result-page',

  components: {
    'md-button': Button,
  },

  props: {
    type: {
      type: String,
      default: 'empty',
    },
    imgUrl: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    subtext: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default() {
        return []
      },
    },
  },

  computed: {
    actualImgUrl() {
      const pre = '//manhattan.didistatic.com/static/manhattan/mand-mobile/result-page/2.1/'
      return this.imgUrl || `${pre}${this.type}.png`
    },
    actualText() {
      return (
        this.text ||
        {
          // 网络连接异常
          network: '\u7f51\u7edc\u8fde\u63a5\u5f02\u5e38',
          // 暂无信息
          empty: '\u6682\u65e0\u4fe1\u606f',
        }[this.type] ||
        ''
      )
    },
    actualSubText() {
      return (
        this.subtext ||
        {
          // 您要访问的页面已丢失
          lost: '\u60a8\u8981\u8bbf\u95ee\u7684\u9875\u9762\u5df2\u4e22\u5931',
        }[this.type] ||
        ''
      )
    },
  },

  methods: {
    onButtonClick(button) {
      if (button.handler) {
        button.handler.call(this, button)
      }
      this.$emit('action', button)
    },
  },
}

</script>

<style lang="stylus">
.md-result
  display flex
  align-items center
  justify-content center
  flex-direction column
  width 100%
  height 100%
  text-align center

  &_image
    width md-result-page-image-size
    img
      width 100%
      margin-bottom 40px

  &_text
    margin 20px 20px 0
    color md-result-page-title-color
    font-size md-result-page-title-font-size

  &_subtext
    margin-top 16px
    color md-result-page-describe-color
    font-size md-result-page-describe-font-size

  &_buttons
    display flex
    .md-button
      margin 10px
</style>
