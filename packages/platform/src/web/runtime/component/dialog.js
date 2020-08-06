import Vue from 'vue'
import {mdDocument} from '@mand-mobile/shared/lib/util'

export default function DialogFactory(Dialog) {
  /* istanbul ignore next */
  const noop = function() {}

  // all active instances
  const instances = []

  /**
   * Dialog factory
   *
   * @param {Object} props
   * @return {Dialog}
   */
  const generate = function({
    title = '',
    icon = '',
    iconSvg = false,
    content = '',
    closable = false,
    btns = [],
    onShow = noop,
    onHide = noop,
  }) {
    const DialogConstructor = Vue.extend(Dialog)
    const vm = new DialogConstructor({
      propsData: {
        value: false,
        title,
        icon,
        iconSvg,
        content,
        closable,
        btns,
        transition: 'md-bounce',
        preventScroll: true,
      },
    }).$mount()

    mdDocument.body.appendChild(vm.$el)

    instances.push(vm)

    vm.$on('input', val => {
      /* istanbul ignore else */
      if (!val) {
        vm.value = false
      }
    })
    vm.$on('hide', () => {
      const index = instances.indexOf(vm)
      /* istanbul ignore else */
      if (index >= 0) {
        instances.splice(index, 1)
      }
      vm.$destroy()
      onHide()
    })
    vm.$on('show', () => {
      onShow()
    })

    vm.value = true

    return vm
  }

  Dialog.create = generate

  /**
   * Dynamically create a confirm dialog
   *
   * @param {Object} props
   * @return {Dialog}
   */
  Dialog.confirm = ({
    title = '',
    icon = '',
    iconSvg = false,
    content = '',
    cancelText = '取消',
    cancelWarning = false,
    confirmText = '确定',
    confirmWarning = false,
    closable = false,
    onConfirm = noop,
    onCancel = noop,
    onShow = noop,
    onHide = noop,
  }) => {
    const vm = generate({
      title,
      icon,
      iconSvg,
      content,
      closable,
      onShow,
      onHide,
      btns: [
        {
          text: cancelText,
          warning: cancelWarning,
          handler: /* istanbul ignore next */ () => {
            if (onCancel() !== false) {
              vm.close()
            }
          },
        },
        {
          text: confirmText,
          warning: confirmWarning,
          handler: /* istanbul ignore next */ () => {
            if (onConfirm() !== false) {
              vm.close()
            }
          },
        },
      ],
    })

    return vm
  }

  /**
   * Dynamically create a alert dialog
   *
   * @param {Object} props
   * @return {Dialog}
   */
  Dialog.alert = ({
    title = '',
    icon = '',
    iconSvg = false,
    content = '',
    confirmText = '确定',
    closable = false,
    warning = false,
    onConfirm = noop,
    onShow = noop,
    onHide = noop,
  }) => {
    const vm = generate({
      title,
      icon,
      iconSvg,
      content,
      closable,
      onShow,
      onHide,
      btns: [
        {
          text: confirmText,
          warning,
          handler: /* istanbul ignore next */ () => {
            if (onConfirm() !== false) {
              vm.close()
            }
          },
        },
      ],
    })

    return vm
  }

  /**
   * Dynamically create a succeed dialog
   *
   * @param {Object} props
   * @return {Dialog}
   */
  Dialog.succeed = props => {
    props.icon = 'success-color'
    return Dialog.confirm(props)
  }

  /**
   * Dynamically create a failed dialog
   *
   * @param {Object} props
   * @return {Dialog}
   */
  Dialog.failed = props => {
    props.icon = 'warn-color'
    return Dialog.confirm(props)
  }

  /**
   * Close all actived static dialogs
   *
   * @static
   * @return void
   */
  Dialog.closeAll = () => {
    instances.forEach(instance => {
      instance.close()
    })
  }
  return Dialog
}
