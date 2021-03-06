<template>
  <div class="md-drop-menu">
    <div class="md-drop-menu_bar">
      <template v-for="(item, index) in data">
        <div
          class="md-drop-menu_bar_item"
          :class="{
            'md-drop-menu_bar_item--active': index === activeMenuBarIndex,
            'md-drop-menu_bar_item--selected': $_checkBarItemSelect(index),
            'md-drop-menu_bar_item--disabled': item.disabled
          }"
          :key="index"
          @click="$_onBarItemClick(item, index)"
        >
          <span
            v-text="$_getBarItemText(item, index)"
          ></span>
        </div>
      </template>
    </div>
    <md-popup
      v-model="isPopupShow"
      position="top"
      isAbsolute
      prevent-scroll
      alignCenter
      :prevent-scroll-exclude="scroller"
      :styles-box="{height: '100%'}"
      @show="$_onListShow"
      @hide="$_onListHide"
      @before-hide="$_onListBeforeHide"
    >
      <div class="md-drop-menu_list">
        <md-radio-list
          v-model="selectedMenuListValue[activeMenuBarIndex]"
          :options="activeMenuListData"
          :is-slot-scope="hasSlot"
          align-center
          @change="$_onListItemClick"
        >
          <template v-slot="{ option }">
            <slot :option="option"></slot>
          </template>
        </md-radio-list>
      </div>
    </md-popup>
  </div>
</template>

<script>
import {traverse, compareObjects} from '@mand-mobile/shared/lib/util'
import Popup from '../popup'
import RadioList from '../radio/list'

export default {
  name: 'md-drop-menu',

  components: {
    'md-popup': Popup,
    'md-radio-list': RadioList,
  },

  props: {
    data: {
      type: Array,
      default() {
        return []
      },
    },
    defaultValue: {
      type: Array,
      default() {
        return []
      },
    },
  },

  data() {
    return {
      isPopupShow: false,
      selectedMenuListItem: [],
      selectedMenuListValue: [],
      selectedMenuListIndex: [],
      activeMenuBarIndex: -1,
      scroller: '',
    }
  },

  computed: {
    hasSlot() {
      return !!(this.$scopedSlots && this.$scopedSlots.default)
    },
    activeMenuListData() {
      if (this.activeMenuBarIndex < 0 || !this.data[this.activeMenuBarIndex]) {
        return []
      }

      return this.data[this.activeMenuBarIndex].options
    },
  },

  watch: {
    data(val, oldVal) {
      // Avoid  Literals
      /* istanbul ignore if  */
      if (!compareObjects(val, oldVal)) {
        this.$_initSelectedBar()
      }
    },
    defaultValue(val, oldVal) {
      /* istanbul ignore if  */
      if (!compareObjects(val, oldVal)) {
        this.$_initSelectedBar()
      }
    },
  },

  mounted() {
    this.$_initSelectedBar()
  },

  methods: {
    // MARK: private methods
    $_initSelectedBar() {
      this.selectedMenuListValue = this.defaultValue
      traverse(this.data, ['options'], (item, level, indexs) => {
        const barItemIndex = indexs[0]
        const defaultValue = this.defaultValue[barItemIndex]
        if (
          defaultValue !== undefined &&
          (item.value === defaultValue || item.text === defaultValue || item.label === defaultValue)
        ) {
          this.$set(this.selectedMenuListItem, barItemIndex, item)
          return traverse.BREAK
        }
      })
    },
    $_checkBarItemSelect(index) {
      return !!(this.selectedMenuListItem[index] !== undefined || this.defaultValue[index])
    },
    $_getBarItemText(item, index) {
      return this.selectedMenuListItem[index] !== undefined ? this.selectedMenuListItem[index].text : item.text
    },
    $_setScroller() {
      const boxer = this.$el ? this.$el.querySelector('.md-popup-box') : null
      /* istanbul ignore else */
      if (boxer && boxer.clientHeight >= this.$el.clientHeight) {
        this.scroller = '.md-drop-menu-list'
      } else {
        return ''
      }
    },

    // MARK: events handler
    $_onBarItemClick(barItem, index) {
      /* istanbul ignore if  */
      if (!barItem || barItem.disabled) {
        return
      }

      if (!this.isPopupShow) {
        this.isPopupShow = true
        this.activeMenuBarIndex = index
      } else {
        this.isPopupShow = false
      }
    },
    $_onListItemClick(listItem) {
      const activeMenuBarIndex = this.activeMenuBarIndex
      const barItem = this.data[activeMenuBarIndex]
      this.isPopupShow = false
      this.selectedMenuListValue[activeMenuBarIndex] = listItem.value
      this.$set(this.selectedMenuListItem, activeMenuBarIndex, listItem)
      this.$emit('change', barItem, listItem)
    },
    $_onListShow() {
      /* istanbul ignore next  */
      this.$_setScroller()
      this.$emit('show')
    },
    $_onListHide() {
      /* istanbul ignore next  */
      this.$emit('hide')
    },
    $_onListBeforeHide() {
      /* istanbul ignore next  */
      this.activeMenuBarIndex = -1
    },

    // MARK: public methods
    getSelectedValues() {
      return this.selectedMenuListItem
    },
    getSelectedValue(index) {
      return this.selectedMenuListItem[index]
    },
  },
}

</script>

<style lang="stylus">
.md-drop-menu
  position absolute
  z-index md-drop-menu-zindex
  top 0
  left 0
  right 0
  height 100%
  box-sizing border-box
  color md-color-text-minor
  font-size md-drop-menu-font-size
  font-weight md-drop-menu-font-weight  
.md-drop-menu_bar
  position relative
  z-index md-drop-menu-zindex
  display flex
  height md-drop-menu-height
  background md-drop-menu-bar-bg
  hairline(bottom, md-drop-menu-bar-border-color)
  &_item
    display flex
    flex 1
    margin 2% 0
    align-items center
    justify-content center
    span
      position relative
      padding-right 30px
      &:after
        content ""
        position absolute
        right 0
        top 50%
        width 0
        height 0
        margin-top -4px
        border-left solid 8px transparent
        border-right solid 8px transparent
        border-top solid 9px md-color-border-element
        transition transform .3s ease-in-out-quint
    &--active
      color md-drop-menu-color
      span:after
        transform rotate(180deg)
        border-top-color md-drop-menu-color
    &--selected
      color md-drop-menu-color
    &--disabled
      opacity md-drop-menu-disabled-opacity
.md-drop-menu_list
  width 100%
  padding-top md-drop-menu-height
  background md-drop-menu-list-bg
  box-sizing border-box
  .md-radio-item
    font-weight md-font-weight-normal
    &--is-selected .md-cell-item_title
      color md-color-primary
</style>
