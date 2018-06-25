//2018-3-20
//webpack.production.config.js
//产品构建阶段
var path = require('path');

var webpack =require('webpack');
//Html-webpack-plugin
//cnpm i --save-dev html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin');

//mini-css-extract-plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//clean-webpack-plugin
var CleanWebpackPlugin = require('clean-webpack-plugin');

//webpack-uglify-js-plugin
var webpackUglifyJsPlugin = require('webpack-uglify-js-plugin');
//modules exports

module.exports = {
	mode:'production',
	entry:__dirname+"/app/main.js",
	devtool:'none',// 产品阶段以减少代码量
	output:{
		path:__dirname+'/build',
		filename:'bundle-[hash].js'
	},
	//webserver
	//npm i --save-dev webpack-dev-server
	devServer:{
		contentBase:'./build',
		historyApiFallBack:true,
		port:8080,
		inline:true,
		hot:true
	},
	//modules
	module:{
		rules: [
           //js | jsx...
           //cnpm i --save-dev babel-loader babel-core babel-preset-env babel-preset-react
         //if hot react--  cnpm i --save-dev babel-plugin-react-transform
         //important .babelrc  
           {
           	 test:/(\.js|\.jsx)$/,
           	 use:{
           	     loader:"babel-loader"
             	 //options:[]...  if has .babelrc can instead
            	},
             exclude:/node_modules/
           },
           //css
           //npm i --save-dev css-loader style-loader postcss-loader autoprefixer
           {
           	test:/(\.css|\.scss|\.less)$/,
           	//如果loader多多情况下，这样写
           	use:[
           	    MiniCssExtractPlugin.loader,
           	    "css-loader"
        //    		{
        //    			loader:"style-loader"
        //    		},
        //    		{
        //    			loader:"css-loader",
        //    			//css modules
        //    			options:{
        //          		modules:true,
        //          		localIdentName:'[name]__[local]--[hash:base64:5]'
        //    			}
        //    		},
        //    		//css preix
        //    		{
 				   // loader:'postcss-loader'
 				   // //need set postcss.config.js require('autoprefixer')
        //    		}
           		
           	],
           	exclude:/node_modules/
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
	//plugins
	plugins:[
       //banner
       new webpack.BannerPlugin('版权所有，翻版必究 !'),
       //html webpack plugin
       new HtmlWebpackPlugin({
       	 template:__dirname+'/app/index.tmpl.html'
       }),
        // 导出全局对象 可以随意调用 $对象(jquery)
       new webpack.ProvidePlugin({
            $: 'jquery'
        }),
       //webpack hot plugin
       new webpack.HotModuleReplacementPlugin(),
       //product plugin
       new webpack.optimize.OccurrenceOrderPlugin(),
       new webpackUglifyJsPlugin({
    		  cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
    		  debug: true,
    		  minimize: true,
    		  sourceMap: false,
    		  output: {
    		    comments: false
    		  },
    		  compressor: {
    		    warnings: false
		  }
		}),
       new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "css/[name].[chunkhash:8].css",
      chunkFilename: "[id].css"
      }),
       //clean 
       new CleanWebpackPlugin(['build','public'], {
       		root:__dirname,
       		verbose:true,
       		dry:false,
       		exclude:[]
       })
	]

};
