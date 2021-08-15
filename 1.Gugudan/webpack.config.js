const path = require('path');
const webpack = require('webpack');

module.exports = {
  // 웹팩에 대한 기본정보
  mode: 'development', // 운영 - production
  devtool: 'eval', // production: hidden-source-map
  resolve: {
    extensions: ['.jsx', '.js'],
  },

  entry: {
    // 입력
    app: ['./client'],
  },
  module: {
    // Loaders(모듈 적용)
    rules: [
      {
        test: /\.jsx?$/, // js, jsx파일 적용(정규표현식 방법)
        loader: 'babel-loader',
        options: {
          // babel-loader에 대한 옵션
          presets: [ // presets: 플러그인의 모음
            [
              '@babel/preset-env',
              {
                targets: {
                  // 2번째 파라미터에 preset-env에 대한 추가 설정
                  browsers: ['> 5% in KR'],
                },
                debug: true // 개발용에서 설정
              },
            ],
            '@babel/preset-react',
          ],
          plugins: [], // plugin들의 모음이 preset
        },
      },
    ],
  },
  plugins: [
    // 확장 프로그램
    new webpack.LoaderOptionsPlugin({ debug: true }), // mudule(Loaders)의 options의 debug: true 설정
  ],
  output: {
    // 출력
    // path.join: 경로를 통합, __dirname: 현재 폴더 경로,
    path: path.join(__dirname, 'src'), // __dirname: C:\kbj\react\react-webgame/1.Gugudan -> src
    filename: 'app.js',
  },
};
