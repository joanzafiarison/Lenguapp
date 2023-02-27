// Karma configuration
// Generated on Sun Feb 19 2023 08:42:20 GMT+0100 (heure normale d’Europe centrale)
module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
    frameworks: ['mocha','webpack'],


    // list of files / patterns to load in the browser
    files: [
      'tests.webpack.js'
    ],


    // list of files / patterns to exclude
    exclude: [
    ],

    plugins: [
      'karma-chrome-launcher',
      'karma-tap',
      'karma-sourcemap-loader',
      'karma-webpack', // *** This 'registers' the Karma webpack plugin.,
      'karma-mocha'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
    preprocessors : {
      'tests.webpack.js' : ['webpack']
  },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
    reporters: ['progress'],

    webpack : webpackConfig(),
      //mode: "development",

      // Inlne source maps ensure proper stack traces in errors,
      // and allow you to debug your original source code rather than bundled code.
      //devtool: "inline-source-map",
      /*
      module: {
          rules: [
              {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader'}
          ]
      },*/
  

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser instances should be started simultaneously
    concurrency: Infinity
  })
}

function webpackConfig() {
  const config = require('./webpack.config.js');
  delete config.context;
  delete config.entry;
  delete config.output;
  // delete config.devServer;

  return config;
}