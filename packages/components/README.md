![](https://img.shields.io/npm/v/@mand-mobile/components?label=%40mand-mobile/components)

# @mand-mobile/components

Components templated source code for multiple platforms

## Directory

```bash
- src
  - scroll-view
    # entry
    - index.vue 
    - index.web.vue # entry for a specific platform which takes precedence over index.vue/js

    # other module imported by entry
    - xxx.js 
    - xxx.vue
    - xxx.web.js # module for a specific platform
    - xxx.uni.vue # module for a specific platform

    # demo
    - demo/cases
      - demo0.vue
      - demo1.web.vue # demo for a specific platform
      - demo2-only.vue # only demo participated in building
      - demo3-skip.vue # demo skipped in building

    # testing
    - test
```

> The naming conventions of the above files are based on conventions. When importing in other components, you can write only the file name without adding the logic of importing different files according to different platforms. The platform-builder will complete this work when building. For example:

* Source

```js
// yes 🙋
import ScrollView from '../scroll-view'

// no 🙅
import ScrollView from '../scroll-view/index.web'
```
* After Compiler

```js
// web
import ScrollView from '@mand-mobile/components/src/scroll-view/index.web.vue'

// uni
import ScrollView from '@mand-mobile/components/src/scroll-view/index.vue'
```


