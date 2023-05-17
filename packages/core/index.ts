import { unVueCEVModel } from '@unplugin-vue-ce/v-model'
import { unVueCESubStyle } from '@unplugin-vue-ce/sub-style'
import { createUnplugin } from 'unplugin'
const unplugin = createUnplugin(() => {
  return {
    ...unVueCEVModel(),
    ...unVueCESubStyle(),
  }
})
export const viteVueCE = unplugin.vite
export const rollupVueCE = unplugin.rollup
export const webpackVueCE = unplugin.webpack
export const esbuildVueCE = unplugin.esbuild
