const { resolve } = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const addCssTypes = require("./config/add-css-types");

module.exports = async function(_, env) {
  const isProd = env.mode === "production";
  const nodeModules = resolve(__dirname, "node_modules");
  const componentStyleDirs = [resolve(__dirname, "src/components")];

  await addCssTypes(componentStyleDirs, { watch: !isProd });

  return {
    devtool: "source-map",
    entry: {
      "first-interaction": "./src/app"
    },
    mode: "development",
    output: {
      path: resolve(__dirname, "build"),
      filename: "app.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".scss", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: nodeModules,
          loaders: ["ts-loader"]
        },
        {
          test: /\.(scss|sass)$/,
          loader: "sass-loader",
          enforce: "pre",
          options: {
            sourceMap: true,
            includePaths: [nodeModules]
          }
        }
      ]
    },
    plugins: [
      new HtmlPlugin({
        filename: resolve(__dirname, "build/index.html"),
        template: "src/index.html",
        minify: isProd && {
          collapseWhitespace: true,
          removeStrictTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeRedundantAttributes: true,
          removeComments: true
        },
        inject: "body",
        compile: true
      })
    ],
    node: {
      console: false,
      global: true,
      process: false,
      __filename: "mock",
      __dirname: "mock",
      Buffer: false,
      setImmediate: false
    },
    devServer: {
      contentBase: resolve(__dirname, "src"),
      compress: true,
      historyApiFallback: true,
      clientLogLevel: "none",
      stats: "minimal",
      overlay: false
    }
  };
};
