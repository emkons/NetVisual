const {
  resolve
} = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const addCssTypes = require("./config/add-css-types");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = async function (_, env) {
  const isProd = env.mode === "production";
  const nodeModules = resolve(__dirname, "node_modules");
  const componentStyleDirs = [resolve(__dirname, "src/components")];

  await addCssTypes(componentStyleDirs, {
    watch: !isProd
  });

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
      extensions: [".ts", ".tsx", ".scss", ".js"],
      alias: {
        style: resolve(__dirname, 'src/style')
      }
    },
    module: {
      rules: [{
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
        },
        {
          test: /\.(scss|sass|css)$/,
          // Only enable CSS Modules within `src/components/*`
          include: componentStyleDirs,
          use: [
            // In production, CSS is extracted to files on disk. In development, it's inlined into JS:
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: isProd ? '[hash:base64:5]' : '[local]__[hash:base64:5]',
                namedExport: true,
                camelCase: true,
                importLoaders: 1,
                sourceMap: isProd,
                sass: true
              }
            }
          ]
        },
        {
          test: /\.(scss|sass|css)$/,
          // Process non-modular CSS everywhere *except* `src/components/*`
          exclude: componentStyleDirs,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: isProd
              }
            }
          ]
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