var ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "[name].css",
  disable: process.env.NODE_ENV === "development"
});
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: [
    // "babel-polyfill",
    // "./src/styles.less",
    "./src/app.js"
  ].concat(
    process.NODE_ENV == "development"
      ? ["webpack-dev-server/client?http://localhost:8080"]
      : []
  ),

  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/dist/"
  },

  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "autoprefixer-loader"
            },
            {
              loader: "less-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: {
            loader: "style-loader"
          }
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    overlay: true
  },

  plugins: [extractLess].concat(
    process.env.NODE_ENV == "production"
      ? [
          new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
              screw_ie8: true,
              keep_fnames: true
            },
            compress: {
              screw_ie8: true
            },
            comments: false
          })
        ]
      : []
  )
};
