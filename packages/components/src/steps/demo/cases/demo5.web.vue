<template>
  <div class="md-example-child md-example-child-steps md-example-child-steps-5">
    <md-steps :steps="steps" :current="currentStep"></md-steps>
  </div>
</template>

<script>
import Steps from 'mand-mobile/lib/steps'

export default {
  components: {
    'md-steps': Steps,
  },
  data() {
    return {
      steps: [
        {
          name: '登录',
        },
        {
          name: '开通',
        },
        {
          name: '验证',
        },
        {
          name: '成功',
        },
      ],
      currentStep: 1,
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '利用current类增加自定义样式',
  },
  'en-US': {
    title: 'Add custom styles through by class named "current"',
  },
}
// #endregion ignore

</script>

<style lang="stylus">
.md-example-child-steps-5
  height 140px
  padding 0 30px
  .md-steps .icon.current::before
    content ''
    color color-primary-tap
    border-bottom 10px solid
    border-left 10px solid transparent
    border-right 10px solid transparent
    position absolute
    top 130px
</style>
