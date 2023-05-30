# unplugin-vue-ce
A vue plugin that extends vue's Custom Element capabilities (v-model, child style)

English | [中文](https://github.com/baiwusanyu-c/unplugin-vue-ce/blob/master/README.ZH-CN.md)

## Feature

* 🧩 It is a function extension of vue
* 🌈 Compatible with multiple bundled platforms（vite、webpack）
* ⛰ Support v-model
*  ⚡ Support child style

> Tips: ⚠ This plugin will inject the implementation code into the vue runtime, which is what I have to tell you. 
> If you have any problems using it, please submit an issue

## Install

```bash
npm i unplugin-vue-ce -D
```
or
```bash
yarn add unplugin-vue-ce-D
```
or
```bash
pnpm add unplugin-vue-ce -D
```

## Usage

> Tips: You need to enable the `customElement` option of `@vitejs/plugin-vue`

<details>
<summary>Vite</summary>

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { viteVueCE } from 'unplugin-vue-ce'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
export default defineConfig({
  plugins: [
    vue(),
    viteVueCE() as PluginOption,
  ],
})
```

</details>
<br>
<details>
<summary>Rollup</summary>

```ts
// rollup.config.js
import { rollupVueCE } from '@nplugin-vue-ce'
export default {
  plugins: [
    rollupVueCE(),
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
    require('unplugin-vue-ce').webpackVueCE(),
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
      require('unplugin-vue-ce').webpackVueCE({}),
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
import { esbuildVueCE } from 'unplugin-vue-ce'

build({
  plugins: [esbuildVueCE()],
})
```
</details>


## Support v-model

view more details [@unplugin-vue-ce/v-model](https://github.com/baiwusanyu-c/unplugin-vue-ce/tree/master/packages/v-model/README.md)

## Support the style of child components

view more details [@unplugin-vue-ce/sub-style](https://github.com/baiwusanyu-c/unplugin-vue-ce/blob/master/packages/sub-style/README.md)


## Support switch shadow

view more details [@unplugin-vue-ce/sub-style](https://github.com/baiwusanyu-c/unplugin-vue-ce/blob/master/packages/switch-shadow/README.md) 