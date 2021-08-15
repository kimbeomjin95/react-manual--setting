import React, { useState } from 'react';

let timeout; // 전역 변수로 선언하지 않으면 settimeout 실행됨
let startTime; // state로 담지 않는 이유는 값이 변경되면 렌더링이 다시 되기 때문에, 전역변수로 선언
let endTime;
const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭을 시작하세요');
  const [result, setResult] = useState([]); // 평균시간 리스트(빈배열 상태에선 합계reduce를 사용할 수 없음)

	// Math.random() 함수는 0~1(1은 미포함) 구간에서 부동소수점의 난수를 생성
	// Math.floor() 함수는 주어진 숫자와 같거나 작은 정수 중에서 가장 큰 수를 반환

  const onClick = () => {
  	if (state === 'waiting') {
  		setState(
			  'ready'
		  )
		  setMessage('초록색이 되면 클릭하세요')
		  timeout = setTimeout(() => {
		  	setState('now');
		  	setMessage('지금 클릭')
		  }, Math.floor(Math.random() * 1000) + 2000) // 2초~3초 랜덤
		  startTime = new Date();
	  } else if (state === 'ready') { // 빠르게 클릭
  		clearTimeout(timeout) // 성급하게 클릭시 timeout를 초기화해야 초록색으로 변경되지 않음
  		setState('waiting')
			setMessage('성급하셨네요^^ 초록색이 된 후 에 클릭하세요')
	  } else if (state === 'now') { // 반응속도 체크
  		endTime = new Date();
			setState('waiting')
		  setMessage('클릭을 시작하세요')
		  setResult(prevResult => {
		  	return [...prevResult, endTime - startTime] // 이전 배열을 복사후 push
		  })
		  console.log(result)
	  }
  };

  // 내가 만든 함수는 무조건 화살표 함수
  const renderAverage = () => {
    return result.length === 0 ? null : (
      <div>평균시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
    );
  };

  // return 안에서는 for or if를 사용할 수 없음 그러므로 조건문 사용
  // false, undefined, null은 jsx에서 태그없음을 의미함
  // jsx에서는 아무것도 없음을 의미하는 것이 null
  // react 조건문 - 삼항연산자, &&
  return (
    <>
      <div id="screen" className={state} onClick={onClick}>
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;
