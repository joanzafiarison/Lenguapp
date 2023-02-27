var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        browsers:["Chrome"],
        singleRun :true,
        frameworks : ["mocha"],
        files:[
            'tests.webpack.js'
        ],
        preprocessors : {
            'tests.webpack.js' : ['webpack']
        },
        reporters : ['dots'],
        webpack : {
            mode: "development",

            // Inlne source maps ensure proper stack traces in errors,
            // and allow you to debug your original source code rather than bundled code.
            //devtool: "inline-source-map",
            module: {
                rules: [
                    {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
                ]
            },
        },
        webpackServer:{
            noInfo:true
        }
    })
}