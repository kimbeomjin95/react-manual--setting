// Node에서는 require 사용, react는 import, export 사용
import Try from './Try';
const React = require('react');
const { useState, useRef, memo } = React; // 구조분해(비구조화 할당)

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

// 자식이 모두 memo이면 부모에도 memo를 적용할 수 있음
const NumberBaseball = memo(() => {
  // 렌더링은 state or props가 바뀌었을 때 실행, setState만 호출하면 렌더링이 됌
  // value가 변경되면 함수형컴포넌트 내의 내용이 모두 다시 실행됨(최적화 작업 필요 - useCallback, useMemo)
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);

  const onChange = e => {
    setValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log('answer:' + answer);
    if (value === answer.join('')) {
      // join 은 배열 안의 값들을 문자열 형태로 합쳐줍니다.
      // setResult('홈런');
      setTries(
        (
          prevTries, // 현재 상태를 가져와서 업데이트 하겠다는 의미(함수형 업데이트 - 성능 최적화와 관련), 함수 형태이므로 미세한 조정 가능
        ) => { // 다른 동작 가능
          return [...prevTries, { try: value, result: '홈런' }];
        }, // 이전 tries로 현재의 tries를 만들기 때문에 함수형 업데이트 해야 함
      );
      alert('홈런!!! 게임을 다시 시작합니다');
      setValue('');
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split('').map(v => parseInt(v)); // split: 문자열을 배열로 변환
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        // setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}입니다!`);
        alert(`아웃!!! 게임을 다시 시작합니다(정답:${answer.join(',')}))`);
        setValue('');
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries(prevTries => [
          ...prevTries,
          { try: value, result: `${strike}스트라이크 ${ball}볼 입니다` },
        ]);
        // setResult(`${stlike}스트라이크 ${ball}볼 입니다`);
        setValue('');
      }
    }
  };

  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmit}>
        <input maxLength="4" value={value} onChange={onChange} />{' '}
        {/* value와 onChange는 세트 */}
      </form>
      <div>시도: {tries.length}</div>
      <ul>
        {tries.map(
          (
            v,
            i, // i: index
          ) => (
            <Try key={`${i + 1}차 시도`} tryInfo={v} /> // 현재는 key에 index를 넣어도 되는 상황, 가급적 자제
          ),
        )}
      </ul>
    </>
  );
});

export default NumberBaseball;
// module.exports = NumberBaseball;
