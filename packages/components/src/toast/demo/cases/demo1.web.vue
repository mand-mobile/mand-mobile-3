<template>
  <div class="md-example-child md-example-child-toast">
    <md-button class="button" inline small @click="showTextToast">纯文字</md-button>
    <md-button class="button" inline small @click="showSucceedToast">成功</md-button>
    <md-button class="button" inline small @click="showFailedToast">失败</md-button>
    <md-button class="button" inline small @click="showLoadingToast">载入</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'
import Toast from 'mand-mobile/lib/toast'

export default {
  name: 'toast-demo',
  components: {
    'md-button': Button,
  },
  methods: {
    showTextToast() {
      Toast.infoV('info', '一段文字')
    },
    showSucceedToast() {
      Toast.succeedV('操作成功')
    },
    showFailedToast() {
      Toast.failedV('操作失败')
    },
    showLoadingToast() {
      Toast.loadingV('加载中...')
      setTimeout(() => {
        Toast.hide()
      }, 3000)
    },
  },
}
// #region ignore
export const metaInfo = {
  platform: 'web',
  'zh-CN': {
    title: '垂直展示',
  },
  'en-US': {
    title: 'Vertical display',
  },
}
// #endregion ignore

</script>

<style scoped>
.button {
  margin: 10px;
}
</style>
