/**
 * @description webpack common config
 * @author 双越
 */

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { srcPath, distPath } = require('./constants')

module.exports = {
    entry: path.join(srcPath, 'index'),
    output: {
        path: distPath,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
                include: srcPath,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: [
                    MiniCssExtractPlugin.loader, // 注意，这里不再用 style-loader
                    'css-loader',
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),

        new CopyPlugin({
            patterns: [
                // 拷贝 favicon.ico
                {
                    from: path.join(srcPath, 'favicon.ico'),
                    to: path.join(distPath, 'favicon.ico'),
                },
                // 拷贝 MP_verify_CF2giMLYs5C9eiKV.txt ，用于微信分享
                {
                    from: path.join(srcPath, 'MP_verify_CF2giMLYs5C9eiKV.txt'),
                    to: path.join(distPath, 'MP_verify_CF2giMLYs5C9eiKV.txt'),
                },
            ],
        }),
    ],
}
