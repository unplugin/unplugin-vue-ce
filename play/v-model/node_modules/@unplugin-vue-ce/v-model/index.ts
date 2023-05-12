import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import { setGlobalPrefix } from 'baiwusanyu-utils'
import MagicString from 'magic-string'
import { initOption } from './src/option'
import { injectIsCEModifiers } from './src/inject/inject-vue-shared'
import type { Options } from './types'
const NAME = 'unplugin-vue-ce'
const unplugin = createUnplugin<Options>(
  (options: Options = {}): any => {
    setGlobalPrefix(`[${NAME}]:`)
    const userOptions = initOption(options)
    const filter = createFilter(
      userOptions.include,
      userOptions.exclude,
    )

    return {
      name: `${NAME}:v-model`,
      enforce: 'pre',
      async transform(code: string, id: string) {
        let mgcStr = new MagicString(code)

        // build inject to shared
        if (id.includes('/@vue/shared/dist/shared.esm-bundler.js')){
          mgcStr = injectIsCEModifiers(mgcStr)
        }

        if (id.includes('@vue/runtime-dom/dist/runtime-dom.esm-bundler.js')){
          code = 'import { isCEModifiers } from \'@vue/shared\';\n' + code + 'isCEModifiers()'
          console.log('\ncode ####################', code)
        }

        console.log('\nid ####################', id)
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
  })
export const viteVueCEVModel = unplugin.vite
export const rollupVueCEVModel = unplugin.rollup
export const webpackVueCEVModel = unplugin.webpack
export const esbuildVueCEVModel = unplugin.esbuild
