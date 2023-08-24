import { createApp, defineCustomElement } from 'vue'
import 'uno.css'
import App from './App.vue'
import Foo from './bwsy-ce-foo.ce.vue'
const app = createApp(App)
customElements.define('bwsy-ce-foo', defineCustomElement(Foo))
app.mount('#app')
