/**
 * @description webpack dev config
 * @author 双越
 */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackCommonConf = require('./webpack.common')

module.exports = merge(webpackCommonConf, {
    mode: 'development',
    output: {
        filename: 'main.js',
    },
    plugins: [
        // 分离 css 文件
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV),
        }),
    ],
})
