<template>
  <div class="md-doc-home">
    <section class="home-block">
      <Banner class="home-banner" />
      <div class="home-text">
        <p class="home-text-h1">
          Mand Mobile <em class="number"><span>3</span></em>
        </p>
        <p class="home-text-p">
          面向金融场景，基于Vue DSL的开放式多平台兼容组件库
        </p>
        <div class="home-text-platform">
          <!-- https://pt-starimg.didistatic.com/static/starimg/img/18EeASYyou1629094156208.png -->
          <a-popover placement="bottom">
            <p class="home-text-platform-item _vue"></p>
            <template slot="content">
              Vue 2.0
            </template>
          </a-popover>
          <a-popover placement="bottom">
            <p class="home-text-platform-item _uni"></p>
            <template slot="content">
              Uniapp
            </template>
          </a-popover>
        </div>
        <div class="home-text-action">
          <router-link 
            class="home-text-action-button home-text-action-button_primary"
            to="/packages/components/development/">开始使用</router-link>
          <a class="home-text-action-button home-text-action-button_ghost" href="/mand-mobile/packages/modules/platform-builder/" target="blank">了解更多</a>
        </div>
      </div>
    </section>
    <Content />
  </div>
</template>

<script>
import Popover from 'ant-design-vue/lib/popover'
import 'ant-design-vue/lib/popover/style/index.css'

import Banner from '../components/Banner'
export default {
  components: {
    Banner,
    [Popover.name]: Popover,
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-home
  width 1000px
  margin 80px auto
  .home-block
    display inline-flex
    align-items center
    justify-content space-around
    margin-bottom 50px
    .home-banner
      float left
      width 60%
      img
        width 100%
    .home-text
      width 50%
      padding 40px
      box-sizing border-box
      overflow hidden
      p
        margin 0
        line-height 1.5
      .home-text-h1
        font-size 48px
        font-weight 700
        font-family Quicksand
        color #111A34
        .number
          position relative
          top -24px
          display inline-block
          width 54px
          height 54px
          line-height 54px
          text-align center
          border-radius 100%
          border solid 1px $accentColor
          overflow hidden
          &::before,
          &::after 
            content ""
            position absolute
            left 50%
            bottom 20%
            width 500%
            height 500%
            border-radius 45%
            background-color $accentColor
            transform translateX(-50%) // 居中
            animation rotate 15s linear infinite
          &::before
            bottom 15%
            opacity .5
            border-radius 47%
          span
            position relative
            top -8px
            z-index 2
            font-size 32px
            font-style normal
            // font-family "source-code-pro-special"
            color #fff

      .home-text-p
        font-size 18px
        font-family Quicksand
        color #666f83
    .home-text-action
      margin-top 30px
      &-button
        display inline-block
        width 140px
        height 48px
        margin-right 10px
        text-align center
        line-height 48px
        font-size 1.2em
        font-weight 500
        border-radius 24px
        box-sizing border-box
        &_primary
          background $accentColor
          border solid 1px $accentColor
          color #fff
        &_ghost
          border solid 1px $accentColor
    .home-text-platform
      margin-top 20px
      &-item
        display inline-block
        width 25px
        height 25px
        margin-right 10px !important
        padding 5px
        border-radius 4px
        box-sizing border-box
        &._vue
          background url(https://pt-starimg.didistatic.com/static/starimg/img/18EeASYyou1629094156208.png)
          background-size contain
        &._uni
          background url(https://pt-starimg.didistatic.com/static/starimg/img/CaYEZ1xDnI1629094156191.png)
          background-size contain

@keyframes rotate 
  from
    transform translateX(-50%) rotateZ(0deg)

  to
    transform translateX(-50%) rotateZ(360deg)
</style>

<style lang="stylus">
.dark
  .md-doc-home .home-block .home-text .home-text-h1
    color #f5f6f7
</style>