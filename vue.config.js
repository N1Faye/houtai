const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/heima': {
        target: 'http://liufusong.top:8899/api/private/v1/',
        changeOrigin: true,
        pathRewrite: { '^/heima': '' }
      }
    }
  }
})
