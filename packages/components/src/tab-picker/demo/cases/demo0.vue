<template>
  <div class="md-example-child md-example-child-tab-picker md-example-child-tab-picker-0">
    <md-field title="地址">
      <md-field-item
        title="联系地址"
        arrow="arrow-right"
        @click="show = !show"
        placeholder="请选择联系地址"
        :content="addressStr"
        solid
      />
    </md-field>
    <md-tab-picker
      title="请选择"
      describe="请选择您所在的省份、城市、区县"
      :data="data"
      v-model="show"
      @change="handleChange"
    />
  </div>
</template>

<script>
import Field from 'mand-mobile/lib/field'
import FieldItem from 'mand-mobile/lib/field/item'
import TabPicker from 'mand-mobile/lib/tab-picker'
import data from 'mand-mobile/lib/tab-picker/demo/data'

export default {
  name: 'tab-bar-demo',
  components: {
    'md-tab-picker': TabPicker,
    'md-field': Field,
    'md-field-item': FieldItem,
  },
  data() {
    return {
      show: false,
      address: [],
      data: data,
    }
  },
  computed: {
    addressStr() {
      return this.address.map(item => item.label).join(' ')
    },
  },
  methods: {
    handleChange({options}) {
      this.address = options
    },
  },
}

</script>
