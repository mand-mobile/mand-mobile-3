import { isEmptyObject, warn } from '../util/index'

function tranverseProxyMap (proxyMap, handler, context) {
  Object.keys(proxyMap).forEach(ref => {
    handler(context, ref, proxyMap[ref])
  })
}

export function createProxyApiMixin (proxyMap = {}) {
  return {
    mounted() {
      tranverseProxyMap.bind(this)(proxyMap, (context, ref, list) => {
        this.$_proxyApi(context, ref, list)
      }, this)
    },
    methods: {
      $_proxyApi(context, ref, list) {
        list.forEach(api => {
          /* istanbul ignore if */
          if (this[api]) {
            return
          }
          // 代理方法，每次调用时可动态回去组件实例，防止因组件实例变更导致代理方法调用错乱
          this[api] = () => {
            const source = context.$refs[ref]
            if (source && source[api]) {
              return source[api].apply(source, arguments)
            } else {
              warn(`${this.$options.name} proxyApi: Api method [${api}] is undefined in [${source.$options.name}] or there is a method with the same name in the current instance`, 'warn')
            }
          }
        })
      },
    }
  }
}

export function createProxyEventsMixin (proxyMap = {}) {
  return {
    mounted() {
      tranverseProxyMap(proxyMap, (source, list) => {
        if (!isEmptyObject(this.$listeners)) {
          list = Object.keys(this.$listeners)
        }
        list.forEach(event => {
          source && this.$_proxyEvent(source, event)
        })
      }, this)
    },
    methods: {
      $_proxyEvent(source, event) {
        source.$on(event, (...args) => {
          this.$emit(event, ...args)
        })
      },
    }
  }
}