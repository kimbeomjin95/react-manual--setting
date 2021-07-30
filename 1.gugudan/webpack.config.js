const path = require('path');

module.exports = {
  mode: 'development', // 운영 - production
  devtool: 'eval', // production: hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: { // 입력
    app: ['./client'],
  },
  module: {
    rules: [
      {
        test: /\.jsx/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
    ],
  },
  output: { // 출력
    // path.join: 경로를 통합, __dirname: 현재 폴더 경로,
    path: path.join(__dirname, 'src'), // __dirname: C:\kbj\react\react-webgame/1.gugudan -> src
    filename: 'app.js',
  },
};
