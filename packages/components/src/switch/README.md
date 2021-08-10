---
title: Switch 开关
preview: {
  web: 'https://mand-mobile.github.io/mand-mobile-3/examples/#/switch',
  uni: 'https://pt-starimg.didistatic.com/static/starimg/img/QUck4WFiir1628598021913.png'
}
---

开关按钮，用于表示开关状态/两种状态之间的切换

## 引入

```javascript
import { Switch } from 'mand-mobile'

Vue.component(Switch.name, Switch)
```

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
<!-- left wrapper -->
{{{ @/packages/components/src/switch/demo/cases/demo0.vue
{{{ @/packages/components/src/switch/demo/cases/demo2.vue
<!-- right wrapper -->
}}} @/packages/components/src/switch/demo/cases/demo1.vue
}}} @/packages/components/src/switch/demo/cases/demo3.vue
</MDDemoWrapper>

## API

### Switch Props
|属性 | 说明 | 类型 | 默认值|
|----|-----|------|------|
|value|打开或者关闭|Boolean|`false`|
|disabled|是否禁用|Boolean|`false`|

### Switch Events

#### @change(isActive)
事件说明

|属性 | 说明 | 类型 |
|----|-----|------|
|isActive|开关状态，打开或者关闭|Boolean|
