import { defineCustomElement } from 'vue'
import { createPinia } from 'pinia'
import './assets/main.css'
import { createCEApp } from '@unplugin-vue-ce/ce-app'
import App from './App.vue'
import Entry from './Entry.vue'
import router from './router'

const app = createCEApp(App)
app.use(createPinia())
app.use(router)
app.mount('vue-app')

const ceEntry = defineCustomElement(Entry)
customElements.define('ce-entry', ceEntry)
