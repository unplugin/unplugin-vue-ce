import { createApp, defineCustomElement, getCurrentInstance, h } from 'vue'
import type { App, Component, ComponentInternalInstance, Plugin } from 'vue'

export type Data = Record<string, unknown> | null

export type PluginOption = Record<any, any>

export type PluginsType = Array<{ plugin: Plugin, option: PluginOption }>

export type instanceProvides = ComponentInternalInstance & { provides: Record<any, any> }

// TODO: support ssr ？
export function createCEApp(
  rootComponent: Component,
  rootProps?: Data) {
  const pluginsSet = new Set()
  const plugins: PluginsType = []
  const usePlugin = (plugin: Plugin, option?: PluginOption) => {
    if (!pluginsSet.has(plugin)) {
      pluginsSet.add(plugin)
      plugins.push({ plugin, option: option || {} })
    }
  }

  const app: App = createApp(rootComponent)
  const rootCEComponent = () => defineCustomElement({
    setup() {
      plugins.forEach((value) => {
        app!.use(value.plugin, value.option)
      })

      const inst = getCurrentInstance()
      inst && Object.assign(inst.appContext, app._context)
      inst && Object.assign((inst as instanceProvides).provides, app._context.provides)

      return () => h(rootComponent, rootProps)
    },
  })

  const mount = (ceName: string) => {
    customElements.define(ceName, rootCEComponent())
  }
  return {
    ...app,
    mount,
    use: usePlugin,
  }
}
