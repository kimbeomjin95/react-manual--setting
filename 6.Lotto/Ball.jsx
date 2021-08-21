import React, { memo } from 'react'; // useMemo: HOC, 변경사항이 없으면 렌더링 X, pureComponet 대체

// 훅스가 아닌 함수 컴포넌트
// state를 사용하지 않으면 아래와 같은 함수 컴포넌트를 생성
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = 'red';
  } else if (number <= 20) {
    background = 'orange';
  } else if (number <= 30) {
    background = 'yellow';
  } else if (number <= 40) {
    background = 'green';
  } else {
    background = 'pink';
  }

  return (
    <>
      <div className="ball" style={{ background }}>
        {number}
      </div>
    </>
  );
});

export default Ball;
