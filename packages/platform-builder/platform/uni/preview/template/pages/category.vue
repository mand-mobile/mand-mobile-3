<template>
  <div class="md-cg">
    <h1 class="md-cg-title">Mand Mobile@3</h1>
    <h1 class="md-cg-subtitle">基于Vue DSL兼容多平台，面向金融场景的组件库（微信小程序版）</h1>
    <!-- <div class="md-cg-logo">
      <img src="//img6.didistatic.com/static/manhattan/mand/docs/mand-logo-black.svg" alt="">
    </div> -->
    <div>
      <section
        v-for="(category, i) in components" :key="i"
        class="cg-category"
        :class="{'active': category.show}">
        <div
          class="cg-category-title"
          :class="{'active': category.show}"
          @click="toggleCategory(i, category)">
          {{ category.name }}&nbsp;&nbsp;<span>{{ category.text }}</span>
          <md-icon class="md-icon" name="arrow" size="md"></md-icon>
        </div>
        <transition name="slide-fade">
          <div class="cg-category-list" v-show="category.show">
            <div class="cg-category-item"
              v-for="(item, j) in category.list"
              :key="j"
              @click="goToComponent(category.category, item.path)">
              <div class="cg-category-item-inner">
                {{ item.name }} - {{ item.text }}
                <md-icon class="md-icon" name="arrow" size="sm"></md-icon>
              </div>
            </div>
            <div class="cg-category-item" @click="toggleCategory(i, category)">
              <div class="cg-category-item-inner close">收起</div>
            </div>
          </div>
        </transition>
      </section>
    </div>
    <h1 class="md-cg-copyright">滴滴金融 - FD+ &times; MFE</h1>
  </div>
</template>

<script>
import components from '../components.json'
import Icon from '@mand-mobile/components/src/icon'

export default {
  name: 'category',
  components: {
    'md-icon': Icon,
  },
  data() {
    return {
      components,
    }
  },
  methods: {
    toggleCategory(index, category) {
      category.show = !category.show
      this.$set(this.components, index, category)
    },
    goToComponent(category, path) {
      // this.$router.push(path)
      wx.navigateTo({
        url: `/${category}/pages${path}`
      })
    },
  },
}

</script>

<style lang="stylus" scoped>
block()
  float left
  width 100%
.md-cg
  padding 20px 32px 50px
  clearfix()
  .md-cg-title
    block()
    margin 20px 0
    font-size md-font-heading-large
    // font-weight md-font-weight-normal
    font-family DINAlternate-Bold
    color md-color-text-base
    text-align center
    span
      color md-color-text-base
  .md-cg-subtitle
    block()
    margin-bottom 30px
    font-size 18px
    font-weight 300
    color md-color-text-minor
    text-align center
  .md-cg-logo
    position fixed
    top -.3rem
    right -.3rem
    width 2rem
    height 2rem
    opacity .05
    z-index -1
    img
      width 100%
  .cg-category
    block()
    position relative
    z-index 3
    height 120px
    margin-bottom 20px
    border-radius 12px
    transform translate(0, 0)
    // overflow hidden
    &.active
      height auto
    // box-shadow shadow-bottom
    .cg-category-title
      position relative
      z-index 2
      block()
      display flex
      justify-content space-between
      height 120px
      padding 0 90px 0 md-h-gap-lg
      line-height 120px
      font-size 36px
      font-family DINAlternate-Bold
      // font-weight font-weight-medium
      color md-color-text-base
      box-sizing border-box
      box-shadow 0 2px 4px rgba(0, 0, 0, .08)
      background md-color-bg-base
      // overflow hidden
      span
        font-size md-font-body-large
        color md-color-text-minor
      .md-icon
        position absolute
        right md-h-gap-lg
        top 50%
        transform translateY(-50%)
        transition transform .3s ease-in-out-quint
      &.active .md-icon
          transform translateY(-50%) rotate(90deg)
      &:before
        content ""
        position absolute
        left -4px
        top 15%
        width 12px
        height 70%
        border-radius 12px
        // display none
    &:nth-of-type(1) .cg-category-title:before
      background #5E83DD
    &:nth-of-type(2) .cg-category-title:before
      background #83D23A
    &:nth-of-type(3) .cg-category-title:before
      background #FF7A2E
    &:nth-of-type(4) .cg-category-title:before
      background #FFC013
    &:nth-of-type(5) .cg-category-title:before
      background #FF525D
    .cg-category-list
      block()
      background #FCFCFC
      box-shadow 0 2px 4px rgba(0, 0, 0, .08)
      .cg-category-item
        block()
        padding 0 md-h-gap-lg
        box-sizing border-box
        -webkit-tap-highlight-color transparent
        .cg-category-item-inner
          position relative
          block()
          height 100px
          line-height 100px
          font-size md-font-body-normal
          font-family DINAlternate-Bold
          color md-color-text-minor
          hairline(bottom, md-color-border-base)
          .md-icon
            position absolute
            right 0
            top 50%
            line-height 32px
            transform translateY(-50%)
          &.close
            text-align center
            color md-color-text-link
            &:before
              display none


  .md-cg-copyright
    position fixed
    left 0
    bottom 20px
    width 100%
    text-align center
    font-size md-font-minor-normal
    font-weight 300
    color md-color-text-caption

.slide-fade-enter-active
  transition all .3s ease
.slide-fade-leave-active
  transition all .3s ease
.slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */
  transform translate3d(0, -10px, 0)
  opacity 0
.slide-fade-leave-to
  opacity 0
</style>
