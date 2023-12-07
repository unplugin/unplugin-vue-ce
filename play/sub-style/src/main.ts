/* import {
  createApp,
  defineCustomElement,
} from '../patches/vue.esm-browser.js'; */

import { createApp, defineCustomElement } from 'vue'

import App from './App.vue'
import Foo from './bwsy-ce-foo.ce.vue'
const app = createApp(App)
customElements.define('bwsy-ce-foo', defineCustomElement(Foo))
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag === 'bwsy-ce-foo'
}
app.mount('#app')

/* import App from './nested/vue-app.ce.vue'
const app = createApp(App);

const ceApp = defineCustomElement(App);
customElements.define('vue-app', ceApp);
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag === 'vue-app';
}; */

// import App from './nested/vue-app.ce.vue'
/* import App from './deep/Foo.ce.vue'
const app = createApp(App);

const ceApp = defineCustomElement(App);
customElements.define('vue-app', ceApp);
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag === 'vue-app';
}; */

/* import App from './scoped/my-component.vue'
// const app = createApp(App);

const ceApp = defineCustomElement(App)
customElements.define('vue-app', ceApp) */

/*
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag === 'vue-app';
}; */

/*
import App from './nested-same-component/same.vue'
const ceApp = defineCustomElement(App)
customElements.define('vue-app', ceApp)
*/

/* import App from './edison/A.ce.vue'
const ceApp = defineCustomElement(App)
customElements.define('vue-app', ceApp) */
