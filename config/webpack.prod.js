/**
 * Created by slyang on 17/10/7.
 */

const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
});