<template>
  <div class="md-activity-indicator-carousel">
    <div
      v-for="i in 3"
      class="md-activity-indicator-carousel_dot"
      :style="{
        width: `${size/2}px`,
        height: `${size/2}px`,
        marginRight: `${size/3}px`,
        backgroundColor: color
      }"
      :key="i"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'md-activity-indicator-carousel',
  props: {
    size: {
      type: Number,
      default: 30,
    },
    color: {
      type: String,
      default: '#2F86F6',
    },
  },
}

</script>

<style lang="stylus">
.md-activity-indicator-carousel
  display flex
  flex 1
  justify-content space-around
  &_dot
    height 100%
    margin-right 15px
    background #CCC
    border-radius 50%
    &:nth-child(1)
      animation md-activity-indicator-carousel-0 1s linear infinite 
    &:nth-child(2)
      animation md-activity-indicator-carousel-1 1s linear infinite 
    &:nth-child(3)
      margin 0 !important
      animation md-activity-indicator-carousel-2 1s linear infinite

@keyframes md-activity-indicator-carousel-0
  0%
    transform scale(1)
    opacity 1
  20%
    transform scale(0.95)
    opacity 0.6
  40%
    transform scale(0.85)
    opacity 0.4
  65%
    transform scale(0.85)
    opacity 0.4
  80%
    transform scale(0.95)
    opacity 0.6
  100%
    transform scale(1)
    opacity 1

@keyframes md-activity-indicator-carousel-1
  0%
    transform scale(0.85)
    opacity 0.4
  20%
    transform scale(0.95)
    opacity 0.6
  40%
    transform scale(1)
    opacity 1
  65%
    transform scale(0.95)
    opacity 0.6
  80%
    transform scale(0.85)
    opacity 0.4
  100%
    transform scale(0.85)
    opacity 0.4

@keyframes md-activity-indicator-carousel-2
  0%
    transform scale(0.85)
    opacity 0.4
  20%
    transform scale(0.85)
    opacity 0.4
  40%
    transform scale(0.95)
    opacity 0.6
  65%
    transform scale(1)
    opacity 1
  80%
    transform scale(0.95)
    opacity 0.6
  100%
    transform scale(0.85)
    opacity 0.4
</style>