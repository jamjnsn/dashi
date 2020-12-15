const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, "resources", "app.js")
    },
    output: {
        path: path.resolve(__dirname, "public")
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "resources", "app.html")
        }),
        new VueLoaderPlugin()
    ]
}