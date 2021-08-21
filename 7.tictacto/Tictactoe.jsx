import React, {useCallback, useReducer} from 'react';
import Table from "./Table";
import Td from "./Td";

const initialState = {
	winner: '',
	turn: 'O',
	tableData: [['', '', ''], ['', '', ''], ['', '', '']]
}

// action type은 변수로 빼놓기(상수, 대문자)
const SET_WINNER = 'SET_WINNER';

// reducer함수(action타입을 구분하여 state를 변경)
// action을 dispatch할 때 마다 reducer가 실행 됨, action의 종류가 많기 때문에 switch문을 이용
const reducer = (state, action) => {
	switch (action.type) {
		case SET_WINNER:
			return {
				// state.winner: action.winner -> 이렇게 직접 바꾸면 안되고, 새로운 객체를 만들어서 바뀐 값만 변경해줘야 함
				...state, // spread 문법(기존 state 얕은 복사)
				winner: action.winner // 바뀌는 부분만 새롭게 변경
				// 새로운 state를 만들어서 return 해주면 react가 자동적으로 값을 변경시켜 줄 것
			}
	}
}

// useState, setState할 때 기존 state를 직접 바꾸는 게 아니라 새로운 state를 만들어서 바뀌는 부분만 변경 해준다.

const Tictactoe = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	// state는 최상 부모에서 관리
	// const [winner, setWinner] = useState('');
	// const [turn, setTurn] = useState('O');
	// const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); // 3 X 3 배열

	// 함수형 컴포넌트 내에서 사용하는 함수는 모두 useCallback
	const onClickTable = useCallback(() => {
		// dispatch안에 들어가는 것은 action 객체이자 액션을 의미
		// dispatch: action을 실행시키는 함수
		dispatch({type: SET_WINNER , winner: 'O'}) // {type: 'SET_WINNER', winner: 'O'}: action 객체
	}, []);

	return (
		<>
			<Table onClick={onClickTable} tableDate={state.tableData}/>
			{state.winner && <div>{state.winner}님의 승리</div>}
		</>
	);
};

export default Tictactoe;
