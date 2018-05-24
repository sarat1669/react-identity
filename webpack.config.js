var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015', 'es2017', 'stage-0']
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve('src'),
        loader: 'eslint-loader',
        options: { }
      }
    ]
  },
  externals: {
    'react': 'commonjs react'
  }
}
