const webpack= require('webpack');
module.exports= function override(config) {
    const fallback = config.resolve.fallback || {};

    Object.assign(fallback,{
        "http": require.resolve("stream-http"),
        "https": require.resolve("https-browserify"),
        "querystring": require.resolve("querystring-es3"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "path": require.resolve("path-browserify") ,
        "fs" :false,
        "buffer": require.resolve("buffer"),
        "process": require.resolve("process"),
        'process/browser': require.resolve('process/browser'),
        "vm": require.resolve("vm-browserify")
        
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins ||[]).concat([
        new webpack.ProvidePlugin({
            process: 'process/browser',  
            Buffer: ['buffer', 'Buffer'],   // Use the built-in Buffer from Node.js
        }),
    ]);
    return config;
} 