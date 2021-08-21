import React, { useState, useEffect, useRef } from 'react';

const rspCoords = {
  rock: '0px',
  scissors: '-142px',
  paper: '-284px',
};
const scores = {
  scissors: 1,
  rock: 0,
  paper: -1,
};

const computerChoice = imgCoord => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

// 처음 렌더링이 실행될 때 useEffect가 실행됨
// 주의 - 비동기 함수에서 밖의 변수를 참조하면 클로저 문제가 발생,
// 그러므로 비동기 함수 안에서 변수를 선언,
const RSP = () => {
  const [result, setResult] = useState('');
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(rspCoords.rock);
  const interval = useRef();

  // 함수형 컴포넌트 내에서 선언해야 함
  // 함수형 컴포넌트는 렌더링(imgCoordr값이 변경) 될때 마다 함수 내에 코드가 통째로 다시 실행됨
  useEffect(() => {
    // componentDidMount, componentDidUpdate 역할
    // 컴포넌트가 첫 렌더링 된 후, 여기에 비동기 요청을 많이 함
    // deps에 들어가는 값에 따라서 useEffect를 여러번 수행 가능
    // console.log('다시실행');
    interval.current = setInterval(changeHand, 100);
    return () => {
      // componentWillUnmount 역할
      // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 함
      // console.log('종료');
      clearInterval(interval.current); // 매번 clearInterval을 하기 때문에 setTimeout을 하는 것과 동일, 필수
    };
  }, [imgCoord]); // deps에는 꼭 useEffect를 다시 실행할 값만 넣어야 함, deps를 넣지 않은 경우는 딱 1번만 실행됨
  //

  // setInterval: 일정 시간마다 계속 반복작업을 해주는 것
  const changeHand = () => {
    if (imgCoord === rspCoords.rock) {
      setImgCoord(rspCoords.scissors);
    } else if (imgCoord === rspCoords.scissors) {
      setImgCoord(rspCoords.paper);
    } else if (imgCoord === rspCoords.paper) {
      setImgCoord(rspCoords.rock);
    }
  };
  const onClickBtn = choice => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if (diff === 0) {
      setResult('비겼습니다!');
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다!');
      setScore(prevScore => prevScore + 1);
    } else {
      setResult('졋습니다!!');
      setScore(prevScore => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  };

  return (
    <>
      <div
        id="computer"
        style={{
          background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}
      />
      <div>
        <button id="rock" className="btn" onClick={() => onClickBtn('rock')}>
          바위
        </button>
        <button
          id="scissor"
          className="btn"
          onClick={() => onClickBtn('scissors')}
        >
          가위
        </button>
        <button id="paper" className="btn" onClick={() => onClickBtn('paper')}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
    </>
  );
};

export default RSP;
