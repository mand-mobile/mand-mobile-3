---
title: Skeleton 骨架屏
preview: {
  web: 'https://mand-mobile.github.io/mand-mobile-3/examples/#/skeleton',
  uni: 'https://pt-starimg.didistatic.com/static/starimg/img/KdWYNHVV6d1628597615964.png'
}
---

骨架屏，一般用于数据尚未加载前先展示出页面的大致结构的加载状态

## 引入

```javascript
import { Skeleton } from 'mand-mobile'

Vue.component(Skeleton.name, Skeleton)
```

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
{{{ @/packages/components/src/skeleton/demo/cases/demo0.vue
}}} @/packages/components/src/skeleton/demo/cases/demo2.vue
{{{ @/packages/components/src/skeleton/demo/cases/demo1.vue
</MDDemoWrapper>

## API

### Skeleton Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|loading|是否显示骨架屏|Boolean|true|-|
|avatar|是否显示图标占位图|Boolean|false|-|
|avatar-size|图标占位图大小|String|md| sm, md, lg |
|title|是否显示标题占位图|Boolean|false|-|
|title-width|标题占位宽度|Number,String| 40%|-|
|row|内容占位图行数|Number|3|-|
|row-width|内容占位图宽度|String,Number,Array\<String\|Number\>|100%|-|
