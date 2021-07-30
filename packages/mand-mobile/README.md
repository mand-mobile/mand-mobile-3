# `mand-mobile@3.0`

## Docs

目前API整体和[mand-mobile v2.0](https://didi.github.io/mand-mobile/#/zh-CN/home)保持一致

## 引用

### Web

以button为例
```js
<template>
  <div class="md-example-child md-example-child-button md-example-child-button-0">
    <md-button class="md-button" type="default">Default</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/web/lib/button'

export default {
  name: 'button-demo',
  components: {
    'md-button': Button,
  },
}

</script>

<style lang="stylus" scoped>
.md-button
  display block
  margin-bottom 16px
</style>
```

### Uni



以button为例

:warning: uni会基于vue的模板语法自己实现loader， 不支持以注册组件的时候通过 [Component.name]: Components方式注册组件，开发者需要指定在当前组件下引入的组件名称
```js
<template>
  <div class="md-example-child md-example-child-button md-example-child-button-0">
    <md-button class="md-button" type="default">Default</md-button>
  </div>
</template>

<script>
import Button from 'mand-mobile/uni/lib/button'

export default {
  name: 'button-demo',
  components: {
    'md-button': Button, // 不支持以 [Button.name]: Button获取组件
  },
}

</script>

<style lang="stylus" scoped>
.md-button
  display block
  margin-bottom 16px
</style>
```


