const withCSS = require("@zeit/next-css");
module.exports = withCSS();

// This is for hot-reloading to work with docker on dev environment
module.exports = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300
    };

    return config;
  }
};

module.exports = { distDir: "build" };
