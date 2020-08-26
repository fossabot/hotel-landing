const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {
  const PATHS = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'docs'),
  };
  const PAGES_DIR = path.join(PATHS.src, 'pages');
  const pages = [
    'index',
    'ui_kit',
    'register',
    'login',
    'room_details',
    'search_room',
  ]
    .map((name) => new HtmlWebpackPlugin({
      template: `./src/pages/${name}/${name}.pug`,
      pretty: true,
      filename: `${name}.html`,
      chunks: [name, 'vendors'],
    }));
  return {
    entry: {
      main: './src/main.js',
      index: `${PAGES_DIR}/index/index.js`,
      ui_kit: `${PAGES_DIR}/ui_kit/ui_kit.js`,
      login: `${PAGES_DIR}/login/login.js`,
      register: `${PAGES_DIR}/register/register.js`,
      room_details: `${PAGES_DIR}/room_details/room_details.js`,
      search_room: `${PAGES_DIR}/search_room/search_room.js`,
    },
    devtool: 'eval-source-map',
    devServer: {
      overlay: {
        warnings: true,
        errors: true,
      },
      watchOptions: {
        ignored: /node_modules/,
      },
    },
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'js/[name].[hash].js',
    },
    plugins: [
      ...pages,
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(
        {
          filename: '[name].css',
          chunkFilename: '[name].css',
          ignoreOrder: true,
        },
      ),
      new FaviconsWebpackPlugin(`${PATHS.src}/favicons/favicon.png`),
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
        loader: ['babel-loader', 'eslint-loader'],
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
        ],
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        include: [
          path.resolve(PATHS.src, 'assets'),
        ],
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
              name: '[name].[ext]',
              publicPath: 'images',
              esModule: false,
            },
          },
        ],
      }, {
        test: /\.woff2?/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts',
            publicPath: 'fonts',
          },
        },
      }],
    },
  };
};
