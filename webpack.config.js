const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = (env, options) => {
  const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
  };
  const PAGES_DIR = `${PATHS.src}/pages`;
  return {
    entry: {
      app: `${PATHS.src}/index.js`,
      ui_kit: `${PAGES_DIR}/ui-kit/ui-kit.js`
    },
    devtool: 'eval-source-map',
    devServer: {
      overlay: {
        warnings: true,
        errors: true,
      },
      watchOptions: {
        ignored: /node_modules/,
      }
    },
    output: {
      filename: "[name].[hash].js",
      path: PATHS.dist,
    },
    module: {
      rules: [{
        test: /\.pug$/,
        loader: 'pug-loader',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      }, {
        test: /(c|sc)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }

        ]
      }, {
        test: /\.woff2?/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts'
          }
        }
      }]
    },
    plugins: [
      new CleanWebpackPlugin(),

      new MiniCssExtractPlugin(
        // {
        //   filename: '[name].css',
        //   outputPath: '/',
        // }
      ),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/index.pug`,
        filename: './index.html',
      }),
      new HtmlWebpackPlugin({
        template: `${PAGES_DIR}/ui-kit/ui-kit.pug`,
        filename: 'pages/ui-kit.html',
      }),
    ]
  }
}
