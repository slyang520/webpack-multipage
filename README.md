
# webpack 多页面项目构建 学习

## postcss
## babel 
## extract-text-webpack-plugin
## html-webpack-plugin

"build": "webpack",

"watch": "webpack --watch",  //可以自动编译改动的文件  网页不会自动更新

"start": "webpack-dev-server --open", //可以自动编译改动文件  网页自动更新 自带服务

"server": "node server.js"   //可以自动编译改动文件  网页自动更新  用第三发服务中间件

---
 {
    test: /\.js[x]?$/,
    exclude: /(node_modules|bower_components)/,
    include: resolve('src'),
    use: {
          loader: 'babel-loader',
    }
},
 exclude: 
 include
 // 加上部分浏览器会报错
 @https://github.com/hapijs/joi/issues/922
 ------
 
 
 