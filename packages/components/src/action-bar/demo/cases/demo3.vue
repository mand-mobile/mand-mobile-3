<template>
  <div class="md-example-child md-example-child-action-bar md-example-child-action-bar-3">
    <md-action-bar :actions="data" @click="onBtnClick">
      <span class="price">
        &yen;128.00<small>起</small>
      </span>
    </md-action-bar>
  </div>
</template>

<script>
import ActionBar from 'mand-mobile/lib/action-bar'
import Dialog from 'mand-mobile/lib/dialog'

export default {
  components: {
    'md-action-bar': ActionBar,
  },
  data() {
    return {
      data: [
        {
          text: '主要按钮',
          round: true,
        },
      ],
    }
  },
  methods: {
    onBtnClick(event, action) {
      this.$set(action, 'loading', true)
      this.$set(action, 'inactive', true)
      Dialog.alert({
        content: `${action.text}点击`,
        onConfirm: () => {
          this.$set(action, 'loading', false)
          this.$set(action, 'inactive', false)
        },
      })
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '使用插槽',
  },
  'en-US': {
    title: 'With slots',
  },
}
// #endregion ignore

</script>

<style scoped>
.price {
  display: flex;
  align-items: baseline;
  font-weight: 500;
  font-size: 48px;
  color: #FF823A;
}
  
.price small {
  margin-left: 10px;
  font-size: 32px;
  color: #858B9C;
}
</style>

