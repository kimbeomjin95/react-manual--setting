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

  const onChange = e => {
    setValue(e.target.value);
  };

  function onSubmit() {}

  // 배열에서 객체를 이용하여 반복문 사용
  const arr1 = [
    { fruit: '사과', taste: '맛있다' },
    { fruit: '바나나', taste: '맛없다' },
    { fruit: '귤', taste: '맛있다' },
    { fruit: '수박', taste: '맛없다' },
    { fruit: '메론', taste: '맛있다' },
  ];
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmit}>
        <input maxLength="4" value={value} onChange={onChange} />{' '}
        {/* value와 onChange는 세트 */}
      </form>
      <div>시도: {tries}</div>
      <ul>
        {arr1.map((n, i) => ( // i: index
          // map를 사용할 때 key를 사용해줘야 함, 리액트가 key를 보고 같은 컴포넌트인지 아닌지 판단 함
          // 반복문 사용시 key를 항상 고유하게 만들어주어야 함
          // <li key={i}>  -> 이 방식은 지양, key를 이용해서 성능최적화 할 때 문제가 발생
          // 요소가 추가만 되는 배열인 경우 i를 사용해도 됨(삭제 X)
          <li key={n.fruit + n.taste}>
            {n.fruit} - {n.taste} - {i}
          </li>
        ))}
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
