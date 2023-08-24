import { createUnplugin } from 'unplugin'
import { normalizePath, setGlobalPrefix } from 'baiwusanyu-utils'
import MagicString from 'magic-string'
import { NAME } from '@unplugin-vue-ce/utils'
import { injectVueRuntime } from './src/inject/inject-vue-runtime'
import { atomicCSSPreset, virtualTailwind, virtualUno } from './src/atomic-css'

export const unVueCESubStyle = (): any => {
  setGlobalPrefix(`[${NAME}]:`)
  // just vite
  return [
    {
      name: `${NAME}:sub-style:pre`,
      enforce: 'pre',
      transformInclude(id: string) {
        return !id.endsWith('.html')
      },
      vite: {
        resolveId(id: string) {
          if (atomicCSSPreset[id as keyof typeof atomicCSSPreset])
            return `\0${id}`
        },
        load(id: string) {
          if (id === `\0${virtualTailwind}` || id === `\0${virtualUno}`) {
            return {
              code: '',
            }
          }
        },
        transform(code: string, id: string) {
          const mgcStr = new MagicString(code)
          if (id.endsWith('.vue') && code.includes(virtualTailwind))
            mgcStr.prependRight(mgcStr.length(), atomicCSSPreset[virtualTailwind])

          if (id.endsWith('.vue') && code.includes(virtualUno))
            mgcStr.prependRight(mgcStr.length(), atomicCSSPreset[virtualUno])

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
      },
    },
    {
      name: `${NAME}:sub-style:post`,
      enforce: 'post',
      transformInclude(id: string) {
        return !id.endsWith('.html')
      },
      async transform(code: string, id: string) {
        const formatId = normalizePath(id)
        const mgcStr = new MagicString(code)
        // build only / webpack dev
        if (formatId.includes('@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'))
          injectVueRuntime(mgcStr)

        // build only / webpack dev
        if (formatId.includes('@vue/runtime-core/dist/runtime-core.esm-bundler.js'))
          injectVueRuntime(mgcStr)

        // vite dev only
        if (formatId.includes('.vite/deps/vue.js')
        || (formatId.includes('.vite/deps/chunk') && code.includes('__isVue')))
          injectVueRuntime(mgcStr)

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
    },
  ]
}
const unplugin = createUnplugin(unVueCESubStyle)
export const viteVueCESubStyle = unplugin.vite
export const rollupVueCESubStyle = unplugin.rollup
export const webpackVueCESubStyle = unplugin.webpack
export const esbuildVueCESubStyle = unplugin.esbuild
