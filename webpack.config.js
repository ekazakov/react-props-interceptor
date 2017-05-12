var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/PropsInterceptor.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'PropsInterceptor.js',
        library: 'PropsInterceptor',
        libraryTarget: 'umd'
    },
    externals: [
        'react',
        'lodash/mapValues',
        'lodash/includes',
        'lodash/noop',
        'recompose/compose',
        'recompose/mapProps',
        'recompose/wrapDisplayName',
        'recompose/setDisplayName',
    ],
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