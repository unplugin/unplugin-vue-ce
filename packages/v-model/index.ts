import { createUnplugin } from 'unplugin'
import { setGlobalPrefix } from 'baiwusanyu-utils'
import MagicString from 'magic-string'
import { NAME } from '@unplugin-vue-ce/utils'
import { injectIsCEModifiers } from './src/inject-vue-shared'
import { injectVueRuntime } from './src/inject-vue-runtime'
export const unVueCEVModel = (): any => {
  setGlobalPrefix(`[${NAME}]:`)
  return {
    name: `${NAME}:v-model`,
    enforce: 'post',
    async transform(code: string, id: string) {
      let mgcStr = new MagicString(code)
      // inject 'isCEModifiers' to @vue/shared
      // build only
      if (id.includes('/@vue/shared/dist/shared.esm-bundler.js'))
        mgcStr = injectIsCEModifiers(mgcStr, false)

      // injcet runtime code
      // build only
      if (id.includes('@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'))
        mgcStr = injectVueRuntime(mgcStr, false)

      // export emit function
      // build only
      if (id.includes('@vue/runtime-core/dist/runtime-core.esm-bundler.js'))
        mgcStr = mgcStr.replace('function emit(instance, event, ...rawArgs) {', 'export function emit(instance, event, ...rawArgs) {')

      // injcet runtime code
      // dev only
      if (id.includes('.vite/deps/vue.js'))
        mgcStr = injectVueRuntime(mgcStr, true)

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
