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
  // startpoint
  entry:    [
    path.join(__dirname, '/src/index.js')
  ],
  // on production this returns one bundled js file. To avoid caching a hash is added.
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
      logo:           './public/icon.png',
      statsFilename:  'faviconStats-[hash].json',
      inject:         true,
      title:          'Banter'
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

// core of webpack all files pass this module. based on which kind it is handled by a different loader.
exports.loaders = () => ({
  module: {
    rules: [
      {
        test:     /\.(js|jsx)$/,
        exclude:  /node_modules/,
        // remember that a file is first handled by stylelint then by babel. If there is a styling error. This will cancel the build and return the styling error.
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
        // webpack will if the file is smaller than 25000 inline the image, a source less to load with a call.
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
