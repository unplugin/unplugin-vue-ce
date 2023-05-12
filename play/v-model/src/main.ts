import { createApp, defineCustomElement } from 'vue'
import App from './App.vue'
import Input from './components/Input.ce.vue'
import SubInput from './components/SubInput.vue'
const app = createApp(App)

const ceInput = defineCustomElement(Input)
const ceSubInput = defineCustomElement(SubInput)
customElements.define('ce-input', ceInput)
customElements.define('ce-sub-input', ceSubInput)
app.config.compilerOptions.isCustomElement = (tag) => {
  return tag.startsWith('ce-')
}

app.mount('#app')
