import React, { useCallback, useEffect, useReducer } from 'react';
import Table from './Table';

// react는 state를 변경하면 변경된 내용을 자동으로 화면에 렌더링 해줌
// 앞으로 state를 하나로 모아두고, state는 action을 통해서만 변경한다
// useState가 너무 많은 경우에는 useReducer를 고려해보면 좋음
const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  recentCell: [-1, -1], // 없는 칸
};

// action type은 변수로 빼놓기(상수, 대문자)
// export는 td에서 사용하기 위함
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

// reducer함수(action타입을 구분하여 state를 변경)
// action을 dispatch할 때 마다 reducer가 실행 됨, action의 종류가 많기 때문에 switch문을 이용
const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        // state.winner: action.winner -> 이렇게 직접 바꾸면 안되고, 새로운 객체를 만들어서 바뀐 값만 변경해줘야 함
        ...state, // spread 문법(기존 state 얕은 복사)
        winner: action.winner, // 바뀌는 부분만 새롭게 변경
        // 새로운 state를 만들어서 return 해주면 react가 자동적으로 값을 변경시켜 줄 것
      };
    case CLICK_CELL: {
      const tableData = [...state.tableData]; // 얕은 복사(객체가 있으면 얕은 복사를 해줘야 한다고 생각하기), 객체를 얕은 복사
      tableData[action.row] = [...tableData[action.row]]; // 불변성(immer lib로 가독성 해결), 불변성은 react에서 state를 변경할 때 무조건 지켜야 함
      tableData[action.row][action.cell] = state.turn; // turn: 0
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell], // 최근 클릭한 셀에 대한 배열 위치
      };
    }
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      // 게임 리셋
      return {
        ...state,
        winner: '',
        turn: 'O',
        tableData: [
          ['', '', ''],
          ['', '', ''],
          ['', '', ''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
};

// useState, setState할 때 기존 state를 직접 바꾸는 게 아니라 새로운 state를 만들어서 바뀌는 부분만 변경 해준다.
const Tictactoe = () => {
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer를 사용하여 useState를 하나로 모아서 처리, setState는 dispatch로 대체가능
  const { winner, turn, tableData, recentCell } = state; // 구조 분해

  // state는 최상 부모에서 관리
  // const [winner, setWinner] = useState('');
  // const [turn, setTurn] = useState('O');
  // const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]); // 3 X 3 배열

  useEffect(() => {
    // useEffect: 처음 컴포넌트가 렌더링 될 때도 실행됨
    let win = false;
    const [row, cell] = recentCell; // [-1, -1]
    if (row < 0) {
      return;
    }
    if (
      tableData[row][0] === turn && // 행 검사
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn && // 열 검사
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn && // 대각선 검사(좌 -> 우)
      tableData[1][1] === turn &&
      tableData[2][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn && // 대각선 검사(우 -> 좌)
      tableData[1][1] === turn &&
      tableData[2][0] === turn
    ) {
      win = true;
    }
    if (win) {
      // 승리시
	    // dispatch안에 들어가는 것은 action 객체이자 액션을 의미
	    // dispatch: action을 실행시키는 함수
      dispatch({ type: SET_WINNER, winner: turn }); // {type: 'SET_WINNER', winner: 'O'}: action 객체
    } else {
      // 무승부 검사 - all === true면 무승부
      let all = true; // 테이블이 모두 찼는지(무승부)
      tableData.forEach(row => {
        row.forEach(cell => {
          if (!cell) {
            all = false; // cell이 한개라도 비어있으면 무승부가 아님
          }
        });
      });
      if (all) { // 무승부시
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: CHANGE_TURN }); // 셀 클릭시 턴 변경
      }
    }
  }, [recentCell]); // 최근 클릭한 cell이 변경될 때 마다 렌더링

	// 함수형 컴포넌트 내에서 사용하는 함수는 모두 useCallback
	const redo = useCallback(() => {
		dispatch({ type: RESET_GAME });
	}, []);

  return (
    <>
      <Table tableDate={tableData} dispatch={dispatch} />
      {winner && <div>{winner}님의 승리</div>}
	    {winner && <button onClick={redo}>재시작</button>}
    </>
  );
};

export default Tictactoe;
