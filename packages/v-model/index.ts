import { createUnplugin } from 'unplugin'
import { setGlobalPrefix } from 'baiwusanyu-utils'
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
    transformInclude() {
      return true
    },
    async transform(code: string, id: string) {
      const mgcStr = new MagicString(code)
      // build only
      if (id.includes('/@vue/shared/dist/shared.esm-bundler.js'))
        injectIsCEModifiers(mgcStr, false)

      // build only
      if (id.includes('@vue/runtime-dom/dist/runtime-dom.esm-bundler.js')) {
        injectVueRuntime(mgcStr)
        injectImport(mgcStr)
      }

      // build only
      if (id.includes('@vue/runtime-core/dist/runtime-core.esm-bundler.js'))
        injectEmit(mgcStr)

      // dev only
      if (id.includes('.vite/deps/vue.js')
        || (id.includes('.vite/deps/chunk') && code.includes('__isVue'))) {
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
