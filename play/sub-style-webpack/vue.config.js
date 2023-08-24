const { defineConfig } = require('@vue/cli-service')
const { webpackVueCE } = require('../../dist/index.cjs')
// eslint-disable-next-line import/order
const UnoCSS = require('@unocss/webpack').default
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      webpackVueCE({}),
      UnoCSS(),
    ],
  },
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.customElement = true
        return options
      })
  },
})
