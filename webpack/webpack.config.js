const Path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = (options) => {
  const webpackConfig = {
    mode: options.isProduction ? 'production' : 'development',
    devtool: options.devtool,
    entry: [
      // `webpack-dev-server/client?https://www.runesx.com:${+options.port}`,
      'webpack-dev-server/client?https://localhost',
      'webpack/hot/dev-server',
      Path.join(__dirname, '../src/app/index'),
    ],
    output: {
      path: Path.join(__dirname, '../dist'),
      filename: `./scripts/[name].${options.jsFileName}`,
      chunkFilename: '[id].[chunkhash].js',
      publicPath: '/',
    },
    optimization: {
      chunkIds: 'total-size',
      moduleIds: 'size',
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
              ],
            },
          },
        }),
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            ecma: 6,
            compress: {
              drop_console: true,
            },
            output: {
              comments: !!options.isProduction,
            },
          },
        }),
      ],
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            enforce: true,
            chunks: 'all',
          },
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        // path: require.resolve('path-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url/'),
        buffer: require.resolve('buffer/'),
        fs: false,
        module: false,
        typescript: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.(gif|png|jpe?g)$/i,
          type: 'asset',
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: 'file-loader',
              options: {
                name: 'static/images/[name].[hash].[ext]',
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
        {
          test: /\.(eot|woff|woff2|ttf)(\?\S*)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'Fonts/',
              publicPath: '../Fonts/',
            },
          }],
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /.jsx?$/,
          include: Path.join(__dirname, '../src/app'),
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
              plugins: [
                '@babel/plugin-transform-runtime',
              ],
            },
          },
        }],
    },

    plugins: [
      new Webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      new Webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
      new HtmlWebpackPlugin({
        template: Path.join(__dirname, '../src/index.html'),
        NODE_ENV: options.isProduction ? 'production' : 'development',
        minify: {
          removeComments: false,
        },
      }),
    ],
  };

  if (options.isProduction) {
    webpackConfig.entry = [Path.join(__dirname, '../src/app/index')];

    // webpackConfig.plugins.push(
    //  new Webpack.optimize.OccurrenceOrderPlugin(),
    // );

    webpackConfig.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: Path.join(__dirname, '../static'),
            to: Path.join(__dirname, '../dist/static'),
            // context: 'app/',
          },
        ],
      }),
    );

    webpackConfig.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader', // or MiniCssExtractPlugin.loader
        { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
        { loader: 'sass-loader', options: { sourceMap: true } },
      ],
    });

    webpackConfig.plugins.push(
      new WebpackObfuscator({
        rotateStringArray: true,
      }, ['excluded_bundle_name.js']),
    );
  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin(),
    );

    webpackConfig.module.rules.push({
      rules: [
        {
          test: /\.scss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    });

    webpackConfig.devServer = {
      // contentBase: Path.join(__dirname, '../'),
      // disableHostCheck: true,
      hot: true,
      port: options.port,
      // inline: true,
      // progress: true,
      historyApiFallback: true,
      // stats: 'errors-warnings',
      host: 'localhost',
      // public: 'localhost',
    };
  }

  return webpackConfig;
};
