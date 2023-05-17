import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteVueCE } from '../../dist'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
    viteVueCE(),
  ],
  build: {
    minify: false,
  },
})
