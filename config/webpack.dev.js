/**
 * Created by slyang on 17/10/7.
 */
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const rootProject = path.resolve(__dirname, '../');

function resolve(dir) {
    return path.resolve(rootProject, dir);
}

module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        contentBase: resolve('dist'),
        port: 8000,
        open: true,
        // 客户端代理
        proxy: {
            //  "/test": "http://localhost:3000",
            //  http://localhost:8000/test/yourpath
            //  http://localhost:3000/test/yourpath
            "/test": {
                target: "http://localhost:3000",
                // url 规则重写机制
                pathRewrite: {"^/test": "test"}
            }
        }
    },
    output: {
        // publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /(node_modules|bower_components)/,
                include: resolve('src'),
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
});