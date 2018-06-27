module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
        'test/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
        'index.js': ['coverage'],
        'test/*.js': ['webpack']
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,    // 测试通过后自动退出
    concurrency: Infinity,
    coverageReporter: {
      type : 'text-summary'
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                "presets": ["es2015"],
                "plugins": [["istanbul"]]
              }
            }
          }
        ]
      }
    },
    plugins: [
      'karma-phantomjs-launcher',
      'karma-mocha',
      'karma-coverage',
      'karma-webpack',
      'karma-chai',
    ]
  })
}