# @unplugin-vue-ce/switch-shadow

The implementation principle of `@unplugin-vue-ce/switch-shadow` comes from [vue/core pr #7971](https://github.com/vuejs/core/pull/7971)

> Tips: ⚠ This plugin will inject the implementation code into the vue runtime, which is what I have to tell you.
> If you have any problems using it, please submit an issue

## Snapshot

TODO

## Install

```bash
npm i @unplugin-vue-ce/switch-shadow
```
or
```bash
yarn add @unplugin-vue-ce/switch-shadow
```
or
```bash
pnpm add @unplugin-vue-ce/switch-shadow
```

## Usage
<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { viteVueCEShadow } from '@unplugin-vue-ce/switch-shadow'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
export default defineConfig({
  plugins: [
    vue(),
    viteVueCEShadow() as PluginOption,
  ],
})
```

</details>
<br>
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import { rollupVueCEShadow } from '@unplugin-vue-ce/switch-shadow'
export default {
  plugins: [
    rollupVueCEShadow(),
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
    require('@unplugin-vue-ce/switch-shadow').webpackVueCEShadow(),
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
      require('@unplugin-vue-ce/switch-shadow').webpackVueCEShadow({}),
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
import { esbuildVueCEShadow } from '@unplugin-vue-ce/switch-shadow'

build({
  plugins: [esbuildVueCEShadow()],
})
```
</details>
