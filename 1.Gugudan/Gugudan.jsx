const React = require('react');
const { useState, useRef } = React; // 구조분해(비구조화 할당)

const Gugudan = () => {
  // 바뀌는 부분을 state로

  // 객체로 useState 사용시 setState할 때 모든 state를 넣어주어야 함
  const nameInput = useRef();
  const [state, setState] = useState({
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
    value: '',
    result: '',
  });
  const { first, second, value, result } = state;

  // (핵심)키입력을 위해 set이용
  const onChange = e => {
    setState({
      value: e.target.value,
      first: first, // input에 값 입력시 렌더링이 발생하여 first, second 값이 ''처리 됨
      second: second,
      result: '',
    });
  };

  // 힘수형 업데이트 - 성능 최적화와 관련
  // 원칙 - 이전 state 값으로 새로운 state를 만들 때는 return 함수를 생성해줘야 함
  const onSubmit = e => {
    e.preventDefault(); // 새로고침 방지
    if (parseInt(value) === first * second) {
      setState(prevState => {
        return {
          first: Math.ceil(Math.random() * 9),
          second: Math.ceil(Math.random() * 9),
          value: '',
          result: '정답: ' + prevState.value, // this.state를 사용할 때는 함수형 업데이트 사용
        };
      });
      nameInput.current.focus(); // current는 해당 요소의 DOM을 가르킴
    } else {
      setState(prevState => {
        // prevState: 이전 상태값
        return {
          first: prevState.first, // input에 값 입력시 렌더링이 새롭게 되므로 값이 모두 초기화 됨
          second: prevState.second,
          value: '',
          result: '땡',
        };
      });
      nameInput.current.focus();
      // setState({
      //   first: first, // input에 값 입력시 렌더링이 새롭게 되므로 값이 모두 초기화 됨
      //   second: second,
      //   value: '',
      //   result: '땡',
      // })
    }
  };
  console.log('렌더링'); // setState함수가 실행되면 다시 렌더링이 됨

  return (
    <div>
      <div>
        {first}곱하기{second}?
      </div>
      {/*태그사이에 중괄호를 넣으면 JS 사용가능*/}
      <form onSubmit={onSubmit}>
        <input
          type="number"
          value={value}
          onChange={onChange}
          ref={nameInput}
        />{' '}
        {/* 현재 input에 상태는 키입력이 안되므로 set을 통하여 키 입력이 가능하도록 변경 */}
        <button>입력!</button>
      </form>
      {/*<div>{`${multiply}은 ${result}`}</div>*/}
      <div>{result}</div>
    </div>
  );
}

module.exports = Gugudan;