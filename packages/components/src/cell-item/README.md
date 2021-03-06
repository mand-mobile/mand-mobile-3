---
title: CellItem 单元格
preview: {
  web: 'https://mand-mobile.github.io/mand-mobile-3/examples/#/cell-item',
  uni: 'https://pt-starimg.didistatic.com/static/starimg/img/7QV4d8eb7m1628592152627.png'
}
---

列表用于展现并列层级的信息内容，列表可承载功能入口、功能操作、信息展示等功能。

## 引入

```javascript
import { CellItem } from 'mand-mobile'

Vue.component(CellItem.name, CellItem)
```

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
<!-- left wrapper -->
{{{ @/packages/components/src/cell-item/demo/cases/demo0.vue
{{{ @/packages/components/src/cell-item/demo/cases/demo1.vue
<!-- right wrapper -->
}}} @/packages/components/src/cell-item/demo/cases/demo2.vue
</MDDemoWrapper>

## API

### CellItem Props
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
|title|标题|String| | |
|brief|描述文案|String| | |
|addon|附加文案|String| | |
|disabled|是否禁用项目|Boolean|`false`| |
|arrow|动作箭头标识|Boolean|`false`| |
|no-border|去除边框|Boolean|`false`| |

### CellItem Events
#### @click(event)
非禁用状态下的点击事件

### CellItem Slots

#### default
内容默认插槽

#### left
起始区域插槽

#### right
末尾附加内容插槽

#### children
额外内容插槽
