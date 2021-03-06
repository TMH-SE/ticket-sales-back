const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100']
    })
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  }
}
