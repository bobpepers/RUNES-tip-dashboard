module.exports = require('./webpack.config.js')({
  isProduction: true,
  devtool: false,
  jsFileName: 'app.[fullhash].js',
  cssFileName: 'app.[fullhash].css',
});
