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

## ES module import css( experimental )
via: https://github.com/unplugin/unplugin-vue-ce/issues/118  
`@unplugin-vue-ce/sub-style` Starting from version "1.0.0-beta.19", a new option `isESCSS` is added, which is turned off by default.  
This is an experimental feature.
```ts
// vite.config.ts
import { defineConfig } from 'vite'
import { viteVueCESubStyle } from '@unplugin-vue-ce/sub-style'
import vue from '@vitejs/plugin-vue'
import type { PluginOption } from 'vite'
export default defineConfig({
  plugins: [
    vue(),
    viteVueCESubStyle({
      isESCSS: true
    }) as PluginOption,
  ],
})
```
When `isESCSS` is turned on,`@unplugin-vue-ce/sub-style` will automatically move the css import part of the script block to the style block,   
so that vue-plugin can compile its style. If you do not do this , it will be injected into the head of the document as a global style.  
```vue
<template>
  <div>
    foo
  </div>
</template>
<script setup>
import './test.css'
</script>
```
transform result

```vue
<template>
  <div>
    foo
  </div>
</template>
<script setup>

</script>
<style lang="css">
  @import './test.css';
</style>
```

## About Tailwind CSS
Since vue enables shadow dom by default, 
it will isolate the style, 
so you need to add the root component of each web component to add the reference style:
```html
<!-- xxx.vue -->
<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>
```
or (only vite)
```html
<!-- xxx.vue -->
<script>
  import '@virtual:taiwind'
</script>
```

## About Uno CSS
Only postcss plugins are supported (via: https://unocss.dev/integrations/postcss#install),  
you need to add the root component of each web component to add the reference style:

```html
<!-- xxx.vue -->
<style>
    @unocss preflights;
    @unocss default;
    @unocss;
</style>
```
or (only vite)
```html
<!-- xxx.vue -->
<script>
  import '@virtual:uno'
</script>
```

## About Windi CSS
Windi css is not supported
[Windi CSS is Sunsetting](https://windicss.org/posts/sunsetting.html)
