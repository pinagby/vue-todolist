var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: {
                loader: 'vue-loader'
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }, {
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
            ],
        },{
            test: /\.(ttf|woff|eot|svg|woff2)$/,
            use: { 
                loader: "url-loader" 
            },
        },{
            test: /\.(png|jpg|gif|svg|jpeg)$/,
            use: [{ 
                loader: "url-loader" ,
                options:{
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            }]
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'src': path.resolve(__dirname,'../src'),  
            'assets': path.resolve(__dirname, '../src/assets')
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        port:8082
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
        // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ])
}
