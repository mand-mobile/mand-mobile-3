<template>
  <div class="md-example-child md-example-child-agree md-example-child-2">
    <md-agree
      v-model="agreeConf.checked"
      :disabled="agreeConf.disabled"
      :size="agreeConf.size"
      @change="onChange(agreeConf.name, agreeConf.checked, $event)"
    >
      本人承诺投保人已充分了解本保险产品，并保证投保信息的真实性，理解并同意
    </md-agree>
	</div>
</template>

<script>
import Agree from 'mand-mobile/lib/agree'

export default {
  components: {
    'md-agree': Agree,
  },
  data() {
    return {
      agreeConf: {
        checked: true,
        name: 'agree2',
        size: 'md',
        disabled: true,
        introduction: '选中不可用状态',
      },
    }
  },
  methods: {
    onChange(name, checked) {
      // eslint-disable-next-line no-console
      console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '选中不可用状态',
  },
  'en-US': {
    title: 'Disabled & selected',
  },
  height: 120,
}
// #endregion ignore

</script>
