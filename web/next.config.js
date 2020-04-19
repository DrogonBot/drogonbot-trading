const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
module.exports = withCSS(
  withSass({
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 100000,
          },
        },
      });

      return config;
    },
  })
);

// This is for hot-reloading to work with docker on dev environment
module.exports = {
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
};

module.exports = { distDir: "build" };
