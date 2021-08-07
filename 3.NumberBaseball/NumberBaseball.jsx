// Node에서는 require 사용, react는 import, export 사용
const React = require('react');
const { useState, useRef } = React; // 구조분해(비구조화 할당)


function getNumbers() {
  return undefined;
}
const NumberBaseball = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState('');

  const onChange = (e) => {
    setValue(e.target.value);
  }

  function onSubmit() {

  }

  const arr1 = ['사과', '바나나', '귤', '수박', '메론'];
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmit}>
        <input maxLength='4' value={value} onChange={onChange}/> {/* value와 onChange는 세트 */}
      </form>
      <div>시도: {tries}</div>
      <ul>
        {arr1.map((n) => {
          return (
            <li>{n}</li>
          )
        })}
      </ul>
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




