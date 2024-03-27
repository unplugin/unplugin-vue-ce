import { createUnplugin } from 'unplugin'
import { extend, normalizePath, setGlobalPrefix } from 'baiwusanyu-utils'
import MagicString from 'magic-string'
import { NAME } from '@unplugin-vue-ce/utils'
import { injectVueRuntime } from './src/inject/inject-vue-runtime'
import { atomicCSSPreset, virtualTailwind, virtualUno } from './src/atomic-css'
import { parseESCSS } from './src/parse'
import { transformESCSS } from './src/transform'
import { injectStyleESCSS } from './src/inject/inject-style-escss'
import type { SFCParseOptions } from '@vue/compiler-sfc'
export interface UNVueCESubStyleOption {
  isESCSS?: boolean
  sfcParseOptions?: SFCParseOptions
}

export const unVueCESubStyle = (options: UNVueCESubStyleOption): any => {
  const defaultOptions = {
    isESCSS: false,
    sfcParseOptions: {},
  }

  const resolvedOptions = extend(defaultOptions, options)

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

          // esm import css transform to style tag
          if (id.endsWith('.vue') && resolvedOptions.isESCSS) {
            const parseRes = parseESCSS(mgcStr.toString(), resolvedOptions.sfcParseOptions)
            transformESCSS(mgcStr, parseRes)
            injectStyleESCSS(mgcStr, parseRes)
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
          || (formatId.includes('sb-vite/deps/chunk') && code.includes('__isVue'))
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
