module.exports = require('./webpack.config.js')({
  isProduction: false,
  disableHostCheck: true,
  devtool: 'inline-source-map',
  jsFileName: 'app.js',
  cssFileName: 'app.css',
  port: 8012,
});
