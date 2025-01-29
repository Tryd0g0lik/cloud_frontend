const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const BundleTracker = require('webpack-bundle-tracker');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  cache: false, // the cache is close
  mode: 'none',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/scripts/main-[id]-[fullhash].js',
    publicPath: '/',
    clean: true,

  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(tsx|jsx|ts|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, './babel.config.js'),
            }
          },
        ],
        exclude: [
          path.resolve(__dirname, "node_modules"),

        ]

      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader',

        ],

      },

    ]
  },

  plugins: [
    new Dotenv(),
    new CleanWebpackPlugin(), // the 'dist/' is cleans
    new BundleTracker({
      path: path.join(__dirname, 'src/bundles'),
      filename: 'webpack-stats.json'
    }),

    // new SpriteLoaderPlugin(), // svg

    new HtmlWebpackPlugin({
      template: 'src/public/index_dev.html',
      filename: "index.html"
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.tsx?$/,
      filename: 'dist/maps/[file].map.[query]',
      include: path.resolve(__dirname, 'src/'),
    }),

    new ESLintPlugin({
      files: 'src/',

    }),

    new MiniCssExtractPlugin({
      filename: 'static/styles/output.css'
    }),
  ],
  watchOptions: {
    ignored: [
      "node_modules",
      "**/node_modules"
    ]
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // '../static'

    },


    watchFiles: [
      'dist',
    ],
    hot: true, // Включение горячей перезагрузки
    liveReload: true, // Включение live-reload

    compress: true,
    historyApiFallback: true,
    host: "127.0.0.1"
    // open: true, // Автоматическое открытие браузера
    // port: 8080
  },

  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".svg"],
    plugins: [new TsconfigPathsPlugin(),],
    modules: [
      path.resolve(__dirname, "./.browserslistrc"),
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "dist")
    ],

    alias: {
    }
  },

};

