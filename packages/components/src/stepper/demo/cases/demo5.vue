<template>
  <div class="md-example-child md-example-child-stepper md-example-child-stepper-5">
    <md-field>
      <md-field-item title="step为小数1.3">
        <md-stepper slot="right" :step="1.3" />
      </md-field-item>
    </md-field>
  </div>
</template>

<script>
import Stepper from 'mand-mobile/lib/stepper'
import Field from 'mand-mobile/lib/field/index'
import FieldItem from 'mand-mobile/lib/field/item'

export default {
  components: {
    'md-stepper': Stepper,
    'md-field': Field,
    'md-field-item': FieldItem,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: 'step为小数1.3',
  },
  'en-US': {
    title: 'Step is a decimal, 1.3',
  },
}
// #endregion ignore

</script>
