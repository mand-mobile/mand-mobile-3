<template>
  <div class="md-example-child md-example-child-reader md-example-child-reader-1">
    <ul class="image-reader-list">
      <li
        class="image-reader-item"
        v-for="(img, index) in imageList['reader1']"
        :key="index"
        :style="{
          'backgroundImage': `url(${img})`,
          'backgroundPosition': 'center center',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover'
        }"
      >
        <md-tag
          class="image-reader-item-del"
          size="small"
          shape="quarter"
          fill-color="#111A34"
          type="fill"
          font-color="#fff"
          @click.native="onDeleteImage('reader1', index)"
        >
          <md-icon name="close" size="sm"></md-icon>
        </md-tag>
      </li>
      <li class="image-reader-item add">
        <md-image-reader
          name="reader1"
          @select="onReaderSelect"
          @complete="onReaderComplete"
          @error="onReaderError"
          is-multiple
        ></md-image-reader>
        <!-- <md-icon name="camera" size="md" color="#CCC"></md-icon> -->
        <img src="http://img-hxy021.didistatic.com/static/manhattan_fe/do1_CMYGcgAwc4JUNBzc61St" />
        <p>添加图片</p>
      </li>
    </ul>
  </div>
</template>

<script>
import ImageReader from 'mand-mobile/lib/image-reader'
import Icon from 'mand-mobile/lib/icon'
import Tag from 'mand-mobile/lib/tag'
import Toast from 'mand-mobile/lib/toast'

export default {
  components: {
    'md-icon': Icon,
    'md-tag': Tag,
    'md-image-reader': ImageReader,
  },
  data() {
    return {
      imageList: {
        reader0: [
          '//img-hxy021.didistatic.com/static/strategymis/insurancePlatform_spu/uploads/27fb7f097ca218d743f816836bc7ea4a',
          '//manhattan.didistatic.com/static/manhattan/insurancePlatform_spu/uploads/c2912793a222eb24b606a582fd849ab7',
        ],
        reader1: [],
      },
    }
  },
  methods: {
    onReaderSelect() {
      Toast.loading('图片读取中...')
    },
    onReaderComplete(name, {file}) {
      const demoImageList = this.imageList[name] || []

      // eslint-disable-next-line no-undef
      uni.compressImage({
        src: file.path,
        width: '5px',
        height: '5px',
        quality: 10,
        success: res => {
          // eslint-disable-next-line no-undef
          uni.getFileSystemManager().readFile({
            filePath: res.tempFilePath,
            encoding: 'base64',
            success: res => {
              demoImageList.push(`data:image/jpeg;base64,${res.data}`)
              this.$set(this.imageList, name, demoImageList)
            },
          })
        },
      })

      Toast.hide()
    },
    onReaderError(name, {msg}) {
      Toast.failed(msg)
      // eslint-disable-next-line no-console
      console.log('[Mand Mobile] ImageReader Error:', msg)
    },
    onDeleteImage(name, index) {
      const demoImageList = this.imageList[name] || []
      demoImageList.splice(index, 1)
      this.$set(this.imageList, name, demoImageList)
    },
  },
}
// #region ignore
export const metaInfo = {
  describe: 'width: 200&nbsp;&nbsp;height: 200&nbsp;&nbsp;quality: 0.1',
  'zh-CN': {
    title: '图片选择并轴向修正，压缩处理',
  },
  'en-US': {
    title: 'Picture selection and axial correction, compression processing',
  },
}
// #endregion ignore

</script>

<style scoped>
.md-example-child-reader .image-reader-list {
  float: left;
  width: 100%;
}

.md-example-child-reader .image-reader-item {
  position: relative;
  float: left;
  width: 23.5%;
  padding-bottom: 23.5%;
  margin-bottom: 2%;
  margin-right: 2%;
  background: #FFF;
  box-shadow: 0 5px 20px rgba(197, 202, 213, 0.25);
  box-sizing: border-box;
  list-style: none;
  border-radius: 10px;
  background-size: cover;
  overflow: hidden;
}

.md-example-child-reader .image-reader-item:nth-of-type(4n) {
  margin-right: 0;
}

.md-example-child-reader .image-reader-item .image-reader-item-del,
.md-example-child-reader .image-reader-item /deep/.md-tag {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
  opacity: 0.8;
}

.image-reader-item /deep/.md-icon-close {
  font-size: 24px;
}

.image-reader-item.add /deep/.md-icon {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
}

.image-reader-item.add img {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 38px;
}

        
.image-reader-item.add p {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  margin-top: 15px;
  font-size: 22px;
  color: #858B9C;
  text-align: center;
}
</style>