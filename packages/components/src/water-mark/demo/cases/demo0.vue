<template>
  <div class="md-example-child md-example-child-water-mark">
    <md-water-mark
      class="text-container"
      content="MAND MOBILE"
      spacing="5vw"
      opacity="0.5"
    >
      <p class="text">
        每个人都有属于自己的一片森林，也许我们从来不曾去过，但它一直在那里，总会在那里。迷失的人迷失了，相逢的人会再相逢。
      </p>
      <p class="text">
        希望你可以记住我，记住我这样活过，这样在你身边待过。
      </p>
      <p class="text">
        少年时我们追求激情，成熟后却迷恋平庸。在我们寻找、伤害、背离之后，还能一如既往地相信爱情，这是一种勇气。
      </p>
    </md-water-mark>
	</div>
</template>

<script>
import WaterMark from 'mand-mobile/lib/water-mark'

export default {
  components: {
    'md-water-mark': WaterMark,
  },
}

</script>

<style scoped>
.md-example-child-water-mark .text-container{
  display: block;
  padding: 32px;
  background: #FFF;
}
.md-example-child-water-mark .text{
  line-height: 1.5;
  margin-bottom: 20px;
  font-size: 24px;
  font-family: Songti SC;
  text-indent: 2em;
}
</style>