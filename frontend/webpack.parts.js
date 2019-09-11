// const CleanWebpackPlugin = require('clean-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')

exports.start = () => (
  console.log('Webpack has been started..')
)

exports.IO = () => ({
  devtool:  '',
  target:   'web',
  entry:    [
    path.join(__dirname, '/src/index.js')
  ],
  output: {
    chunkFilename:  '[name].js',
    filename:       '[name].bundle.[hash:8].js'
  }
})

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    host:               host,
    port:               port,
    open:               true,
    stats:              'errors-only',
    hot:                true,
    overlay:            true,
    compress:           true,
    historyApiFallback: true, // path changes react router dom.,
    after:              () => console.log('Development server has been started.')
  }
})

exports.generateFavicon = () => ({
  plugins: [
    new FaviconsWebpackPlugin({
      logo:           './src/static/icon/icon.svg',
      statsFilename:  'faviconStats-[hash].json',
      inject:         true,
      title:          'Lowie Vermaete'
    })
  ]
})

//exports.cleanDist = () => ({
//plugins: [
// new CleanWebpackPlugin({
//   dry: true,
//  }),
// ],
//});

exports.loadHtml = () => ({
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
})

exports.cssExtract = () => ({
  plugins: [
    new MiniCssExtractPlugin({
      filename:       '[name].min.css',
      chunkFilename:  '[id].css'
    })
  ]
})

exports.minify = () => ({
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel:       4,
        terserOptions:  {
          ecma:         7,
          warnings:     true,
          output:       true,
          ie8:          false,
          compress:     {},
          mangle:       true
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks:             'all',
      maxInitialRequests: Infinity,
      minSize:            0
    }
  }
})

exports.manifest = () => ({
  plugins: [
    new ManifestPlugin()
  ]
})

exports.minimizeImages = () => ({
  plugins: [
    new ImageminPlugin({
      test:     'dist/**',
      pngquant: {
        quality: '95-100'
      }
    })
  ]
})

exports.loaders = () => ({
  module: {
    rules: [
      {
        test:     /\.(js|jsx)$/,
        exclude:  /node_modules/,
        use:      [
          'babel-loader',
          'stylelint-custom-processor-loader'
        ]
      },
      {
        test: /\.html$/,
        use:  [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use:  [
          MiniCssExtractPlugin.loader,
          {
            loader:   'css-loader',
            options:  {
              importLoaders: 2
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|svg|webp)$/,
        use:  {
          loader:   'url-loader',
          options:  {
            limit:  25000
          }
        }
      }
    ]
  }
})
