<template>
  <div class="md-example-child md-example-child-check md-example-child-check-1">
    <md-field title="复选项组">
    <md-check-group v-model="favorites">
      <md-check name="watermelon" label="西瓜" />
      <md-check name="apple" label="苹果" />
      <md-check name="banana" label="香蕉" />
      <md-check name="orange" label="橙子" />
      <md-check name="tomato" label="西红柿" disabled />
    </md-check-group>
    </md-field>
	</div>
</template>

<script>
import Check from 'mand-mobile/lib/check'
import Field from 'mand-mobile/lib/field'
import CheckGroup from 'mand-mobile/lib/check/group'

export default {
  components: {
    'md-check': Check,
    'md-check-group': CheckGroup,
    'md-field': Field,
  },
  data() {
    return {
      favorites: ['apple'],
    }
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '复选项组',
  },
  'en-US': {
    title: 'Check options group',
  },
}
// #endregion ignore

</script>
