const common =require('./webpack.config')
const {merge}=require('webpack-merge')
const path =require('path')
const webpack =require('webpack')
const dev={
    // entry:'./src/index.js',
    mode:'development',
    output:{
        filename:'js/[name].js',
        path:path.resolve(__dirname,'dist'),
        chunkFilename: 'chunks/[chunkhash:8].chunk.js'
    },
    devServer:{
        contentBase:'./dist',
        port: 8080,
        open:true,
        hot:true
            },
            plugins:[
                new webpack.HotModuleReplacementPlugin({})
            ]
            ,
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader','css-loader','postcss-loader'
                ]
            },{
                test:/\.scss$/,
                use:[
                    'style-loader','css-loader','postcss-loader','sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss", ".css"], //后缀名自动补全
        alias: {
          "@": path.resolve(__dirname, "src"),
        },
      },
    optimization: {
        usedExports: true,
        splitChunks:{
            chunks: 'all',//异步同步都可以分代码块
            minSize: 30000,//import最小引入多少kb才会分代码块，现在为20kb
            minChunks: 1,//只要import出现一次就可以chunk
            maxInitialRequests:4 ,//限制入口的拆分数量，默认3，一个入口能分离几个代码块
            maxAsyncRequests:3,//限制异步模块内部的并行最大请求的，说白了你可以理解为每个import()它里面的最大并行请求数量
            automaticNameDelimiter:'~',
            cacheGroups:{
                vendors:{
                    chunks:'all',
                        test:/node_modules/,//条件
                        priority:-10 ,//优先级
                        reuseExistingChunk: true,
                        name:'vendor'
                            },
                    commons:{
                        chunks:'all',
                        minSize:0,	//最少提取字节数
                        minChunks:2,	//最少被几个chunk引用
                        priority:-20 ,//优先级
                        reuseExistingChunk: true,
                        name:'common'
                            },
                    antd: {
                                chunks:"all",
                                test:/[\\/]node_modules[\\/]antd/,
                                priority: 15,
                                name:'antd',
                                reuseExistingChunk: true,
                            },
                    react:{
                            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)/,
                            name: 'react',
                            priority: 17,
                            reuseExistingChunk: true,
                    }
                        
            }
        }
      }
    
}

module.exports=(env)=>merge(common,dev)