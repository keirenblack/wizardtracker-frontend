const path = require('path');
const distPath = path.resolve(__dirname, 'dist');

module.exports = {
  entry: [
    './src/index.tsx',
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
    extensions: ['.ts', '.tsx', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true
            }
          }
        ],
        exclude: [
          "node_modules"
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
        test: /\.(woff2?)$/,
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
    contentBase: distPath
  }
}

