<template>
  <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-4">
    <md-notice-bar
      icon="warn"
      mode="closable"
      type="warning"
    >
      该银行3:00-12:00系统维护，请更换其他银行卡
    </md-notice-bar>
    <md-notice-bar
      icon="coupon"
      mode="link"
      type="activity"
      :style="{'margin-top': '10px'}"
    >
      福利来啦，7日免息券发放中！
    </md-notice-bar>
  </div>
</template>

<script>
import NoticeBar from 'mand-mobile/lib/notice-bar'

export default {
  components: {
    'md-notice-bar': NoticeBar,
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '样式',
  },
  'en-US': {
    title: 'Theme',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-notice-bar-4 {
  flex-direction: column;
}
.md-example-child-notice-bar-4 .md-notice-bar {
  width: 100%;
  margin-bottom: 10px;
}
</style>
