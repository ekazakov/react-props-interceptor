var path = require('path');
var webpack = require('webpack');
// var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = {
    entry: './src/PropsInterceptor.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'PropsInterceptor.js',
        library: 'PropsInterceptor',
        libraryTarget: 'umd'
    },
    // externals: {
    //     react: {
    //         commonjs: 'react',
    //         commonjs2: 'react',
    //         amd: 'react',
    //         root: 'React'
    //     },
    //     "lodash/mapValues": {
    //         commonjs: 'lodash/mapValues',
    //         commonjs2: 'lodash/mapValues',
    //         amd: 'lodash/mapValues',
    //     },
    //     "lodash/includes": {
    //         commonjs: 'lodash/includes',
    //         commonjs2: 'lodash/includes',
    //         amd: 'lodash/includes',
    //     },
    // },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loaders: [
                    'babel-loader?cacheDirectory'
                ]
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: true,
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: true,
            },
            output: {
                comments: false,
            },
            sourceMap: false,
        }),
    ]
};