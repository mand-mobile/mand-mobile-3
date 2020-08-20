# Mand Mobile 贡献者说明

[TOC]

## 开发准备

开发者需要[Nodejs](https://nodejs.org/en/) 12+ 和[yarn](https://yarnpkg.com/en/docs/install)

克隆本仓库后，在项目根目录下执行 

```sh
$ npm run bootstrap
```

### 提交代码

提交代码需要遵守`commit 提交规范`用于自动生成changelog。如果对提交规范不够熟悉，可以在项目根目录下使用`npm run cz`替代`git commit `, 我们会使用一个交互式命令行工具`commitizen`协助你生成规范的`commit message`

### 通用NPM scripts介绍

```sh
# 启动工程, 安装依赖
$ npm run bootstrap

# 调试工程， 可在最后输入组件名称用于调试单个组件
$ npm run serve <button-name>

# 发布预发(非稳定)包
$ npm run pub:prerelease

# 发布正式包
$ npm run pub


# 测试组件,可在最后输入组件名称用于调试单个组件
$ npm run test:components <button-name>

# 升级对应测试用例的snapshot, 以button为例
$ cd packages/components && npx jest --updateSnapshot src/button/test/demo.spec.js
```

:tipping_hand_man:默认在`packages/examples/dist/development/mp-weixin`目录下进行uni组件的调试和预览

## 项目结构

- `packages`: Mand Mobile V3.0采用基于lerna 的多包管理方案，此目录下用于存放所有工程源码，包括组件源码、平台源码、工程化脚本和通用工具类和样式
  - `mand-mobile`: 最终交付给应用开发者的主包，此目录不包括任何源代码，仅用于生成并发布应用开发者所需要的构建产物
  - `components`: 组件源代码
    - `src`:
      - `[componnent-name]`: 即组件工程目录，需要以`-`分割目录名称，目录名不允许出现大写字母
        - `component.json`: 组件元信息，用于记录开发者，组件名称等相关信息
        - `index.vue`: 组件源码
        - `demos`: 组件的示例代码
          - `cases`: 存放组件示例, 此目录下每个文件组要遵循命名规范`index[No.].vue`
            - index0.vue
            - index1.vue
            - ....
  - `platform`: 平台相关代码
    - `lib`: 用于存放所有平台相关的资源、模板和驱动命令
      - `web`: 用于存放web相关的api、平台类库、构建模板、构建命令
        - `builder`: 用于存放构建期所需要的模板和命令
          - `generator`
            - `index.js`: 渲染模板逻辑入口
            - `templates`:模板目录，存放构建时所需要的ejs模板
          - `command`
            - `build.js`: 构建打包逻辑
            - `serve.js`: 开发预览命令
        - `runtime`: 存放和平台相关的运行时代码
          - components
          - 
      -  `uni`: 用于存放uni构建微信小程序所需要的api、平台类库、构建模板、构建命令
        - ...同web
  - `shared`: 提供通用的样式、mixin、js utils和相关静态资源
    - `mixin`: 通用的全局stylus mixins
    - `style`: 通用样式
    - `util`:组件运行时所需要的工具代码
  - `scroller`:  组件库内置的scroller依赖，提供高性能的滚动效果
  - `vue-cli-plugin-builder`
    - `generator`: 工程类的模板代码和驱动逻辑，用于被`vue invoke`命令驱动编译模板
    - `src`: cli-plugin的主工程，用于被`vue-cli-service`驱动, 执行相应命令

## BEM 书写规范

`mand-mobile-next` 采用 `BEM` 的 `CSS` 命名约定。大部分情况下，`HTML` 标签都要有自己的类名。
- `BEM` 代表 **块（block），元素（element），修饰符（modifier）**。  
- 拓展关系
  - `-` 中划线，做连字符使用，无实际意义。
  - `_` 单下滑线，用来连接块和其子元素。
  - `--` 双中划线用来描述块或块的子元素的一种状态
> 如：`md-button_content--active`

### 块（block）

一个块是设计或布局的一部分，它有具体且唯一地意义 ，要么是语义上的要么是视觉上的。

在大多数情况下，任何独立的页面元素（或复杂或简单）都可以被视作一个块。它的 `HTML` 容器会有一个唯一的 `CSS` 类名，也就是这个块的名字。

针对块的CSS类名会加一些前缀 `md-`，这些前缀在 `CSS` 中有类似命名空间的作用。  

一个块的经验定义有下面三个基本原则：

- CSS中只能使用类名（不能是ID）。
- 每一个块名应该有一个命名空间（前缀）。
- 每一条CSS规则必须属于一个块。
> 如：`md-button`

### 元素（element）

块中包含若干子元素，且这个子元素往往被认为是直接子元素。**一个块中的元素类名必须使用父级块的名称作为前缀**  

如 `md-button`，`content` 是 `button` 的一个子元素
```css
👋
.md-button {}
.md-button .content {}

👏
.md-button {}
.md-button_content {}
```

### 修饰符（modifier）

修饰符通常用来描述一个块或者元素的一个状态或者其持有的特定属性。

用 `button` 来举例最好不过了。一个按钮可能会有四个尺寸：迷你，小，正常，大；就可以用修饰符来描述
```css
👋
.md-button {}
.md-button .mini {}
.md-button .small {}
.md-button .normal {}
.md-button .large {}

👏
.md-button {}
.md-button--mini {}
.md-button--small {}
.md-button--normal {}
.md-button--large {}
```

### ✍️ 书写风格

项目采用 `stylus` 预处理，去掉所有花括号和分号，统一用缩进代替，请勿使用 `CSS` 原生语法。

```stylus
👋
.md-button
  width 100%
.md-button_content
  width 100%
.md-button--active
  background $highlight

👏
.md-button
  width 100%
  &_content
    width 100%
  &--active
    background $highlight
```
样式属性顺序尽可能的保持如下规则
- 定位：`position z-index left right top bottom clip` 等。
- 自身属性：`width height min-height max-height min-width max-width` 等。
- 文字样式：`color font-size letter-spacing, color text-align` 等。
- 背景：`background-image border` 等。
- 文本属性: `text-align vertical-align text-wrap text-transform text-indent text-decoration letter-spacing word-spacing white-space text-overflow` 等。
- css3中属性：`content、box-shadow、animation、border-radius、transform` 等

### 其他

`BEM` 旨在解决命名空间污染和组件解耦，缺点是会导致类名变长。

## :warning: 迁移说明

### 引入依赖

- **引入工具函数**: 原有的`_mixin`,`_style`,`_scroller`,`_utils`迁移到`@mand-mobile/shared`目录下
- **引入平台代码**: 所有的平台代码迁移至`platform`包下的`src/[platfrom]/runtime/xxx`文件下，通过`import anything from 'lib/runtime/xxx'`进行引入依赖，我们的工程化体系会根据相应指令自动加载平台依赖

### 开发Demo

- **引入组件**:  不支持通过别名`mand-mobile`进行访问，仅支持通过相对路径进行访问
- **组件挂载**: 开发过程中不支持通过eg. `[Button.name]: Button`挂载组件
- **Demo入口**: 无需在`demos`目录下放置`index.vue`入口文件

### 组件暴露

#### Component.js编写规范: 

以button为例，需要在组件根目录放置`component.js`用于生成展示示例和开发预览所必要的元信息

:blush: 如果是用于暴露API的组件比如`Form-Item`，组件目录下无需配置`component.js`文件

```json
export default {
  'name': 'tag',
  'text': '标签',
  'category': 'basic',
  'description': '小标签',
  'author': 'guoyunlong <byterotate@gmail.com>'
}

```

