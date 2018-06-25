//2018-3-20
//config.js
//当webpack is not defined时要引入webpack
var webpack = require('webpack');

var path = require('path');

//引入html-webpack-plugin插件
var HtmlWebpackPlugin = require('html-webpack-plugin');

//extract-text-webpack-plugin
var ExtractTextPlugin = require('extract-text-webpack-plugin');



module.exports = {
	mode:'development',  //webpack4. has using webpack-cli
	entry: __dirname+'/app/main.js',
	devtool:'eval-source-map',//编译文件和源文件，使得代码可读性高
	output:{
		path:__dirname+'/build',
		filename:'bundle.js' // 
	},
    //webpack 本地服务
    devServer:{
    	contentBase:'./build',// localhost dist
    	historyApiFallback:true,//not href
    	inline:true,// refresh
    	port:8000
    },
    //模块 功能
    module:{
    	rules:[
    	// babel | js |babel-plugin-react-transform
    	//插件可以实现reac组建的热更新
           {
           	 test:/(\.jsx|\.js)$/,
           	 use:{
         //when use this babel probably install broserslist  	 	
           	 	loader:"babel-loader"
           	// use .babelrc instead this options 	
           	 	// options:{
           	 	// 	presets:[
           	 	// 		"env","react"
           	 	// 	]
           	 	// }
           	 },
           	 exclude:/node_modules/
           },
           //css
           {
           	 test:/(\.css|\.scss|\.less)$/,
           	 use:[
           	 	{
           	 		loader:'style-loader'
           	 	},
           	 	{
           	 		loader:'css-loader',
           	 		options:{
           	 			//css modules. 
           	 			//modules:true,
           	 			localIdentName:'[name]__[local]--[hash:base64:5]'
           	 		}
           	 	},
           	 	{
           	 		//css 预处理平台 需要添加postcss.config.js 自动添加不同浏览器前缀（-webkit-/-moz-等）
           	 		loader:'postcss-loader'
           	 	}
           	 ],
             exclude:/node_modules/,
           },
            //打包图片资源
           {
           	test:/\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
           	loader:'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
           },
           {
           	test:/\.png$/,
           	loader:"file-loader?name=images/[hash:8].[name].[ext]"
           }
    	]
    },
    resolve: {
      //第三方库引入
        alias: {
           jquery$: path.resolve(__dirname, 'js/jquery.min.js')
        }
       
    },
    //插件使用
    plugins:[
    // 打包 版权插件
    	new webpack.BannerPlugin('版权所有，翻版必究'),
    	new HtmlWebpackPlugin({
    		//创建插件实例 传入相关参数，当模版文件发生变化时
    		//对应的构建出的html文件也会随之发生变化
    		template:__dirname+"/app/index.tmpl.html"
    	}),
    	//热加载插件
    	new webpack.HotModuleReplacementPlugin(),
      // 导出全局对象 可以随意调用 $对象(jquery)
       new webpack.ProvidePlugin({
            $: 'jquery'
        })


    ]


};











