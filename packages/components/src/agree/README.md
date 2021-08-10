---
title: Agree 勾选按钮
preview: {
  web: 'https://mand-mobile.github.io/mand-mobile-3/examples/#/agree',
  uni: 'https://pt-starimg.didistatic.com/static/starimg/img/kTAOn8aY471628599596228.png'
}
---

用于标记切换某种状态，如协议勾选

## 引入

```javascript
import { Agree } from 'mand-mobile'

Vue.component(Agree.name, Agree)
```

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
<!-- left wrapper -->
{{{ @/packages/components/src/agree/demo/cases/demo0.vue
{{{ @/packages/components/src/agree/demo/cases/demo2.vue
<!-- right wrapper -->
}}} @/packages/components/src/agree/demo/cases/demo1.vue
}}} @/packages/components/src/agree/demo/cases/demo3.vue
</MDDemoWrapper>

## API

### Agree Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------|------|
|value|是否选中|Boolean|`false`| |
|disabled|是否禁用|Boolean|`false`| |
|size|按钮大小|String|`md`|可选值参考组件`Icon`|

### Agree Events

#### @change(name, checked)
勾选状态发生变化事件

|属性 | 说明 | 类型 |
|----|-----|------|
|name|单选按钮名称，唯一标识|Number/String|
|checked|是否选中|Boolean|
