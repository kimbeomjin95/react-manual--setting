import React, { useState, useRef } from 'react'; // useRef: DOM에 직접 접근시 사용

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭을 시작하세요');
  const [result, setResult] = useState([]); // 평균시간 리스트(빈배열 상태에선 합계reduce를 사용할 수 없음)
  const timeout = useRef(null); // hook에서는 this의 속성들을 ref로 표현(ref의 추가기능)
  const startTime = useRef(); // 값이 변경되어도 렌더링이 일어나지 않고, 값이 변경되도 렌더링 시키고 싶지 않을 때 useRef사용
  const endTime = useRef(); // 변하는 값을 잠시 기록한다고 생각, ref인 경우 current로 무조건 접근해야 함

  // Math.random() 함수는 0~1(1은 미포함) 구간에서 부동소수점의 난수를 생성
  // Math.floor() 함수는 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환
  const onClick = () => {
    if (state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000); // 2초~3초 랜덤
    } else if (state === 'ready') {
      // 빠르게 클릭
      clearTimeout(timeout.current); // 성급하게 클릭시 timeout를 초기화해야 초록색으로 변경되지 않음
      setState('waiting');
      setMessage('성급하셨네요^^ 초록색이 된 후 에 클릭하세요');
    } else if (state === 'now') {
      // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭을 시작하세요');
      setResult(prevResult => {
        return [...prevResult, endTime.current - startTime.current]; // 이전 배열을 복사후 push
      });
    }
  };

  const onClickReset = () => {
    setResult([]);
  };

  // 내가 만든 함수는 무조건 화살표 함수
  // 렌더링 코드가 지저분한 경우 따로 함수로 만듬(새로운컴포넌트로 만드는 것이 더 좋음)
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onClickReset}>초기화</button>
      </>
    );
  };
  // return [ // jsx에서 배열을 리턴하는 경우(key를 사용해야 함)
  //   <div key='사과'>사과</div>, <div key='토마토'>토마토</div>, <div key='포도'>포도</div>
  // ]

  // return 안에서는 for or if를 사용할 수 없음 그러므로 조건문 사용
  // false, undefined, null은 jsx에서 태그없음을 의미함
  // jsx에서는 아무것도 없음을 의미하는 것이 null
  // react 조건문 - 삼항연산자, &&
  return (
    <>
      <div id="screen" className={state} onClick={onClick}>
        {message}
      </div>
      {/*{renderAverage()}*/}
      {(() => {
        if(result.length === 0) {
          return null
        } else {
          return (
          <>
            <div>반응속도체크: {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick={onClickReset}>리셋</button>
          </>
          )
        }
      })()} {/* 함수 선언하자 마자 즉시실행 함수를 만들어서 jsx내에서 if와 else를 사용하는 법  */}
    </>
  );
};

export default ResponseCheck;
