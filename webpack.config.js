// webpack의 모든 것은 webpack.config.js를 통해 작동됨
// npm run dev -> webpack 실행, package.json의 script에서 설정
// npx webpack도 가능

const path = require('path'); // 노드에서 경로를 쉽게 설정하기 위한

module.exports = {
  name: 'wordrelay-setting', // 웹팩 이름 설정 - 아무거나 가능
  mode: 'development', // 실제 서비스 - production
  devtool: 'eval', // 빠르게
  resolve: { // 자동적으로 확장자를 추가해줌, client-> client.jsx
    extensions: ['.js', '.jsx']
  },
  entry: { // 입력
    // 이 두 파일을 합쳐서 app.js로 만들어줌
    // webpack에서는 client.jsx 파일을 불러오면 자동적으로 WordRelay.jsx 파일을 호출, 그러므로 client.jsx 파일만 entry.app에 넣어줘도 됨
    app: ['./client'],
  },

  module: {
    rules: [{
      test: /\.jsx/, // js, jsx파일 적용(정규표현식 방법)
      loader: 'babel-loader',// js, jsx에 바벨을 적용하여 최신 문법을 구형브라우저에서 작동할 수 있도록 변환
      options: { // 바벨 옵션 설정
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
      }
    }]
  },

  output: { // 출력 -> app.js 하나의 파일로 html이 실행할 수 있도록
    // path.join: 경로를 통합, __dirname: 현재 폴더 경로,
    path: path.join(__dirname, 'src'), // __dirname: C:\kbj\react\react-webgame -> src
    filename: "app.js"
  },
};
