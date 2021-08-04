import Vue from 'vue'
import {mdDocument} from '@mand-mobile/shared/lib/util'
import Toast from './toast'

function ToastFactory() {
  /**
   * Toast factory
   *
   * @param {Object} props
   * @return {Toast}
   */
  const generate = function({
    content = '',
    icon = '',
    iconSvg = false,
    duration = 3000,
    position = 'center',
    direction = 'horizontal',
    hasMask = false,
    parentNode = mdDocument.body,
  }) {
    let vm = Toast._instance

    if (!vm) {
      const ToastConstructor = Vue.extend(Toast)
      vm = Toast._instance = new ToastConstructor({
        propsData: {
          content,
          icon,
          iconSvg,
          duration,
          position,
          direction,
          hasMask,
        },
      }).$mount()
    }

    if (vm.$el && !vm.$el.parentNode) {
      parentNode.appendChild(vm.$el)
    }

    vm.content = content
    vm.icon = icon
    vm.iconSvg = iconSvg
    vm.duration = duration
    vm.position = position
    vm.direction = direction
    vm.hasMask = hasMask
    // vm.visible = true
    // vm.fire()
    vm.show()

    return vm
  }

  // There is only one toast singleton
  Toast._instance = null

  Toast.create = generate

  Toast.hide = () => {
    const ToastConstructor = Vue.extend(Toast)
    if (Toast._instance instanceof ToastConstructor && Toast._instance.visible) {
      Toast._instance.hide()
    }
  }

  /**
   * Hide toast
   */
  Toast.hide = () => {
    const ToastConstructor = Vue.extend(Toast)
    if (Toast._instance instanceof ToastConstructor && Toast._instance.visible) {
      Toast._instance.hide()
    }
  }

  /**
   * Show info toast
   * @param {string} content
   * @param {number=} [duration=3000]
   * @param {boolean=} [hasMask=false]
   * @param {node=} [parentNode=document.body]
   * @returns {Toast}
   */

  Toast.info = (content = '', duration = 3000, hasMask = false, parentNode = mdDocument.body) => {
    return generate({
      icon: '',
      content,
      duration,
      hasMask,
      parentNode,
    })
  }
  Toast.infoV = (icon = 'info-solid', content = '', duration = 3000, hasMask = false, parentNode = mdDocument.body) => {
    return generate({
      icon,
      content,
      duration,
      hasMask,
      parentNode,
      direction: 'vertical',
    })
  }

  /**
   * Show succeed toast
   * @param {string} content
   * @param {number=} [duration=3000]
   * @param {boolean=} [hasMask=false]
   * @param {node=} [parentNode=document.body]
   * @returns {Toast}
   */

  Toast.succeed = (content = '', duration = 3000, hasMask = false, parentNode = mdDocument.body) => {
    return generate({
      icon: 'success',
      content,
      duration,
      hasMask,
      parentNode,
    })
  }
  Toast.succeedV = (content = '', duration = 3000, hasMask = false, parentNode = mdDocument.body) => {
    return generate({
      icon: 'success',
      content,
      duration,
      hasMask,
      parentNode,
      direction: 'vertical',
    })
  }

  /**
   * Show failed toast
   * @param {string} content
   * @param {number=} [duration=3000]
   * @param {boolean=} [hasMask=true]
   * @param {node=} [parentNode=document.body]
   * @returns {Toast}
   */

  Toast.failed = (content = '', duration = 3000, hasMask = false, parentNode = mdDocument.body) => {
    return generate({
      icon: 'fail',
      content,
      duration,
      hasMask,
      parentNode,
    })
  }
  Toast.failedV = (content = '', duration = 3000, hasMask = false, parentNode = mdDocument.body) => {
    return generate({
      icon: 'fail',
      content,
      duration,
      hasMask,
      parentNode,
      direction: 'vertical',
    })
  }

  /**
   * Show loading toast
   * @param {string} content
   * @param {number=} [duration=0]
   * @param {boolean=} [hasMask=false]
   * @param {node=} [parentNode=document.body]
   * @returns {Toast}
   */
  Toast.loading = (content = '', duration = 0, hasMask = true, parentNode = mdDocument.body) => {
    return generate({
      icon: 'ring',
      iconSvg: true,
      content,
      duration,
      hasMask,
      parentNode,
    })
  }

  Toast.loadingV = (content = '', duration = 0, hasMask = true, parentNode = mdDocument.body) => {
    return generate({
      icon: 'ring',
      iconSvg: true,
      content,
      duration,
      hasMask,
      parentNode,
      direction: 'vertical',
    })
  }

  return Toast
}

export default ToastFactory()
