const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');

const settings = require("./config/settings.json");

module.exports = {
    mode: 'development',
    entry: {
        app: path.resolve(__dirname, "resources", "app.js")
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "resources", "app.html"),
            title: settings.pageTitle ?? "Dashi"
        }),
        new VueLoaderPlugin()
    ]
}