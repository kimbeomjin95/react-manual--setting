import React, { createContext, useMemo, useReducer } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7, // 지뢰
  NORMAL: -1, // 정상
  QUESTION: -2,
  FLAG: -3, // 깃발
  QUESTION_MINE: -4, // 물음표 칸에 지뢰가 있는 경우
  FLAG_MINE: -5, // 깃발 칸에 지뢰가 있는 경우
  CLICKED_MINE: -6, // 실수로 지뢰를 클릭한 경우
  OPENED: 0, // 칸을 정상적으로 연 경우, 0이상이면 open되게
};

export const TableContext = createContext({
  tableData: [], // -1: 기본, -7: 지뢰
  dispatch: () => {}, // 함수
}); // 초기값을 넣을 수 있음

const initialState = {
  tableData: [],
  timer: 0,
  result: '',
};

export const START_GAME = 'START_GAME';

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell)
    .fill()
    .map((arr, i) => {
      return i;
    });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    // 0 ~ 99 중에서 지뢰를 뽑음
    const chosen = candidate.splice(
      Math.floor(Math.random() * candidate.length),
      1,
    )[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) { // 2차원 배열 생성(테이블 데이터)
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL) // 모두 닫힌 칸
    }
  }

  for (let k = 0; k < shuffle.length; k++) { // 셔플 정렬로 뽑인 칸들에 지뢰 심기
    const ver = Math.floor(shuffle[k] / cell); // [ ? , ?] 를 계산하기 위함(몇 콤마 몇을 알기위한)
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  console.log(data);
  return data;

};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine), // 지뢰 심는 함수
      };
    default:
      return state;
  }
};

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => ({ tableData: state.tableData, dispatch }),
    [state.tableData],
  ); // state.tableData가 변경 될때 value값 갱신
  // useMemo를 통해서 값을 기억해줘야 context api 성능저하가 덜 발생됨
  return (
    <TableContext.Provider value={value}>
      {' '}
      {/* 넘길값은 value에 설정하며, 자식 컴포넌트에서는 value 데이터에 접근 가능 */}
      <Form />
      <div>{state.timer}</div>
      <Table />
      {/*<div>{result}</div>*/}
    </TableContext.Provider>
  );
};
export default MineSearch;
