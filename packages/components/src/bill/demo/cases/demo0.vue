<template>
  <div class="md-example-child md-example-child-bill-0">
    <md-bill
      title="借款电子票据"
      no="12345689"
      water-mark="MAND-MOBILE"
    >
      <md-detail-item title="借款金额">
        &yen;30,000
      </md-detail-item>
      <md-detail-item title="收款账户">招商银行(尾号xxxx)</md-detail-item>
      <md-detail-item title="借款期数" content="12期" />
      <md-detail-item title="正常还款总息">
        &yen;140.50
      </md-detail-item>
      <md-detail-item title="还款">
        <md-tag
          size="small"
          shape="fillet"
          type="fill"
          fill-color="#858B9C"
          style="margin-right:4px;"
        >首次</md-tag>
        &yen;404.50&nbsp;(9月22日)
      </md-detail-item>
    </md-bill>
	</div>
</template>

<script>
import Bill from 'mand-mobile/lib/bill'
import DetailItem from 'mand-mobile/lib/detail-item'
import Tag from 'mand-mobile/lib/tag'

export default {
  components: {
    'md-bill': Bill,
    'md-detail-item': DetailItem,
    'md-tag': Tag,
  },
}

</script>

<style scoped>
.md-example-child-bill-0 {
  border: solid 1px #ccc;
}
</style>