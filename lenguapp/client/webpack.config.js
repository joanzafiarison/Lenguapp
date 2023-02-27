const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
 
module.exports = {
    target:"node",
    plugins : [
        new NodePolyfillPlugin()
    ],
    resolve: {
        fallback: { 
            'path': require.resolve('path-browserify'),
            'constants': require.resolve("constants-browserify"),
            'stream': require.resolve("stream-browserify"),
         },
        extensions: ['.jsx', '.js', '.tsx', '.ts'],
    },
    module: {
        rules: [
            {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'},
        ]
    }
}