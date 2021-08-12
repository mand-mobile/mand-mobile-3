<template>
  <div class="md-doc-header">
    <a :href="$site.base" class="md-doc-header_aside">
      <img class="md-doc-header_aside_logo" :src="$site.themeConfig.logo" alt="logo">
      <div class="">
        <p class="md-doc-header_aside_title" v-text="$site.title"></p>
        <p class="md-doc-header_aside_desc">一直有被salute，但是从未被超越</p>
      </div>
    </a>
    <SearchBox class="md-doc-header_search"/>
    <NavBar v-bind="{ navItems }" />
    <!-- <VersionBox /> -->
    <a-switch
      v-model="isSwitchChecked"
      checked-children="🌝"
      un-checked-children="🌛"
    ></a-switch>
  </div>
</template>

<script>
import Switch from 'ant-design-vue/lib/switch'

import SearchBox from '@SearchBox'
import NavBar from './NavBar'
import VersionBox from './VersionBox'
import { resolveNavItems } from '../util'

import 'ant-design-vue/lib/switch/style/index.css'

export default {
  components: {
    [Switch.name]: Switch,
    NavBar,
    // VersionBox,
    SearchBox
  },
  data () {
    return {
      isSwitchChecked: false
    }
  },
  inject: ['siteConfig'],
  computed: {
    navItems () {
      return resolveNavItems(this.$site, this.$localePath)
    }
  },
  watch: {
    isSwitchChecked (val) {
      this.changeTheme(val ? 'light' : 'dark')
    }
  },
  mounted () {
    const theme = this.changeTheme()
    this.isSwitchChecked = theme === 'light'
  },
  methods: {
    changeTheme (theme) {
      const localStorage = window.localStorage
      theme = theme || localStorage['MAND_MOBILE_NEXT_THEME']

      if (theme) {
        localStorage['MAND_MOBILE_NEXT_THEME'] = theme
        this.$emit('theme', theme)
      }

      return theme
    },
  }
}
</script>

<style lang="stylus" scoped>
.md-doc-header
  position relative
  // z-index 2
  display flex
  align-items center
  height 4em
  margin-bottom 2em
  padding 0 2.5em
  // border-bottom 1px solid #f0f1f2
  &_aside
    display flex
    align-items center
    width 16.666%
    height 100%
    box-sizing border-box
    &_logo
      display inline-block
      margin-right .8em
      width auto
      height 2.8em
      border solid 1px #FFF
      border-radius 50%
      box-sizing border-box
      transition all .3s
    &_title
      display inline-flex
      flex-direction column
      justify-content center
      height 100%
      margin 0
      color #333
      font-size 1.6em
      font-weight 700
      font-family Quicksand,DINAlternate-Bold,AvenirNext-Medium,Microsoft Yahei,Lato,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Verdana,Tahoma,sans-serif
      line-height 1
    &_desc
      font-size 10px
      letter-spacing 1.5px
      color #999
      line-height 1
      margin 2px 0 0
      zoom 0.8
  /deep/.search-box
    display flex
    align-items center
    input
      width 15em
      border-color #E2E4EA
    .suggestions
      top 3.2em
      border none
      box-shadow 0 2px 10px rgba(0, 0, 0, .08)
      z-index 3
      .suggestion
        font-size .9em

@media (max-width: 1500px)
  .md-doc-header_aside_logo
    height 1.8em
  .md-doc-header_aside_title
    font-size 1em
@media (max-width: 1000px)
  .md-doc-header_aside
    width 36%
    padding-left 1.5em
  .md-doc-header_aside_title
    display none
  /deep/.md-doc-nav-bar
    display none
  /deep/.search-box
    margin-left auto
    margin-right 1.5em
    input
      width 12em !important
      left 0 !important
</style>

<style lang="stylus">
.dark
  .md-doc-header_aside_title
    color #f5f6f7
  .md-doc-header_search
    input
      color #f5f6f7
      background-color #2f495e
  .ant-switch
    background #2f495e
    &::after
      background $accentColor
</style>