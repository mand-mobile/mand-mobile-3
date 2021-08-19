<template>
  <div class="md-example-child md-example-child-button md-example-child-button-2">
    <md-button class="md-button" type="default" round>Default & Round</md-button>
    <md-button class="md-button" type="primary" round>Primary & Round</md-button>
    <md-button class="md-button" type="warning" round>Warning & Round</md-button>
    <md-button class="md-button" type="disabled" round>Disabled & Round</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/lib/button'

export default {
  components: {
    'md-button': Button,
  },
}
// #region ignore
export const metaInfo = {
  title: '圆角按钮',
}
// #endregion ignore

</script>

<style>
.md-example-child-button-2 .md-button {
  display: block;
  margin-bottom: 16px;
} 
</style>
