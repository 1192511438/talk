const {resolve}=require('path')

const HtmlWebpackPlugin=require('html-webpack-plugin')
const CopyPlugin = require("copy-webpack-plugin");
module.exports={
    entry:'./src/index.js',
    output:{
        filename:'index.js',
        path:resolve(__dirname,'dist'),
        chunkFilename: 'chunks/[name].[chunkhash].js',
    },
  
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/(node_modules)/,
                include:resolve(__dirname,'src'),
                loader:'babel-loader',
                options:{
                    presets: [['@babel/preset-env',{modules:false,
                        useBuiltIns: 'usage',
                        "corejs":{
                                "version":3
                            },
                        "targets": "> 0.25%, not dead"}],'@babel/preset-react'],
                    cacheDirectory: true
                    }
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
            }
        ]
    },
    plugins:[
            new HtmlWebpackPlugin({
                template:'./public/index.html'
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: resolve(__dirname,'./public/image/'),
                        to: resolve(__dirname, "./dist/assets"),
                        globOptions: {
                            ignore: [ "**/index.html"],
                          },
                          noErrorOnMissing: true,
                      }
                ],
              }),
            
    ]




}