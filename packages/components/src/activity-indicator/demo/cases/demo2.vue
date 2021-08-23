<template>
  <div class="md-example-child md-example-child-activity-indicator md-example-child-activity-indicator-2">
    <md-activity-indicator
      type="carousel"
      :size="15"
    ></md-activity-indicator>
    <md-button class="md-button" type="primary" size="small" @click="createPay">
      <md-activity-indicator
        v-if="loading"
        type="carousel"
        :size="8"
        color="#fff"
        text-color="#fff"
      ></md-activity-indicator>
      <span v-else>确认支付</span>
    </md-button>
	</div>
</template>

<script>
import ActivityIndicator from 'mand-mobile/lib/activity-indicator'
import Button from 'mand-mobile/lib/button'

export default {
  components: {
    'md-activity-indicator': ActivityIndicator,
    'md-button': Button,
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    createPay() {
      if (this.loading) {
        return
      }
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 3000)
    },
  },
}
// #region ignore
export const metaInfo = {
  title: 'Carousel',
}
// #endregion ignore

</script>

<style lang="stylus">
.md-example-child-activity-indicator-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
    
.md-example-child-activity-indicator-2 .md-button {
  width: 100%;
  margin-top: 30px;
}

</style>