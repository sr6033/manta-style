module.exports = {
  mode: 'production',
  entry: __dirname + '/src/index.ts',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'manta-style.js',
    library: 'MantaStyle',
    libraryTarget: 'umd',
    // See https://github.com/webpack/webpack/issues/6522
    globalObject: "typeof self !== 'undefined' ? self : this",
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  externals: {
    '@manta-style/core': '@manta-style/core',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  performance: {
    hints: false,
  },
};
