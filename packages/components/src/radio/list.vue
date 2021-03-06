<template>
  <div
    class="md-radio-list"
    :class="{ 'md-radio-list--is-align-center': alignCenter }"
  >
    <md-cell-item
      v-for="(item, index) in options"
      :key="item.value"
      class="md-radio-item"
      :class="{
        'md-radio-item--is-selected': selectedValue === item.value && !inputSelected,
      }"
      :title="hasSlot.default ? '' : (item.text || item.label)"
      :brief="hasSlot.default ? '' : item.brief"
      :active="isTitleActive && selectedValue === item.value && !inputSelected"
      :disabled="item.disabled"
      :align-center="alignCenter"
      :no-border="index === options.length - 1"
      :children-slots="hasSlot"
      @click="$_select(item, index)"
    >
      <template v-if="hasSlot.default">
        <slot :option="item" :index="index" :selected="currentValue === item.value"/>
      </template>
      <template #right>
        <md-radio
          v-if="hasSlot.right"
          class="md-radio right"
          :name="item.value"
          v-model="selectedValue"
          :disabled="item.disabled"
          :size="iconSize"
          :icon="icon"
          :icon-inverse="iconInverse"
          :icon-disabled="iconDisabled"
          :icon-svg="iconSvg"
        />
      </template>
      <template #left>
        <md-radio
          v-if="hasSlot.left"
          class="md-radio left"
          :name="item.value"
          v-model="selectedValue"
          :disabled="item.disabled"
          :size="iconSize"
          :icon="icon"
          :icon-inverse="iconInverse"
          :icon-disabled="iconDisabled"
          :icon-svg="iconSvg"
        />
      </template>
    </md-cell-item>
    <md-input-item
      v-if="hasInput"
      ref="inputItem"
      class="md-radio-item"
      :class="{
        'md-radio-item--is-selected': inputSelected,
      }"
      :title="inputLabel"
      :placeholder="inputPlaceholder"
      v-model="inputValue"
      @focus="inputSelected = true"
    />
  </div>
</template>

<script>
import Radio from '../radio'
import Field from '../field'
import CellItem from '../cell-item'
import InputItem from '../input-item'
import radioMixin from './mixins'

export default {
  name: 'md-radio-list',

  mixins: [radioMixin],

  components: {
    'md-radio': Radio,
    'md-field': Field,
    'md-cell-item': CellItem,
    'md-input-item': InputItem,
  },

  props: {
    options: {
      type: Array,
      default() {
        /* istanbul ignore next */
        return []
      },
    },
    value: {
      default: '',
    },
    hasInput: {
      type: Boolean,
      default: false,
    },
    inputLabel: {
      type: String,
      default: '',
    },
    inputPlaceholder: {
      type: String,
      default: '',
    },
    alignCenter: {
      type: Boolean,
      default: false,
    },
    isSlotScope: {
      type: Boolean,
      default: undefined,
    },
    isTitleActive: {
      type: Boolean,
      default: false,
    },
    // Mixin Props
    // icon: {
    //   type: String,
    //   default: 'checked',
    // },
    // iconInverse: {
    //   type: String,
    //   default: 'check',
    // },
    // iconDisabled: {
    //   type: String,
    //   default: 'check-disabled',
    // },
    // iconSvg: {
    //   type: Boolean,
    //   default: false,
    // },
    // iconSize: {
    //   type: String,
    //   default: 'md',
    // },
    // iconPosition: {
    //   type: String,
    //   default: 'left',
    // },
  },

  data() {
    return {
      selectedValue: this.value,
      inputSelected: false,
      inputValue: '',
    }
  },

  computed: {
    currentValue() {
      if (this.inputSelected) {
        return this.inputValue
      } else {
        return this.selectedValue
      }
    },
    hasSlot() {
      const hasIcon = !this.alignCenter && !this.inputSelected && !this.withoutIcon
      return {
        default: this.isSlotScope !== undefined ? this.isSlotScope : !!this.$scopedSlots.default,
        left: hasIcon && this.iconPosition === 'left',
        right: hasIcon && this.iconPosition === 'right',
      }
    },
    withoutIcon() {
      return this.isSlotScope && !this.icon
    },
  },

  watch: {
    value(val) {
      if (val !== this.selectedValue) {
        this.selectedValue = val
      }
    },
    currentValue(val) {
      this.$emit('input', val)
    },
  },

  methods: {
    // MARK: private methods
    $_select(option, index) {
      this.selectedValue = option.value
      this.inputSelected = false
      this.inputValue && (this.inputValue = '')
      this.$emit('change', option, index)
    },
    // MARK: public methods
    select(value) {
      this.selectedValue = value
      this.inputSelected = false
    },
    selectByIndex(index) {
      const item = this.options[index]
      if (item) {
        this.select(item.value)
      }
    },
  },
}

</script>

<style lang="stylus">
.md-radio-item
  .md-radio
    margin-top 0
    margin-bottom 0

.md-radio-list
  .md-cell-item_body--multilines .md-cell-item_title
    font-weight font-weight-medium
  &--is-align-center
    .md-cell-item_content
      text-align center
    .md-cell-item_left,
    .md-cell-item_right
      display none
</style>

