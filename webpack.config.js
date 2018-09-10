var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OfflinePlugin = require("offline-plugin");
const webpack = require("webpack");
const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const extractLess = new ExtractTextPlugin({
  filename: "[name].[hash].css",
  disable: process.env.NODE_ENV === "development"
});

function makeEntry(srcArr) {
  return srcArr.concat(
    process.NODE_ENV == "development"
      ? ["webpack-dev-server/client?http://localhost:8080"]
      : []
  );
}

module.exports = {
  entry: {
    bundle: makeEntry([ 
      "./src/app.js"
    ])
  },

  output: { 
    path: path.resolve('./build'),
    filename: "[name].[hash].js",
    publicPath: './build/',
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
      },

      {
        test: /\.html$/,
        use: {
          loader: "html-loader"
        }
      }
    ]
  },
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    overlay: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",  
      filename:'../index.html'
    }),
    extractLess
  ]
    .concat(
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
    .concat([
      new OfflinePlugin({
        responseStrategy: "network-first"
      })
    ])
};
