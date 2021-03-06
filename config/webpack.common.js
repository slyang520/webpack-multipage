/**
 * Created by slyang on 17/10/7.
 */

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootProject = path.resolve(__dirname, '../');
const distPath = path.resolve(rootProject, 'dist');

function resolve(dir) {
    return path.resolve(rootProject, dir);
}

module.exports = {
    entry: {
        appIndex: './src/index.js',
        app01: './src/index.js',
        app02: './src/index.js',
        child01: './src/print.js'
    },
    output: {
        filename: 'static/js/[name].bundle.js?[hash]',
        chunkFilename: 'tttt[id].bundle.js',
        path: distPath
    },
    plugins: [
        new CleanWebpackPlugin([distPath], {
            root: rootProject,
            verbose: true,
        }),
        new CopyWebpackPlugin([
            // webpack 引入的原生JS to  dist/libs
            {from: resolve('libs'), to: 'libs'},
            // 原生页面  to的路径在 打包的根目录下
            {from: resolve('page_native')},
        ], {
            ignore: [
                // Doesn't copy any files with a txt extension
                '*.md',
            ],
            copyUnmodified: true
        }),
        new HtmlWebpackPlugin({ // Generates default index.html
            title: 'default index',
            inject: 'body',
            chunks: ['appIndex']
        }),
        new HtmlWebpackPlugin({ // Generate  app01.html
            title: 'my html',
            filename: 'app01.html',
            template: resolve('page/app01.html'),
            hash: true,
            inject: 'body',
            chunks: ['app01']
        }),
        new HtmlWebpackPlugin({ // Generate  app02.html
            filename: 'app02.html',
            template: resolve('page/app02.html'),
            hash: true,
            favicon: rootProject + '/src/assest/img/favicon.ico',
            chunks: ['app02']
        }),
        new HtmlWebpackPlugin({ // Generate  app02.html
            filename: 'child/child01.html',
            template: resolve('page/child/child01.html'),
            hash: true,
            favicon: rootProject + '/src/assest/img/favicon.ico',
            chunks: ['child01']
        }),
        new ExtractTextPlugin({
            filename: "static/css/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
            disable: false,
            allChunks: true
        })
    ],
    module: {
        rules: [
            // 单独输出css文件
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    // 避免找不到样式中的资源  比如图片
                    // https://github.com/vuejs/vue-loader/issues/481
                    publicPath: '../../',         // 注意配置这一部分，根据目录结构自由调整
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        // 10K
                        // 图片加载器，较小的图片转成 base64
                        limit: 10000,
                        name: 'static/img/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 10000,
                        name: 'static/font/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    }
};