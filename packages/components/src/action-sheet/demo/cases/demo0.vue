<template>
  <div class="md-example-child md-example-child-action-sheet-0">
    <md-button @click="$_showActionSheet">唤起动作面板</md-button>
    <md-action-sheet
      v-model="value"
      :title="title"
      :default-index="defaultIndex"
      :invalid-index="invalidIndex"
      :cancel-text="cancelText"
      :options="options"
      @selected="$_selected"
      @cancel="$_cancel"
    ></md-action-sheet>
  </div>
</template>

<script>
import ActionSheet from 'mand-mobile/lib/action-sheet/action-sheet'
import Button from 'mand-mobile/lib/button'
import Dialog from 'mand-mobile/lib/dialog'

export default {
  components: {
    'md-action-sheet': ActionSheet,
    'md-button': Button,
  },
  data() {
    return {
      value: false,
      title: '操作说明的标题',
      options: [
        {
          label: '选项1',
          value: 0,
        },
        {
          label: '选项2',
          value: 1,
        },
        {
          label: '选项3',
          value: 2,
        },
      ],
      defaultIndex: 1,
      invalidIndex: 2,
      cancelText: '取消',
    }
  },
  methods: {
    $_showActionSheet() {
      this.value = true
    },
    $_selected(item) {
      Dialog.alert({
        content: `selected: ${JSON.stringify(item)}`,
      })
    },
    $_cancel() {
      Dialog.alert({
        content: 'cancel',
      })
    },
  },
}
// #region ignore
export const metaInfo = {
  height: 500,
}
// #endregion ignore

</script>
