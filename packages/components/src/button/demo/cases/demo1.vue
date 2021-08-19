<template>
  <div class="md-example-child md-example-child-button md-example-child-button-1">
    <md-button class="md-button" type="default" plain>Default & Plain</md-button>
    <md-button class="md-button" type="primary" plain>Primary & Plain</md-button>
    <md-button class="md-button" type="warning" plain>Warning & Plain</md-button>
    <md-button class="md-button" type="disabled" plain>Disabled & Plain</md-button>
    <md-button class="md-button" type="primary" plain round>Primary & Plain & Round</md-button>
    <md-button class="md-button" type="primary" plain round loading="carousel">Primary & Plain & Loading</md-button>
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
  title: '线性按钮',
}
// #endregion ignore

</script>

<style>
.md-example-child-button-1 .md-button {
  display: block;
  margin-bottom: 16px;
} 
</style>
