<template>
  <div class="md-example-child md-example-child-date-picker md-example-child-date-picker-1" disable-scroll>
    <md-date-picker-view
      type="time"
      :unit-text="unit"
      :minute-step="1"
    ></md-date-picker-view>
  </div>
</template>

<script>
import DatePicker from 'mand-mobile/lib/date-picker/date-picker-view'

export default {
  components: {
    'md-date-picker-view': DatePicker,
  },
  data() {
    return {
      unit: ['', '', '', "'", "''"],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '时间选择',
  },
  'en-US': {
    title: 'Time selection',
  },
}
// #endregion ignore

</script>