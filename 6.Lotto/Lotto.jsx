import React, {useEffect, useState, useRef, useMemo, useCallback} from 'react';
import Ball from './Ball';
// useMemo: 복잡한 함수 결과값을 기억
// useRef: 일반 값을 기억

// state를 사용하지 않은 것들은 컴포넌트 밖으로 분리하는 습관이 좋음
const getWinNumbers = () => {
	console.log('getWinNumbers');
	const candidate = Array(45)
		.fill()
		.map((v, i) => i + 1);

	const shuffle = [];
	while (candidate.length > 0) {
		shuffle.push(
			candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0],
		);
	}
	const bonusNumber = shuffle[shuffle.length - 1];
	const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
	return [...winNumbers, bonusNumber];
};

// Hook 특성상 전체 재실행
const Lotto = () => {
	// useMemo: 이전 값을 재사용, [deps]가 바뀌지 않는 한 getNumbers는 다시 실행되지 않음, 함수가 실행된 결과값을 저장
	const LottoNumbers = useMemo(() => getWinNumbers(), []);
	const [winNumbers, setWinNumbers] = useState(LottoNumbers); // 당첨 숫자들
	const [winBalls, setWinBalls] = useState([]); // 6개 볼
	const [bonus, setBonus] = useState(null); // 보너스 공(추가 1볼)
	const [redo, setRedo] = useState(false); // 재도전
	const timeouts = useRef([]);

	// 비동기에 변수를 같이 사용하면 클로저 문제가 발생하는데 let을 사용하면 let을 사용하면 클로져 문제가 발생하지 않음
	useEffect(() => {
		console.log('useEffect');
		for (let i = 0; i < winNumbers.length -1; i++) {
			timeouts.current[i] = setTimeout(() => {
				// 여기서 timeouts.current[i]는 값이 변경되는 것이 아님(중요), 단지 current 배열에 요소로서 값을 넣어준 것
				setWinBalls(prevBalls => [...prevBalls, winNumbers[i]]); // 배열에 값을 넣을 때는 이전 상태값 복사 후 새로운 값을 넣어야 함
			}, (i + 1) * 1000);
		}
		timeouts.current[6] = setTimeout(() => {
			setBonus(winNumbers[6]);
			setRedo(true);
		}, 7000);
		return () => {
			// 컴포넌트가 사라질 때 cleanup 함수가 호출, 메모리 누수 문제가 있으므로 setTimeout, setInterval을 정리를 해줘야 함
			timeouts.current.forEach(v => {
				clearTimeout(v);
			});
		};
	}, [timeouts.current]); // 배열안에 요소의 값이 변경되면 다시 useEffect 실행, 재도전시 이때 timeouts을 감지하여 다시 렌더링 실행

	// 처음 state로 초기화
	// useCallback: 함수 자체를 기억해서 함수컴포넌트가 재실행되고 onClickRedo가 새로 생성되지 않음
	// useCallback 내에서 사용하는 state는 항상 deps에 넣어줘야 함,
	const onClickRedo = useCallback(() => {
		console.log('onClickRedo');
		// console.log(winNumbers);
		setWinNumbers(getWinNumbers);
		setWinBalls([]);
		setBonus(null);
		setRedo(false);
		timeouts.current = []; // current에 직접 넣었기 때문에 값이 변경됨(예전 current와 다름)
	}, [winNumbers]); // deps가 변경되면 useCallback 새로 실행

	return (
		<>
			<div>당첨 숫자</div>
			<div id="결과창">
				{winBalls.map(v => (
					<Ball key={v} number={v}/>
				))}
			</div>
			<div>보너스!</div>
			{bonus && <Ball number={bonus}/>}
			{redo && <button onClick={onClickRedo}>한 번 더!</button>}
		</>
	);
};

export default Lotto;
