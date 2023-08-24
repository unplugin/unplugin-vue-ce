import { createUnplugin } from 'unplugin'
import { normalizePath, setGlobalPrefix } from 'baiwusanyu-utils'
import MagicString from 'magic-string'
import { NAME } from '@unplugin-vue-ce/utils'

export const unVueCEShadow = (): any => {
  setGlobalPrefix(`[${NAME}]:`)
  return {
    name: `${NAME}:switch-shadow`,
    enforce: 'post',
    transformInclude(id: string) {
      return !id.endsWith('.html')
    },
    async transform(code: string, id: string) {
      const formatId = normalizePath(id)
      const mgcStr = new MagicString(code)

      // build only / webpack dev
      if (formatId.includes('@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'))
        console.log(formatId)

      // injectVueRuntime(mgcStr)

      // build only / webpack dev
      if (formatId.includes('@vue/runtime-core/dist/runtime-core.esm-bundler.js'))
        console.log(formatId)

      // injectVueRuntime(mgcStr)

      // vite dev only
      if (formatId.includes('.vite/deps/vue.js')
        || (formatId.includes('.vite/deps/chunk') && code.includes('__isVue')))
        console.log(formatId)

      //  injectVueRuntime(mgcStr)
      return {
        code: mgcStr.toString(),
        get map() {
          return mgcStr.generateMap({
            source: id,
            includeContent: true,
            hires: true,
          })
        },
      }
    },
  }
}
const unplugin = createUnplugin(unVueCEShadow)
export const viteVueCEShadow = unplugin.vite
export const rollupVueCEShadow = unplugin.rollup
export const webpackVueCEShadow = unplugin.webpack
export const esbuildVueCEShadow = unplugin.esbuild
