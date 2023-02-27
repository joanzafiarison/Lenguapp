var context = require.context('./src', true, /-test\.jsx?$/);
context.keys().forEach(context);
//anything that as a -test suffix is in the test suit
/*
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
    }
}*/