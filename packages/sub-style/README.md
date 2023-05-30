# @unplugin-vue-ce/sub-style

The implementation principle of `@unplugin-vue-ce/sub-style` comes from [vue/core pr #7942](https://github.com/vuejs/core/pull/7942)

> Tips: ⚠ This plugin will inject the implementation code into the vue runtime, which is what I have to tell you.
> If you have any problems using it, please submit an issue

## Snapshot

![style.gif](..%2F..%2Fpublic%2Fstyle.gif)

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

> Tips: You need to enable the `customElement` option of `@vitejs/plugin-vue`

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