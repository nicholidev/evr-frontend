const withPlugins = require("next-compose-plugins");
const withAntdLess = require("next-plugin-antd-less");

module.exports = withPlugins(
  [
    [
      withAntdLess,
      {
        modifyVars: {
          "@primary-color": "#000000",
        },
        cssLoaderOptions: {},
      },
    ],
  ],
  {
    env: {
      API_ENDPOINT: process.env.API_ENDPOINT,
    },
    images: {
      domains: ['https://file.forextrader.org']
    },
  }
);