import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteVueCEVModel } from '../../dist'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
    viteVueCEVModel(),
  ],
  build: {
    minify: false,
  },
})
