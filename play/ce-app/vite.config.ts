import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteVueCE } from '../../dist'
export default defineConfig({
  plugins: [
    vue({
      customElement: true,
    }),
    viteVueCE(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    minify: false,
    sourcemap: false,
  },
})
