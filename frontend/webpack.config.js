const merge = require('webpack-merge')
const parts = require('./webpack.parts')

const commonConfig = merge([
  parts.start(),
  parts.IO(),
  parts.loaders(),
  parts.loadHtml(),
  parts.cssExtract()
])

const productionConfig = merge([
  //parts.cleanDist(),
  parts.manifest(),
  parts.generateFavicon(),
  parts.minify(),
  parts.minimizeImages()
])

const developmentConfig = merge([
  parts.devServer({
    // customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT
  })
])

module.exports = (mode) => mode === 'production' ? merge(commonConfig, productionConfig, { mode }) : merge(commonConfig, developmentConfig, { mode })
