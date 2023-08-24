import { createUnplugin } from 'unplugin'
import { normalizePath, setGlobalPrefix } from 'baiwusanyu-utils'
import MagicString from 'magic-string'
import { NAME } from '@unplugin-vue-ce/utils'
import { injectVueRuntime } from './src/inject-vue-runtime'
import { injectIsCEModifiers } from './src/inject-vue-shared'
import { injectEmit } from './src/inject-emit'
import { injectImport } from './src/inject-import'
export const unVueCEVModel = (): any => {
  setGlobalPrefix(`[${NAME}]:`)
  return {
    name: `${NAME}:v-model`,
    enforce: 'post',
    transformInclude(id: string) {
      return !id.endsWith('.html')
    },
    async transform(code: string, id: string) {
      const mgcStr = new MagicString(code)
      const formatId = normalizePath(id)
      // build only / webpack dev
      if (formatId.includes('/@vue/shared/dist/shared.esm-bundler.js'))
        injectIsCEModifiers(mgcStr, false)

      // build only / webpack dev
      if (formatId.includes('@vue/runtime-dom/dist/runtime-dom.esm-bundler.js')) {
        injectVueRuntime(mgcStr)
        injectImport(mgcStr)
      }

      // build only / webpack dev
      if (formatId.includes('@vue/runtime-core/dist/runtime-core.esm-bundler.js'))
        injectEmit(mgcStr)

      // vite dev only
      if (formatId.includes('.vite/deps/vue.js')
        || (formatId.includes('.vite/deps/chunk') && code.includes('__isVue'))) {
        injectVueRuntime(mgcStr)
        injectIsCEModifiers(mgcStr, true)
      }

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
const unplugin = createUnplugin(unVueCEVModel)
export const viteVueCEVModel = unplugin.vite
export const rollupVueCEVModel = unplugin.rollup
export const webpackVueCEVModel = unplugin.webpack
export const esbuildVueCEVModel = unplugin.esbuild
