import React, {createContext, useMemo, useReducer} from 'react';
import Table from "./Table";
import Form from "./Form";

export const CODE = {
  MINE: -7, // 지뢰
  NORMAL: -1,  // 정상
  QUESTION: -2,
  FLAG: -3, // 깃발
  QUESTION_MINE: -4, // 물음표 칸에 지뢰가 있는 경우
  FLAG_MINE: -5, // 깃발 칸에 지뢰가 있는 경우
  CLICKED_MINE: -6, // 실수로 지뢰를 클릭한 경우
  OPENED: 0 // 칸을 정상적으로 연 경우, 0이상이면 open되게
}

export const TableContext = createContext({
  tableData: [], // -1: 기본, -7: 지뢰
  dispatch: () => {} // 함수
}); // 초기값을 넣을 수 있음

const initialState = {
  tableData: [],
  timer: 0,
  result: ''
}

export const START_GAME = 'START_GAME';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine), // 지뢰 심는 함수
      }
    default:
      return state;
  }
}

const MineSearch = () => {

  const [state, dispatch] = useReducer(reducer ,initialState);
  const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]); // state.tableData가 변경 될때 value값 갱신
  // useMemo를 통해서 값을 기억해줘야 context api 성능저하가 덜 발생됨
  return (
    <TableContext.Provider value={value}> {/* 넘길값은 value에 설정하며, 자식 컴포넌트에서는 value 데이터에 접근 가능 */}
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  )
}
export default MineSearch;
