const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");


module.exports = (env, options) => {
  const isDev = options.mode === 'development';
  const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
  };
  const PAGES_DIR = path.join(PATHS.src, 'pages');
  const pages = [
    'index',
    'ui_kit',
    'registration_login',
    'room_details',
    'search_room'
  ]
    .map((name) => {
      console.log('name: ', name, ', template: ', path.join(PAGES_DIR, `/${name}/${name}.pug`));
      return new HtmlWebpackPlugin({
        template: `./src/pages/${name}/${name}.pug`,
        filename: `${name}.html`,
        chunks: [name, 'vendors'],
      })
    })
  return {
    entry: {
      index: './src/index.js',
      ui_kit:  './src/pages/ui_kit/ui_kit.js',
      'registration_login': `${PAGES_DIR}/registration_login/registration_login.js`,
      'room_details': `${PAGES_DIR}/room_details/room_details.js`,
      'search_room': `${PAGES_DIR}/search_room/search_room.js`
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
      filename: "js/[name].[hash].js",
    },
    plugins: [
      ...pages,
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(
        {
          filename: '[name].css',
          chunkFilename: '[name].css',
          ignoreOrder: true,
        }
      ),
    ],
    optimization: {
      splitChunks: {
        name: false,
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 1,
          },
        },
      },
    },
    module: {
      rules: [{
        test: /\.pug$/,
        loader: 'pug-loader',
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      },
      {
        test: /\.scss$/,
        exclude: `${PATHS.src}/styles/`,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        include: [
          path.resolve(PATHS.src, 'assets/images'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
              publicPath: 'images',
            },
          },
        ],
      }, {
        test: /\.woff2?/,
        use: {
          loader: "file-loader",
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
            publicPath: 'fonts',
          }
        }
      }]
    }
  }
}
