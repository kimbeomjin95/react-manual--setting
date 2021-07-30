### React CRA을 사용하지 않고 수동으로 환경셋팅<hr />
1. 하나의 폴더 생성<br>
   ex) react-tutorial

2. npm init -> package.json 파일 생성<br/>
   package은 아무거나 입력하고 나머지 항목은 pass<br/>
   author - Beomjin<br/>
   license - MIT<br/>
   package.json에 react 개발에 필요한 모든 것을 넣어주면 됌
   
3. npm i react react-dom: i는 install<br />
   react 실행시 제일먼저 react, react-dom 설치
   
4. npm i -D webpack webpack-cli -> D는 개발용으로만 웹팩 사용하는것을 의미, 실제 서비스에서는 webpack 필요없음<br/>
   실제 서비스에서 사용 - dependencies<br/>
   개발 - devDependencies
   
5. react-tutorial 디렉토리에 webpack.config.js 파일 생성<br />
   modual.exports = {<br />
   ...<br />
   }
   
6. react-tutorial 디렉토리에 client.jsx 파일 생성<br />
   const React = require('react);<br />
   const ReactDom = require('react-dom);<br />
   Node 모듈시스템에서 npm에 설치했던 것들을 불러올 수 있음<br />





