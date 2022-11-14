module.exports = function (api) {
    api.cache(true);

    const presets = ["next/babel"];
    const plugins = [
        ["import", {libraryName: "antd", style: true}],
        [
            "styled-components",
            {
                ssr: true,
            },
        ],
        ["babel-plugin-module-resolver", {
            "alias": {
              "^effector$": "effector/compat",
              "^effector-react$": "effector-react/compat"
            }
        }]
    ];

    return {
        presets,
        plugins,
    };
};