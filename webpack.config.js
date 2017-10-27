const path = require('path');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/index.jsx',
    './src/html/index.pug',
    './src/scss/global.scss'
  ],
  output: {
    path: distPath,
    filename: 'bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      "node_modules",
    ],
    extensions: ['.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react']
            }
          }
        ]
      },
      {
        test: /\.pug$/,
        use: [
          'file-loader?name=[name].html',
          'extract-loader',
          'html-loader',
          {
            loader: 'pug-html-loader',
            options: {
              doctype: 'html',
              pretty: true,
              inlineRuntimeFunctions: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(ttf|woff|woff2|eot?)$/,
        use: [
          'file-loader?name=fonts/[name].[ext]',
        ]
      },
      {
        test: /\.(png|svg)$/,
        use: [
          'file-loader?name=images/[name].[ext]',
        ]
      }
    ]
  },

  devtool: 'inline-source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: distPath,
    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
        pathRewrite: { '^/api': '' }
      }
    }
  }
}

