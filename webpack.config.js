const path = require('path')
const webpack = require('webpack')
const {CheckerPlugin} = require('awesome-typescript-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: {
    index: './src/index.tsx',
    demo: './src/demo.tsx'
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin(),
    new CheckerPlugin()
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  },

  devServer: {
    open: false
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  }
}
