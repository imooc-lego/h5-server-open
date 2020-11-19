/**
 * @description webpack dev config
 * @author 双越
 */

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackCommonConf = require('./webpack.common')

module.exports = merge(webpackCommonConf, {
    mode: 'production',
    output: {
        filename: 'main.[contentHash:8].js', // 打包代码时，加上 hash 戳
        // publicPath: 'http://cdn.abc.com'  // 修改所有静态文件 url 的前缀（如 cdn 域名），这里暂时用不到
    },
    plugins: [
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        // css 文件加 hash
        new MiniCssExtractPlugin({
            filename: 'style.[contentHash:8].css',
        }),
        new CleanWebpackPlugin(),
    ],
    optimization: {
        // 压缩 css
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
})
