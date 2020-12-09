---
title: Shared
name: shared
permalink: /packages/modules/shared
---

Internal utility functions, stylus, and constants shared across `@mand-mobile` packages.

## Usage

``` typescript
import * as utils from '@mand-mobile/shared/lib/util'
```

## Structure

```
├─src
|  ├─util
|  |  ├─debug.ts
|  |  ├─env.ts
|  |  ├─data.ts
|  |  ├─functions.ts
|  |  ├─index.ts
|  |  └─window.ts
|  ├─style
|  |   ├─global.styl
|  |   ├─transition.styl
|  |   ├─mixin
|  |   |   ├─theme.basic.styl
|  |   |   ├─theme.components.styl
|  |   |   ├─theme.variable.styl
|  |   |   └util.styl
|  |   ├─images
|  |   |   ├─keyboard-del.png
|  |   |   ├─keyboard-hide.png
|  |   |   ├─spinner.svg
|  |   |   ├─success-color.svg
|  |   |   └warn-color.svg
|  ├─mixin
|  |   └proxy.ts
```