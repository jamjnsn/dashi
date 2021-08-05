const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	output: {
		publicPath: ''
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'app.css'
		})
	],
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
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
