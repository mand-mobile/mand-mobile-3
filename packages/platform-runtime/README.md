---
title: PlatformRuntime
name: platform-runtime
permalink: /packages/modules/platform-runtime
---

![](https://img.shields.io/npm/v/@mand-mobile/platform-runtime?label=%40mand-mobile/platform-runtime)

Runtime shims and compiletime plugins for smoothing out differences between platforms.

- [Component](#component)
  - [transition](#transition)
  - [scroll-view](#scroll-view)
  - [toast](#toast)
  - [dialog](#dialog)
  - [action-sheet](#action-sheet)

- [Module](#module)
  - [Dom](#dom)
    - [documentElement](#documentelement)
    - [querySelector](#queryselector)
    - [querySelectorAll](#queryselectorall)
    - [getNode](#getnode)
    - [getAttribute](#getattribute)
    - [getBoundingClientRect](#getboundingclientrect)
    - [getScrollOffset](#getscrolloffset)
    - [getComputedStyle](#getcomputedstyle)
  - [Device](#device)
    - [vibrate](#vibrate)

## Component

### transition

#### Usage

```javascript
import TransitionPrimitive from '@mand-mobile/platform-runtime/lib/component/transition'
```

#### Props

* show: Boolean, default: `false`
* name: String
* styles: Object

#### Events

* beforeEnter
* enter
* afterEnter
* beforeLeave
* leave
* afterLeave


### scroll-view

#### Usage

```javascript
import ScrollViewPrimitive from '@mand-mobile/platform-runtime/lib/component/scroll-view'
```

#### Props

* scrollingX: Boolean, default: `false`
* scrollingY: Boolean, default: `true`
* height: [Number, String], default: `'auto'`
* refresherEnable: Boolean, default: `false`
* endReachedThreshold: Number, default: `0`
* styles: Object

### Events

* refreshing
* end-reached
* scroll, params: { scrollTop, scrollLeft }

### Methods

* reflowScroller
* getSizes: () => { wrapperW, wrapperH, contentW, contentH }
* getOffsets: () => { left, top }
* scrollTo: (left: number, top: number, isAnimation = false) => void
* triggerRefresh
* finishRefresh
* finishLoadMore

### toast

#### Usage

```javascript
import toastFactory from '@mand-mobile/platform-runtime/lib/component/toast'
```

#### Methods

* toastFactory: ToastOptions: VueOptions => Toast

### dialog

#### Usage

```javascript
import dialogFactory from '@mand-mobile/platform-runtime/lib/component/dialog'
```

#### Methods

* dialogFactory: DialogOptions: VueOptions => Dialog

### action-sheet

#### Usage

```javascript
import actionSheetFactory from '@mand-mobile/platform-runtime/lib/component/action-sheet'
```

#### Methods

* actionSheetFactory: ActionSheetOptions: VueOptions => ActionSheet


## Module

### Dom

#### Usage

```javascript
import {Dom} from '@mand-mobile/platform-runtime/lib/module'

const $MDDom = Dom.bind(this) // scoped selector like refs
$MDDom().querySelector('xxxx').getScrollOffset()
```

#### API

##### documentElement

`documentElement(): nodeRef`

> uniapp?????????????????????????????? [????????????](https://uniapp.dcloud.io/api/ui/nodes-info?id=selectorqueryselectviewport)

```javascript
$MDDom().documentElement()
```

##### querySelector

`querySelector(elNmae: string): nodeRef`

```javascript
export default {
  async mounted () {
    const testNodeRef = this.$MDDom().querySelector('.test')
    const rect: DOMRect = await testNodeRef.getBoundingClientRect()
  }
}
```

##### querySelectorAll

`querySelectorAll(elNmae: string): nodeRef`

> uniapp??????????????????????????????????????????????????????length?????????????????????getNode??????

```javascript
export default {
  async mounted () {
    const firsttTestNodeRef = this.$MDDom().querySelector('.test')[0]
    const rect: DOMRect = await firsttTestNodeRef.getBoundingClientRect()
  }
}
```

##### getNode

`getNode(): Promise<any[]>`

> web???????????????????????????dom?????????uniapp??????Canvas??????????????? [????????????](https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesrefnode)

```javascript
const nodeRefs = $MDDom().querySelectorAll('.test')
const nodes = await nodeRefs.getNode()
 
 
console.log(nodes) // [node, node, ...]
 
const nodeRef = $MDDom().querySelector('.test')
const node = await nodeRefs.getNode()
 
console.log(node) 
```

##### getAttribute

`getAttribute(prop: string): Promise<any>`

> uniapp???????????????id??????[nodesRef.fields?????????properties](https://uniapp.dcloud.io/api/ui/nodes-info?id=nodesreffields)??????????????????

```javascript
export default {
  async mounted () {
    await $MDDom().querySelector('.test').getAttribute('id')
  }
}
```

##### getBoundingClientRect

`getBoundingClientRect(): Promise<DOMRect>`

```javascript
export default {
  async mounted () {
    await $MDDom().querySelector('.test').getBoundingClientRect()
  }
}
```

##### getScrollOffset

`getScrollOffset(): Promise<{scrollLeft: number, scrollTop: number }>`

```javascript
export default {
  async mounted () {
    await $MDDom().querySelector('.test').getScrollOffset()
  }
}
```

##### getComputedStyle

`getComputedStyle(propList: Array<string>): Promise<object>`

```javascript
export default {
  async mounted () {
    await $MDDom().querySelector('.test').getComputedStyle(['position'])
  }
}
```

### Device

#### Usage

```javascript
import {Device} from '@mand-mobile/platform-runtime/lib/module'

const device = Device()
device.vibrate()
```
 or
```javascript
export default {
  mounted () {
    $MDDevice().vibrate()
  }
}
```

#### API

##### vibrate

> ?????????????????????????????????????????????web??????????????????????????????
