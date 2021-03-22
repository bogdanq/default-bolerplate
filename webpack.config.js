const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin")
const TerserWebpackPlugin = require("terser-webpack-plugin")
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin")

const isDevelopment = process.env.NODE_ENV === "development"

const getFileNameByEnv = (ext = "[ext]", name = "[name]") => {
  return isDevelopment ? `${name}.${ext}` : `${name}.[contenthash].${ext}`
}

module.exports = {
  mode: process.env.NODE_ENV || "development",
  context: path.resolve(__dirname, "src"),
  entry: {
    main: path.resolve(__dirname, "src/index.js"),
  },
  output: {
    // разбить код на файлы
    filename: getFileNameByEnv("js"),
    path: path.resolve(__dirname, "dist"),
  },
  optimization: isDevelopment
    ? {}
    : {
        minimize: true,
        minimizer: [new OptimizeCssAssetWebpackPlugin()],
      },
  plugins: [
    new HtmlWebpackPlugin({
      title: "hello webpack",
      template: path.resolve(__dirname, "public/index.html"),
      filename: "index.html",
      inject: true,
      minify: {
        collapseWhitespace: !isDevelopment,
        removeComments: !isDevelopment,
        removeAttributeQuotes: !isDevelopment,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${getFileNameByEnv("css")}`,
      chunkFilename: getFileNameByEnv("css", "[id]"),
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      // просто скопирует код из папки в папку без изменений
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "dist/assets"),
        },
      ],
    }),
    isDevelopment
      ? () => ({})
      : new ImageMinimizerPlugin({
          minimizerOptions: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      removeViewBox: false,
                    },
                  ],
                },
              ],
            ],
          },
        }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/, /\.module\.css$/],
        use: [
          isDevelopment
            ? "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: path.resolve(__dirname, "dist/css"),
                },
              },
          {
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/,
        exclude: /node_modules/,
        use: [
          isDevelopment
            ? // Creates `style` nodes from JS strings
              "style-loader"
            : {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  publicPath: path.resolve(__dirname, "dist/css"),
                },
              },
          {
            // Translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: isDevelopment,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `./img/${getFileNameByEnv()}`,
            },
          },
        ],
      },
      {
        test: /\.(?:|woff2)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: `./fonts/${getFileNameByEnv()}`,
            },
          },
        ],
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx"],
    alias: {
      "@app": path.resolve(__dirname, "src/"),
      "@redux": path.resolve(__dirname, "src/redux"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, "dist"),
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  devtool: !isDevelopment ? false : "source-map",
  stats: "errors-only",
}
