import { createUnplugin } from 'unplugin'
import { setGlobalPrefix } from 'baiwusanyu-utils'
import MagicString from 'magic-string'
import { NAME } from '@unplugin-vue-ce/utils'
import { injectVueRuntime } from './src/inject/inject-vue-runtime'
import { atomicCSSPreset, virtualTailwind, virtualUno, virtualWindi } from './src/atomic-css'

export const unVueCESubStyle = (): any => {
  setGlobalPrefix(`[${NAME}]:`)
  let cssCompileRes = ''
  return [
    {
      name: `${NAME}:sub-style:pre`,
      enforce: 'pre',
      resolveId(id: string) {
        if (atomicCSSPreset[id as keyof typeof atomicCSSPreset])
          return `\0${id}`
      },
      load(id: string) {
        if (id === `\0${virtualTailwind}` || id === `\0${virtualWindi}` || id === `\0${virtualUno}`) {
          return {
            code: '',
          }
        }
      },
      transformInclude() {
        return true
      },
      async transform(code: string, id: string) {
        const mgcStr = new MagicString(code)
        if (id.includes('__uno.css'))
          cssCompileRes = code

        if (id.endsWith('.vue') && code.includes(virtualTailwind))
          mgcStr.prependRight(mgcStr.length(), atomicCSSPreset[virtualTailwind])

        if (id.endsWith('.vue') && code.includes(virtualUno)){
          mgcStr.prependRight(mgcStr.length(), `<style>${cssCompileRes}</style>`)
          if(cssCompileRes.includes('text-red')){
            console.log('cssCompileRes ######################################\n', cssCompileRes)
            console.log('code ######################################\n', mgcStr.toString())
          }
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
    {
      name: `${NAME}:sub-style:post`,
      enforce: 'post',
      resolveId(id: string) {
        if (id === virtualTailwind)
          return `\0${virtualTailwind}`
      },
      load(id: string) {
        if (id === `\0${virtualTailwind}`) {
          return {
            code: '',
          }
        }
      },
      transformInclude() {
        return true
      },
      async transform(code: string, id: string) {
        const mgcStr = new MagicString(code)

        // build only
        if (id.includes('@vue/runtime-dom/dist/runtime-dom.esm-bundler.js'))
          injectVueRuntime(mgcStr)

        // build only
        if (id.includes('@vue/runtime-core/dist/runtime-core.esm-bundler.js'))
          injectVueRuntime(mgcStr)

        // dev only
        if (id.includes('.vite/deps/vue.js')
        || (id.includes('.vite/deps/chunk') && code.includes('__isVue')))
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
