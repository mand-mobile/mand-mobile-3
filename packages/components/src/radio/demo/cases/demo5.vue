<template>
  <div class="md-example-child md-example-child-check md-example-child-check-5">
    <md-radio-group v-model="insurants">
      <md-radio-box name="self">自己</md-radio-box>
      <md-radio-box name="couple">配偶</md-radio-box>
      <md-radio-box name="parent">父母</md-radio-box>
      <md-radio-box name="child" disabled>子女</md-radio-box>
    </md-radio-group>
	</div>
</template>

<script>
import RadioBox from 'mand-mobile/lib/radio/box'
import RadioGroup from 'mand-mobile/lib/radio/group'

export default {
  components: {
    'md-radio-box': RadioBox,
    'md-radio-group': RadioGroup,
  },
  data() {
    return {
      insurants: 'self',
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '单选框组',
  },
  'en-US': {
    title: 'Radio box group',
  },
}
// #endregion ignore

</script>
