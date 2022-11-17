const withPlugins = require("next-compose-plugins");
const withAntdLess = require("next-plugin-antd-less");

module.exports = withPlugins(
    [
        [
            withAntdLess,
            {
                modifyVars: {
                    "@primary-color": "#53A2BE",
                    "@background-color-base": "#0A2239",
                    "@layout-body-background": "#0A2239",
                    "@layout-footer-background": "#0A2239",
                    "@layout-header-background": "#0A2239",
                    "@layout-header-height": "100px",
                    "@layout-header-padding": "0px",
                    "@card-background": "#132E32",
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