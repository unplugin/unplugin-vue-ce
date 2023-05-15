import { unVueCEVModel } from '@unplugin-vue-ce/v-model'
import { createUnplugin } from 'unplugin'
import type { Options } from '@unplugin-vue-ce/v-model/types'
const unplugin = createUnplugin<Options>(() => {
  return {
    ...unVueCEVModel(),
  }
})
export const viteVueCEVModel = unplugin.vite
export const rollupVueCEVModel = unplugin.rollup
export const webpackVueCEVModel = unplugin.webpack
export const esbuildVueCEVModel = unplugin.esbuild
