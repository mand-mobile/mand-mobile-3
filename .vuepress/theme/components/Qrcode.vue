<template>
  <div class="md-doc-qrcode">
    <a-popover placement="bottom">
      <a-icon type="qrcode" />
      <template slot="content">
        <div class="md-doc-qrcode_platform">
          <section class="md-doc-qrcode_platform_item" v-for="item in qrcodeItems" :key="item">
            <p class="md-doc-qrcode_platform_item_title">{{item}}</p>
            <qriously class="md-doc-qrcode_platform_item_img" v-if="item === 'web'" :value="qrcode[item]" :size="100"/>
            <img v-else class="md-doc-qrcode_platform_item_img" :src="qrcode[item]"/>
          </section>
        </div>
      </template>
    </a-popover>
  </div>
</template>

<script>
import Vue from 'vue'
import VueQriously from 'vue-qriously'
import Icon from 'ant-design-vue/lib/icon'
import Popover from 'ant-design-vue/lib/popover'
import 'ant-design-vue/lib/popover/style/index.css'
// console.log(VueQrcode)
Vue.use(VueQriously)
export default {
  components: {
    [Icon.name]: Icon,
    [Popover.name]: Popover,
    // VueQriously
  },
  props: ['qrcode'],
  computed: {
    qrcodeItems () {
      return Object.keys(this.qrcode || [])
    }
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-qrcode
  display inline-flex
  width 2em
  height 2em
  margin-right 1em
  border-radius 1em
  background #000
  align-items center
  justify-content center
  font-size 14px
  transition all .3s
  .anticon-qrcode
    color #FFF
  &:hover
    opacity .6
  &_platform
    display flex
    &_item
      padding 1em 2em
      text-align center
      &_title
        font-size 18px
      &_img
        display flex
        align-items center
        justify-content center
        width 8em
        height 8em
</style>
