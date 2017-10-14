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
        contentBase: './dist'
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