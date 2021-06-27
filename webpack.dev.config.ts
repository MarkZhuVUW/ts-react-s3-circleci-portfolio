import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {
  Configuration as WebpackConfiguration,
  EnvironmentPlugin
} from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import WorkboxPlugin from "workbox-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
    // used the [name] token to allow Webpack to name the files if our app is code split.
    // We use [contenthash] token so that the bundle file name changes when its content changes,
    // which busts the browser cache.
    filename: "[name].[contenthash].js"
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript"
            ]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", "json"],
    alias: {
      "@employer-tracker-ui": path.resolve(__dirname, "src/")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Employer Tracker PWA"
    }),
    new ForkTsCheckerWebpackPlugin({
      async: true // can set it to false to make webpack wait for typechecking to finish.
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"]
    }),
    new EnvironmentPlugin({
      NODE_ENV: "development", // Set process.env.NODE_ENV to be 'development'
      DEBUG: true
    })
  ],
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true
  }
};

export default config;
