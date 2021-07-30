// CRA - index.js
const React = require('react'); // 모듈 시스템을 통하여 필요한 것만 불러올 수 있음
const ReactDom = require('react-dom');
const WordReplay = require('./WordRelay');

ReactDom.render(<WordReplay />, document.querySelector('#root'));
