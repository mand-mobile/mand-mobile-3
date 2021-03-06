<template>
  <div class="md-date-picker">
    <md-popup
      ref="popup"
      class="inner-popup"
      v-model="isPickerShow"
      position="bottom"
      :mask-closable="maskClosable"
      @beforeShow="$_onPickerBeforeShow"
      @show="$_onPickerShow"
      @hide="$_onPickerHide"
      @maskClick="$_onPickerCancel"
    >
      <md-popup-title-bar
        :title="title"
        :describe="describe"
        :ok-text="okText"
        :cancel-text="cancelText"
        @confirm="$_onPickerConfirm"
        @cancel="$_onPickerCancel"
      ></md-popup-title-bar>
      <md-date-picker-view
        ref="datePickerView"
        :type="type"
        :custom-types="customTypes"
        :min-date="minDate"
        :max-date="maxDate"
        :default-date="cacheSelectedDate || defaultDate"
        :minute-step="minuteStep"
        :unit-text="unitText"
        :today-text="todayText"
        :text-render="textRender"
        :is-immediate-init="false"
        @initialed="$_onPickerInitialed"
        @change="$_onPickerChange"
      ></md-date-picker-view>
      <div class="md-date-picker-footer"></div>
    </md-popup>
  </div>
</template>

<script>
import {createProxyApiMixin} from '@mand-mobile/shared/lib/mixin/proxy'

import Popup from '../popup'
import PopTitleBar from '../popup/title-bar'
import pickerMixin from '../picker/mixins'

import DatePickerView from './date-picker-view'
import datePickerMixin from './mixin'
// import {
//   toObject,
//   toArray,
//   warn
// } from '@mand-mobile/shared/lib/util'

export default {
  name: 'md-date-picker',

  mixins: [
    createProxyApiMixin({
      datePickerView: [
        'getColumnContext',
        'getColumnValue',
        'getColumnValues',
        'getColumnIndex',
        'getColumnIndexs',
        'getFormatDate',
        'setColumnValues',
        'refresh',
      ],
    }),
    pickerMixin,
    datePickerMixin,
  ],

  components: {
    'md-popup': Popup,
    'md-popup-title-bar': PopTitleBar,
    'md-date-picker-view': DatePickerView,
  },

  data() {
    return {
      isPickerShow: false,
      cacheSelectedDate: null,
    }
  },

  watch: {
    value(val) {
      this.isPickerShow = val
      val && this.$_initPicker()
    },
    isPickerShow(val) {
      if (!val) {
        this.$emit('input', val)
      }
    },
  },

  // mounted () {
  //   this.$_initPicker()
  // },

  methods: {
    // MARK: private methods
    $_initPicker() {
      if (this.value) {
        this.isPickerShow = this.value
      }
    },
    $_refreshPicker() {
      if (!this.$refs.datePickerView) {
        return
      }
      const pickerColumn = this.getColumnContext()
      /* istanbul ignore next */
      if (!pickerColumn.isScrollInitialed) {
        setTimeout(() => {
          pickerColumn.refresh()
        }, 0)
      }
    },
    $_cacheSelectedDate() {
      this.cacheSelectedDate = this.getFormatDate()
    },

    $_onPickerInitialed() {
      this.$emit('initialed')
    },
    $_onPickerConfirm() {
      const pickerColumn = this.getColumnContext()
      const columnValues = pickerColumn.getColumnValues()
      // const columnIndexs = pickerColumn.getColumnIndexs()
      const isScrolling = pickerColumn.wheels.some(wheel => {
        return wheel.scroller.pending
      })
      if (!isScrolling) {
        this.isPickerShow = false
        this.$nextTick(() => {
          this.$_cacheSelectedDate()
        })
        this.$emit('confirm', columnValues)
      }
    },
    $_onPickerCancel() {
      this.isPickerShow = false
      this.$emit('cancel')

      // reset picker by snapshot
      this.$nextTick(() => {
        this.refresh()
      })
    },
    $_onPickerChange(columnIndex, itemIndex, values) {
      this.$emit('change', columnIndex, itemIndex, values)
    },
    $_onPickerBeforeShow() {
      this.$_refreshPicker()
    },
    $_onPickerHide() {
      this.$emit('hide')
    },
    $_onPickerShow() {
      this.$_refreshPicker()
      this.$emit('show')
    },
  },
}

</script>

<style lang="stylus">
.md-date-picker-footer
  padding-bottom constant(safe-area-inset-bottom)
  padding-bottom env(safe-area-inset-bottom)
  background md-color-bg-inverse
</style>