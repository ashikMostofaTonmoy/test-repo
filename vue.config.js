const { defineConfig } = require("@vue/cli-service");
require('dotenv').config();


module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  css: {
    extract: true, // Ensure CSS is extracted
    sourceMap: true // Enable source maps for easier debugging
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
});