<template>
  <div class="md-image-reader">
    <div class="md-image-reader_file" @click="$_onReaderChange"></div>
  </div>
</template>

<script>
import {warn} from '@mand-mobile/shared/lib/util'
import imageReaderMixin from './mixins'

export default {
  name: 'md-image-reader',

  mixins: [imageReaderMixin],

  methods: {
    $_readFile(files) {
      files.forEach(file => {
        if (this.size && file.size > this.size) {
          this.$_mixinReaderComplete(101)
          return
        }
        // eslint-disable-next-line no-undef
        uni.getFileSystemManager().readFile({
          filePath: file.path,
          encoding: 'base64',
          success: res => {
            if (!file.name) {
              file.name = file.path
            }
            this.$_mixinReaderComplete(0, {
              dataUrl: `data:image/jpeg;base64,${res.data}`,
              file,
            })
          },
          fail: err => {
            warn(err.errMsg || err.errorMessage)
            this.$_mixinReaderComplete(102)
          },
        })
      })
    },
    // MARK: events handler
    $_onReaderChange() {
      // eslint-disable-next-line no-undef
      uni.chooseImage({
        count: this.isMultiple ? this.amount : 1,
        sizeType: ['original'],
        sourceType: this.isCameraOnly ? ['camera'] : ['camera', 'album'],
        success: res => {
          this.$_mixinReaderChange(res.tempFiles)
        },
      })
    },
  },
}

</script>

<style lang="stylus">
.md-image-reader
  position absolute
  width 100%
  height 100%
  z-index 100
  left 0
  top 0
  -webkit-tap-highlight-color rgba(0, 0, 0, 0)

  &_file
    position absolute
    width 100%
    height 100%
    opacity 0
    left 0
    top 0
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)
</style>
