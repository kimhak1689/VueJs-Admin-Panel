const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  lintOnSave:false,
    pwa: {
      workboxOptions: {
        exclude: [/_redirects/]
      }
    }
})
