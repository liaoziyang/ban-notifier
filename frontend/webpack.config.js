/*
  Normaly the webpack config is one big object with a pretty strict order. webpack-merge makes it easier to split these parts up
  and gives the ability to make a dev and prod environment with no code duplication
*/
require('dotenv').config()
const merge = require('webpack-merge')
const parts = require('./webpack.parts')

/*
  Code that is used in both the
  development and production environment
*/
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
    // customize host/port in env
    host: process.env.WP_HOST,
    port: process.env.WP_PORT
  })
])

module.exports = (mode) => mode === 'production' ? merge(commonConfig, productionConfig, { mode }) : merge(commonConfig, developmentConfig, { mode })
