module.exports = require('./webpack.config')({
  isProduction: true,
  devtool: false,
  jsFileName: 'app.[fullhash].js',
  cssFileName: 'app.[fullhash].css',
});
