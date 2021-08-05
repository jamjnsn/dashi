const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const BrowserSyncPlugin = require('browser-sync-webpack-plugin')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	plugins: [
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			proxy: 'http://localhost:8000/',
			files: ['resources/**']
		})
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					'vue-style-loader',
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							additionalData: `@import "resources/sass/utilities.scss";`
						}
					}
				]
			}
		]
	}
})
