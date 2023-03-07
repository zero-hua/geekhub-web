module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/dev-api': {
        target: 'http://localhost:9090/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  }
}
console.log('我已經加載過了')
