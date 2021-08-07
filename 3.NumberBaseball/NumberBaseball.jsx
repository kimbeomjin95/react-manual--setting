// Node에서는 require 사용, react는 import, export 사용
const React = require('react');
const { useState, useRef } = React; // 구조분해(비구조화 할당)

const NumberBaseball = () => {

  return (
    <>

    </>
  );
};

// export const hello = 'hello' // import { hello } from …
// 여러개 사용가능

// export default NumberBaseball; // import NumberBaseball;
// default는 한번만 사용할 수 있음

export default NumberBaseball;

// module.exports = NumberBaseball; // export default와 호환가능
// 노드 모듈 시스템
// module.export = { hello: 'a }; ->
// exports.hello = 'a'




