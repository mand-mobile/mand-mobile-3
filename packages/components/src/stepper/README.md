---
title: Stepper 步进器
preview: {
  web: 'https://mand-mobile.github.io/mand-mobile-3/examples/#/stepper',
  uni: 'https://pt-starimg.didistatic.com/static/starimg/img/c88uedQvpV1628597688551.png'
}
---

增加，减少或修改当前数值

## 引入

```javascript
import { Stepper } from 'mand-mobile'

Vue.component(Stepper.name, Stepper)
```

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
{{{ @/packages/components/src/stepper/demo/cases/demo0.vue
}}} @/packages/components/src/stepper/demo/cases/demo1.vue
{{{ @/packages/components/src/stepper/demo/cases/demo2.vue
}}} @/packages/components/src/stepper/demo/cases/demo3.vue
{{{ @/packages/components/src/stepper/demo/cases/demo4.vue
}}} @/packages/components/src/stepper/demo/cases/demo5.vue
</MDDemoWrapper>

## API

### Stepper Props
|属性    | 说明 | 类型 | 默认值|
|---------|------|--------|----|
|value| 当前值 | Number/String | |
|step|每次改变步数，可以为小数|Number/String|`1`|
|min|最小值|Number/String|`-Infinity`|
|max|最大值|Number/String|`Infinity`|
|disabled|禁用| Boolean|`false`|
|read-only|只读| Boolean|`false`|
|is-integer|只能输入整数| Boolean|`false`|

### Stepper Events

#### @change(currentValue)
值发生变化事件

#### @increase(difference)
当前值增加时触发

|属性 | 说明 | 类型|
|----|-----|------|
|difference|增加的数值|Number|

#### @decrease(difference)
当前值减少时触发

|属性 | 说明 | 类型|
|----|-----|------|
|difference|减少的数值|Number|
