<template>
  <div class="md-example-child md-example-child-scroll-view md-example-child-scroll-view-2" disable-scroll>
    <md-scroll-view
      ref="scrollView"
      :scrolling-x="false"
      :styles="{height: '800px'}"
      @refreshing="$_onRefresh"
    >
      <md-scroll-view-refresh
        slot="refresh"
        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
        :scroll-top="scrollTop"
        :is-refreshing="isRefreshing"
        :is-refresh-active="isRefreshActive"
      ></md-scroll-view-refresh>
      <div class="scroll-view-list">
        <p 
          class="scroll-view-item" 
          v-for="i in list"
          :key="i"
        >{{randomFace(5)}}</p>
      </div>
    </md-scroll-view>
  </div>
</template>

<script>
import ScrollView from 'mand-mobile/lib/scroll-view'
import ScrollViewRefresh from 'mand-mobile/lib/scroll-view/refresh'
import randomFace from 'mand-mobile/lib/scroll-view/demo/data/faces'

export default {
  name: 'scroll-view-demo-2',
  components: {
    'md-scroll-view': ScrollView,
    'md-scroll-view-refresh': ScrollViewRefresh,
  },
  data() {
    return {
      list: 5,
      randomFace,
    }
  },
  methods: {
    $_onRefresh() {
      // async data
      setTimeout(() => {
        this.list += 5
        this.$refs.scrollView.finishRefresh()
      }, 2000)
    },
  },
}
// #region ignore
export const metaInfo = {
  'zh-CN': {
    title: '下拉刷新',
  },
  'en-US': {
    title: 'Pulldown Refreshing',
  },
}
// #endregion ignore

</script>

<style>
.md-example-child-scroll-view-2 {
  background: #FFF;
}
.md-example-child-scroll-view-2 .md-scroll-view {
  height: 800px;
}
.md-example-child-scroll-view-2 .scroll-view-item {
  padding: 30px 0;
  text-align: center;
  font-size: 42px;
  letter-spacing: 5px;
}
.md-example-child-scroll-view-2 .scroll-view-item:nth-child(2n+1) {
  background: #EFEFEF;
}
</style>