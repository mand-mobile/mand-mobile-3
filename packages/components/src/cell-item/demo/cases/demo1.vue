<template>
  <div class="md-example-child md-example-child-cell-item md-example-child-cell-item-1">
    <md-field>
      <md-cell-item title="余额" addon="可用8000.34" arrow />
      <md-cell-item title="余额" addon="可用8000.34" />
      <md-cell-item title="使用余额">
        <md-switch slot="right" v-model="open" />
      </md-cell-item>
      <md-cell-item title="使用余额" disabled>
        <md-switch slot="right" :value="true" disabled/>
      </md-cell-item>
      <md-cell-item title="余额" addon="可用8000.34" arrow no-border>
        <div class="holder" slot="left"></div>
      </md-cell-item>
    </md-field>
  </div>
</template>

<script>
import Switch from 'mand-mobile/lib/switch'
import Field from 'mand-mobile/lib/field'
import CellItem from 'mand-mobile/lib/cell-item'

export default {
  components: {
    'md-field': Field,
    'md-cell-item': CellItem,
    'md-switch': Switch,
  },
  data() {
    return {
      open: false,
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '单行列表',
  },
  'en-US': {
    title: 'Simple List',
  },
}
// #endregion ignore

</script>

<style scoped>
.holder {
  display: block;
  width: 48px;
  height: 48px;
  background-color: #E6E6E6;
}
</style>
