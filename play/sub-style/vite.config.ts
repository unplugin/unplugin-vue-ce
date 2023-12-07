import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import { viteVueCE } from '../../dist'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
    viteVueCE({
      isESCSS: true,
    }),
    Inspect(),
  ],
  build: {
    minify: false,
  },
})
