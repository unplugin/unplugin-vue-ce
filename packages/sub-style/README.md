# @unplugin-vue-ce/sub-style

## Install

```bash
npm i @unplugin-vue-ce/sub-style
```
or
```bash
yarn add @unplugin-vue-ce/sub-style
```
or
```bash
pnpm add @unplugin-vue-ce/sub-style
```

## Usage
<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { viteVueCESubStyle } from '@unplugin-vue-ce/sub-style'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
export default defineConfig({
  plugins: [
    vue(),
    viteVueCESubStyle() as PluginOption,
  ],
})
```

</details>
<br>
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import { rollupVueCESubStyle } from '@unplugin-vue-ce/sub-style'
export default {
  plugins: [
    rollupVueCESubStyle(),
  ],
}
```

</details>
<br>
<details>
<summary>Webpack</summary>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('@unplugin-vue-ce/sub-style').webpackVueCESubStyle(),
  ],
}
```
</details>
<br>
<details>
<summary>Vue CLI</summary>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('@unplugin-vue-ce/sub-style').webpackVueCESubStyle({}),
    ],
  },
}
```

</details>
<br>
<details>
<summary>ESBuild</summary>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import { esbuildVueCESubStyle } from '@unplugin-vue-ce/sub-style'

build({
  plugins: [esbuildVueCESubStyle()],
})
```
</details>