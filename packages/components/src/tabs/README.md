---
title: Tabs 标签页
preview: {
  web: 'https://mand-mobile.github.io/mand-mobile-3/examples/#/tabs',
  uni: 'https://pt-starimg.didistatic.com/static/starimg/img/MAYUSG70Sd1628598223128.png'
}
---

用于创建包含内容区域的标签页

## 引入

```javascript
import { Tabs, TabPane } from 'mand-mobile'

Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
```

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
<!-- left wrapper -->
{{{ @/packages/components/src/tabs/demo/cases/demo0.vue
</MDDemoWrapper>

## API

### Tabs Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|value|双向绑定的标签对象`name`|String| | |
|immediate|初始化后立即就触发一次`change`事件|Boolean|`false`| |

### TabPane Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|name|唯一键名|String| |必须|
|label|菜单标题|String| |必须|
|disabled|是否禁用|Boolean|`false`| |
|index <MDPlatformTag uni/>|强制排序|Number|-|仅用于渲染顺序与元素排序不符的情况下重新强制排序，如支付宝小程序|

### Tabs Methods

#### reflowTabBar()
重新计算`TabBar`样式布局

### Tabs Events

#### @change(tab)
当用户选择标签触发

|属性 | 说明 | 类型|
|----|-----|------|
|tab|选中的标签菜单对象|Object:{name: String, label: String, disabled: Boolean}|
