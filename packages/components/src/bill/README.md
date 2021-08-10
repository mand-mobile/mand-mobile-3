---
title: Bill 票据
preview: {
  web: 'https://mand-mobile.github.io/mand-mobile-3/examples/#/bill',
  uni: 'https://pt-starimg.didistatic.com/static/starimg/img/0TVOUrmmP51628599087432.png'
}
---

电子账单或票据

## 引入

```javascript
import { Bill } from 'mand-mobile'

Vue.component(Bill.name, Bill)
```

### 代码演示
<MDDemoWrapper>
<!-- left wrapper -->
{{{ @/packages/components/src/bill/demo/cases/demo0.vue
<!-- right wrapper -->
}}} @/packages/components/src/bill/demo/cases/demo1.vue
</MDDemoWrapper>

### API

### Bill Props
|属性 | 说明 | 类型 | 默认值 | 备注 |
|----|-----|------|------ |------|
|name|票据抬头|String| | |
|no|票据编号|String| | |
|neckNotch|票据打孔颜色|String| |
|water-mark|水印内容|String\/Object| | |

### Bill Slots

#### default
默认内容插槽

#### header
头部内容插槽

#### footer
底部内容插槽