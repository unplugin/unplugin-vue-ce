import { createUnplugin } from 'unplugin'
import { setGlobalPrefix } from 'baiwusanyu-utils'
import MagicString from 'magic-string'
import { NAME } from '@unplugin-vue-ce/utils'

export const unVueCEShadow = (): any => {
  setGlobalPrefix(`[${NAME}]:`)
  return {
    name: `${NAME}:switch-shadow`,
    enforce: 'post',
    async transform(code: string, id: string) {
      const mgcStr = new MagicString(code)

      // build only
      if (id.includes('@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'))
      // injectVueRuntime(mgcStr)

      // build only
      {
        if (id.includes('@vue/runtime-core/dist/runtime-core.esm-bundler.js'))
        // injectVueRuntime(mgcStr)

        // dev only
        {
          if (id.includes('.vite/deps/vue.js'))
          //  injectVueRuntime(mgcStr)

          {
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
          }
        }
      }
    },
  }
}
const unplugin = createUnplugin(unVueCEShadow)
export const viteVueCEShadow = unplugin.vite
export const rollupVueCEShadow = unplugin.rollup
export const webpackVueCEShadow = unplugin.webpack
export const esbuildVueCEShadow = unplugin.esbuild
