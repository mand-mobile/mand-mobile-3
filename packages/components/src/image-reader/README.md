---
title: ImageReader 图片选择器
preview: {
  web: 'https://mand-mobile.github.io/mand-mobile-3/examples/#/image-reader',
  uni: 'https://pt-starimg.didistatic.com/static/starimg/img/8j6ZwhRJl61628592581271.png'
}
---

用于相册照片读取或拉起拍照

## 引入

```javascript
import { ImageReader } from 'mand-mobile'

Vue.component(ImageReader.name, ImageReader)
```
::: tip 开发小程序
小程序需使用文件管理器能力，**支付宝小程序**需手动添加，否则会有"无权调用该接口"的报错。添加方式如下：

>> 开放平台控制台 > 找到已创建的小程序 > 点击进入小程序管理后台 > 在**版本管理**页面的**能力列表**部分点击**添加能力** > 勾选**文件管理器**能力并点击确定。
:::

## 代码演示
<!-- DEMO -->
<MDDemoWrapper>
{{{ @/packages/components/src/image-reader/demo/cases/demo0.vue
}}} @/packages/components/src/image-reader/demo/cases/demo1.web.vue
</MDDemoWrapper>

## API

### ImageReader Props
|属性 | 说明 | 类型 | 默认值 | 备注|
|----|-----|------|------|------|
|name|标识|String| |可用于区分多个选择器|
|size|图片尺寸限制|String/Number| |单位`kb`|
|is-camera-only|是否只支持拍照|Boolean|`false`| |
|amount|选择多张|Number| |只在`is-multiple`为`true`时有效|
|is-multiple|是否支持选择多张|Boolean|`false`|存在[兼容问题](https://caniuse.com/#feat=input-file-multiple)|
|mime <MDPlatformTag web/>|支持图片类型|Array|`*`|如`['jpeg','png']`|

### ImageReader Events

#### @select(name, { files })
图片选择完成事件，还未开始读取

|属性 | 说明 | 类型| 备注|
|-----|-----|-----|-----|
|name|选择器标识|String|-|
|files|图片对象集合|Array\<File\>|-|

#### @complete(name, { dataUrl, blob, file })
图片选择读取完成事件

|属性 | 说明 | 类型| 备注|
|-----|-----|-----|-----|
|name|选择器标识|String|-|
|dataUrl|图片Base64|String|-|
|file|图片对象|File|-|
|blob <MDPlatformTag web/>|图片Blob对象，可用于`formData`|Blob|-|

:::tip
Uniapp中需使用[uni.uploadFile](https://uniapp.dcloud.io/api/request/network-file?id=uploadfile)上传图片
:::

#### @error(name, { code, msg })
图片选择读取失败事件

|属性 | 说明 | 类型| 备注|
|-----|-----|-----|-----|
|name|选择器标识|String|-|
|code|错误标识，见附录|String|-|
|msg|错误信息，见附录|String|-|

## imageProcessor
<MDPlatformTag web/>

用于图片轴向修正，图片质量压缩，宽高控制

:::tip
Uniapp中需使用[uni.compressImage](https://uniapp.dcloud.io/api/media/image?id=compressimage)压缩图片
:::

### 引入

```javascript
import imageProcessor from 'mand-mobile/lib/image-reader/image-processor'

/**
 * options 图片处理配置
 * fn(dataUrl, blob) 处理完成回调
 * @return Promise({dataUrl, blob})
 */
imageProcessor(options[, fn])
```

### options

|属性 | 说明 | 类型| 备注|
|-----|-----|-----|-----|
|dataUrl|图片Base64|String|-|
|width|图片宽度|Number|单位`px`, 宽度超出时等比缩放|
|height|图片高度|Number|单位`px`, 高度超出时等比缩放|
|quality|图片质量|Number|取值范围`0-1`|

## 附录
图片读取失败错误码和错误信息

```
'100': 'browser does not support'
'101': 'picture size is beyond the preset'
'102': 'picture read failure'
'103': 'the number of pictures exceeds the limit'
```
