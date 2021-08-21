import React, { useCallback } from 'react';
import { CLICK_CELL } from './Tictactoe';

const Td = ({ rowIndex, cellIndex, cellData, dispatch}) => { // dispatch: 부모 tictactoe로부터 dispatch를 전달받지만 이는 나중에 context api로 해결
  const onClickTd = useCallback(() => {
  	if (cellData) { // 기존 cell 클릭 시 cell 데이터가 생성됨
  		return
	  }
  	// dispatch에서 state를 변경하는 것은 비동기이다(useReducer Hook의 경우),
	  // redux에서는 state 변경 하는 것이 동기적이다
	  // 비동기 state를 처리하기 위해선 useEffect를 사용해야 함
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
