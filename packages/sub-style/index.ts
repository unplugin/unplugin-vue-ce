import { createUnplugin } from 'unplugin'
import { setGlobalPrefix } from 'baiwusanyu-utils'
import MagicString from 'magic-string'
import { NAME } from '@unplugin-vue-ce/utils'
import { injectVueRuntime } from './src/inject-vue-runtime'

export const unVueCESubStyle = (): any => {
  setGlobalPrefix(`[${NAME}]:`)
  return {
    name: `${NAME}:sub-style`,
    enforce: 'post',
    async transform(code: string, id: string) {
      console.log(id)
      let mgcStr = new MagicString(code)

      // dev only
      if (id.includes('.vite/deps/vue.js'))
        mgcStr = injectVueRuntime(mgcStr)
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
const unplugin = createUnplugin(unVueCESubStyle)
export const viteVueCESubStyle = unplugin.vite
export const rollupVueCESubStyle = unplugin.rollup
export const webpackVueCESubStyle = unplugin.webpack
export const esbuildVueCESubStyle = unplugin.esbuild
