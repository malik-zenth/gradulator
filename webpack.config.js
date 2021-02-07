const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

// add paths for subdomains here
const paths  = [
  "impressum",
  "kontakt",
  "erklarung"
]


let multipleHtmlPlugins = paths.map(name => {
  return new HtmlWebPackPlugin({
    template: "./static/index.html",
    filename: `../docs/${name}/index.html`,
  })
});

module.exports = {
    entry: "./src/index.tsx",
    devServer: {
      contentBase: path.join(__dirname, 'docs'),
      compress: true,
      port: 9000
    },
    module: {
      rules: [
        {
            test: /\.(jpe?g|png|gif|svg)$/,
            loader: require.resolve("file-loader") + "?name=../[path][name].[ext]"
        },
        {
          test: /\.(js|tsx)$/,
          exclude: /node_modules/,
          use: "ts-loader"
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(ttf)$/,
          use: {
            loader: "url-loader"
          }
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../docs/index.html",
        }),
        new HtmlWebPackPlugin({
          template: "./static/index.html",
          filename: "../docs/404.html"
        }),
      new MiniCssExtractPlugin({
          filename: "style.css",
          path: path.resolve(__dirname, "docs")
        })
      ].concat(multipleHtmlPlugins),
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "docs")
    }
  };