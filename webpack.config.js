const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const BundleTracker = require('webpack-bundle-tracker');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
module.exports = {
  mode: 'none',
  entry:
  {
    index: {
      import: './src/index.ts',
      dependOn: 'shared'
    },
    // https://webpack.js.org/guides/code-splitting/#entry-dependencies
    another: {
      import: './src/another-module.ts',
      dependOn: 'shared',
    },
    shared: 'lodash',
    // another: './src/another-module.js',
  },


  output: {
    path: path.resolve(__dirname, '../backend/cloud_user/static'),
    filename: 'scripts/main-[id]-[fullhash].js',
    publicPath: '/',
    clean: true,
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all',
  //   },
  // },
  // https://webpack.js.org/guides/code-splitting/#entry-dependencies
  optimization: {
    runtimeChunk: 'single',
  },
  performance: {
    maxAssetSize: 800000, // Set max asset size to 300 KiB
    maxEntrypointSize: 800000, // Set max entry point size to 300 KiB
    hints: 'warning', // Can be 'error', 'warning', or false
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
    new BundleTracker({
      path: path.join(__dirname, 'src/bundles'),
      filename: 'webpack-stats.json'
    }),
    /* Use tools like webpack-bundle-analyzer to visualize the size of your bundles and identify large dependencies*/
    // new BundleAnalyzerPlugin(),


    new HtmlWebpackPlugin({
      template: 'src/public/index.html',
      filename: "../../templates/users/index.html"
    }),
    new webpack.SourceMapDevToolPlugin({
      test: /\.tsx?$/,
      filename: './dist/maps/[file].map.[query]',
      include: path.resolve(__dirname, 'src/'),
    }),

    new ESLintPlugin({
      files: 'src/',

    }),

    new MiniCssExtractPlugin({
      filename: 'styles/style.css'
    }),
  ],
  watchOptions: {
    ignored: [
      "node_modules",
      "**/node_modules"
    ]
  },
  resolve: {
    extensions: [".tsx", ".jsx", ".ts", ".js", ".svg"],
    plugins: [new TsconfigPathsPlugin(),],
    modules: [
      path.resolve(__dirname, "./.browserslistrc"),
      path.resolve(__dirname, "node_modules"),
      // path.resolve(__dirname, "dist")
    ],

    alias: {
    }
  },

};

