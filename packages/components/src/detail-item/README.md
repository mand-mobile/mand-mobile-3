---
title: DetailItem 清单项
preview: {
  web: 'https://mand-mobile.github.io/mand-mobile-3/examples/#/detail-item',
  uni: 'https://pt-starimg.didistatic.com/static/starimg/img/Kx1VYdl37M1628592235874.png'
}
---

清单列表用于展示一些列表信息，如账单

## 引入

```javascript
import { DetailItem } from 'mand-mobile'

Vue.component(DetailItem.name, DetailItem)
```

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
<!-- left wrapper -->
{{{ @/packages/components/src/detail-item/demo/cases/demo0.vue
</MDDemoWrapper>

## API

### DetailItem Props
|属性 | 说明 | 类型 | 默认值|备注|
|----|-----|------|------|------|
|title|标题|String| | |
|content|描述内容|String| | |
|bold|是否加粗显示|Boolean|`false`| |
