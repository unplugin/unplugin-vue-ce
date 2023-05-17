# @unplugin-vue-ce/v-model

## Install

```bash
npm i @unplugin-vue-ce/v-model
```
or
```bash
yarn add @unplugin-vue-ce/v-model
```
or
```bash
pnpm add @unplugin-vue-ce/v-model
```

## Usage
<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { viteVueCEVModel } from '@unplugin-vue-ce/v-model'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
export default defineConfig({
  plugins: [
    vue(),
    viteVueCEVModel() as PluginOption,
  ],
})
```

</details>
<br>
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import { rollupVueCEVModel } from '@unplugin-vue-ce/v-model'
export default {
  plugins: [
    rollupVueCEVModel(),
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
    require('@unplugin-vue-ce/v-model').webpackVueCEVModel(),
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
      require('@unplugin-vue-ce/v-model').webpackVueCEVModel({}),
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
import { esbuildVueCEVModel } from '@unplugin-vue-ce/v-model'

build({
  plugins: [esbuildVueCEVModel()],
})
```
</details>