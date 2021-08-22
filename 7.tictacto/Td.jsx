import React, { useCallback, useEffect, useRef, memo } from 'react';
import { CLICK_CELL } from './Tictactoe';

// memo: props만 변경되지 않으면 리렌더링이 되지 않음, 반복문을 memo를 사용해주면 좋음
const Td = memo(({ rowIndex, cellIndex, dispatch, cellData,  }) => {
  // dispatch: 부모 tictactoe로부터 dispatch를 전달받지만 이는 나중에 context api로 해결
  console.log('td rendered');

  // 무엇때문에 렌더링 되는지 확인하는 법(성능 최적화)
  const ref = useRef([]);
  useEffect(() => {
    console.log(
      rowIndex === ref.current[0], // 바뀌는게 있다면 false이며, 이는 rerendering이 발생하는 이유
      rowIndex === ref.current[1],
      rowIndex === ref.current[2],
      rowIndex === ref.current[3],
    );
	  console.log(cellData, ref.current[2])
	  console.log(rowIndex, cellIndex, cellData,)
    ref.current = [rowIndex, cellIndex, cellData, dispatch]; // ref는 계속 바뀌며 가끔씩 나머지 데이터들이 안바뀌는 경우가 있음
  }, [rowIndex, cellIndex, cellData, dispatch]); // props 데이터 모두 넣기

  const onClickTd = useCallback(() => {
    if (cellData) {
      // 기존 cell 클릭 시 cell 데이터가 생성됨
      return;
    }
    // dispatch에서 state를 변경하는 것은 비동기이다(useReducer Hook의 경우),
    // redux에서는 state 변경 하는 것이 동기적이다
    // 비동기 state를 처리하기 위해선 useEffect를 사용해야 함
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);
  return <td onClick={onClickTd}>{cellData}</td>; // props 넘겨주는 데이터(onClick)는 useCallback으로 감싸는 것이 좋음
});

export default Td;
