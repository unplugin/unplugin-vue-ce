import { unVueCEVModel } from '@unplugin-vue-ce/v-model'
import { type UNVueCESubStyleOption, unVueCESubStyle } from '@unplugin-vue-ce/sub-style'
import { createUnplugin } from 'unplugin'

const unplugin = createUnplugin<UNVueCESubStyleOption>((options: UNVueCESubStyleOption = {}) => {
  return [
    unVueCEVModel(),
    ...unVueCESubStyle(options),
    // unVueCEShadow(),
  ]
})
export const viteVueCE = unplugin.vite
export const rollupVueCE = unplugin.rollup
export const webpackVueCE = unplugin.webpack
export const esbuildVueCE = unplugin.esbuild
