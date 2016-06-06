"use strict";

const path = require("path");
const glob = require("glob");

module.exports = {
  title: "React Style Guide Example",
  defaultExample: true,
  components: function() {
    return glob.sync(path.resolve(__dirname, "src/components/**/*.js")).filter(module => {
      return /\/[A-Z]\w*\.js$/.test(module);
    });
  },
  updateWebpackConfig: (webpackConfig, env) => {
    webpackConfig.entry.push(path.join(__dirname, "css/style.css"));

    webpackConfig.module.loaders.push(
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel"
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "css"),
        loader: "style!css?importLoaders=1"
      }
    );

    return webpackConfig;
  }
};
