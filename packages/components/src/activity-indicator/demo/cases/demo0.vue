<template>
  <div class="md-example-child md-example-child-activity-indicator md-example-child-activity-indicator-0">
    <md-activity-indicator
      class="md-activity-indicator"
      :size="20"
      :text-size="16"
    >加载中...</md-activity-indicator>
    <md-activity-indicator
      class="md-activity-indicator"
      :size="20"
      :text-size="16"
      vertical
    >vertical loading</md-activity-indicator>
  </div>
</template>

<script>
import ActivityIndicator from 'mand-mobile/lib/activity-indicator'

export default {
  components: {
    'md-activity-indicator': ActivityIndicator,
  },
}
// #region ignore
export const metaInfo = {
  title: 'Roller',
}
// #endregion ignore

</script>

<style>
.md-example-child-activity-indicator-0 {
  display: flex;
  flex-direction: column;
  align-items: center;
}
  
.md-example-child-activity-indicator-0 .md-activity-indicator {
  margin-bottom: 30px;
}

.activity-indicator .md-activity-indicator_svg {
  width: 60px !important;
  height: 60px !important;
}
      
.activity-indicator .md-activity-indicator-text {
  font-size: 32px;
}
</style>