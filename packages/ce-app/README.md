# @unplugin-vue-ce/ce-app

The implementation principle of `@unplugin-vue-ce/ce-app` comes from [vue-web-component-wrapper](https://github.com/EranGrin/vue-web-component-wrapper)

> Tips: `@unplugin-vue-ce/ce-app` Seamlessly integrates with Vue ecosystem plugins such as Vuex, Vue Router, and Vue I18n.

## Snapshot

TODO

## Install

```bash
npm i @unplugin-vue-ce/ce-app
```
or
```bash
yarn add @unplugin-vue-ce/ce-app
```
or
```bash
pnpm add @unplugin-vue-ce/ce-app
```

## Usage

```typescript
// main.ts
import { defineCustomElement} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import Entry from './Entry.vue'
import router from './router'
import { createCEApp } from "@unplugin-vue-ce/ce-app";
const app = createCEApp(App)
app.use(createPinia())
app.use(router)
// vue-app is web component name
app.mount('vue-app')

const ceEntry = defineCustomElement(Entry)
customElements.define('ce-entry', ceEntry)
```

```html

<!-- App.vue -->
<template>
  <ce-entry></ce-entry>
</template>

```

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="icon" href="/favicon.ico">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
</head>
<body>
<div id="app">
    <vue-app></vue-app>
</div>
<script type="module" src="/src/main.ts"></script>
</body>
</html>

```