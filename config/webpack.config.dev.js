const webpack = require("webpack");
const path = require('path');
const  HtmlWebPackPlugin= require('html-webpack-plugin');
module.exports = {
    entry: ['./src/index.ts'],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            attrs: ["img:src"]
                        }
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: "source-map", // 开启调试
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8000, // 本地服务器端口号
        hot: true, // 热重载
        overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
        proxy: {
            // 跨域代理转发
            "/mapdata": {
                target: "http://localhost:3000",
                changeOrigin: true,
                logLevel: "debug",
                headers: {
                    Cookie: ""
                }
            }
        },
        historyApiFallback: {
            // HTML5 history模式
            rewrites: [{ from: /.*/, to: "/views/index.html" }]
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './views/index.html',
            filename: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
};
