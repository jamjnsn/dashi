const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
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
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    "vue-style-loader",
                    "style-loader",
                    "css-loader",
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData : `@import "resources/sass/utilities.scss";`
                        }
                    }
                ],
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
            template: path.resolve(__dirname, "resources", "app.html")
        }),
        new VueLoaderPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8000/'
        })
    ]
}