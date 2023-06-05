import { unVueCEVModel } from '@unplugin-vue-ce/v-model'
import { unVueCESubStyle } from '@unplugin-vue-ce/sub-style'
import { unVueCEShadow } from '@unplugin-vue-ce/switch-shadow'
import { createUnplugin } from 'unplugin'
export interface Options {
  css?: 'tailwind' | 'windi' | 'uno'
}
const unplugin = createUnplugin<Options>((options: Options = {}) => {
  return [
    unVueCEVModel(),
    unVueCESubStyle(options),
    unVueCEShadow(),
  ]
})
export const viteVueCE = unplugin.vite
export const rollupVueCE = unplugin.rollup
export const webpackVueCE = unplugin.webpack
export const esbuildVueCE = unplugin.esbuild
