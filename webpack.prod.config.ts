import path from "path";
import webpack, { EnvironmentPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import WorkboxPlugin from "workbox-webpack-plugin";
const config: webpack.Configuration = {
  mode: "production",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "build"),
    // used the [name] token to allow Webpack to name the files if our app is code split.
    // We use [contenthash] token so that the bundle file name changes when its content changes,
    // which busts the browser cache.
    filename: "[name].[contenthash].js",
    clean: true, // Clean the output directory before emit.
    publicPath: ""
  },
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
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@employer-tracker-ui": path.resolve(__dirname, "src/")
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      title: "Employer Tracker PWA",
      favicon: "./public/favicon.ico"
    }),
    new EnvironmentPlugin({
      NODE_ENV: "production", // Set process.env.NODE_ENV to be 'production'
      DEBUG: false
    }),
    new WorkboxPlugin.GenerateSW({
      // These make sure that only one version of the website is running.
      clientsClaim: true,
      skipWaiting: true
    })
  ]
};

export default config;
