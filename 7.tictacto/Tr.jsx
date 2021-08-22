import React, { useEffect, useMemo, useRef, memo } from 'react'; // useMemo: // useMemo: 값을 기억하는거지만, 컴포넌트도 가능(값이 변경되지 않음)
import Td from './Td';

const Tr = memo(({ rowIndex, rowData, dispatch }) => {
  console.log('tr render');

  const ref = useRef([]);

  useEffect(() => {
    console.log(
      rowIndex === ref.current[0], // 바뀌는게 있다면 false이며, 이는 rerendering이 발생하는 이유
      rowIndex === ref.current[1],
      rowIndex === ref.current[2],
    );
    // console.log(cellData, ref.current[1]);
    // console.log(rowIndex, rowData);
    ref.current = [rowIndex, rowData, dispatch]; // ref는 계속 바뀌며 가끔씩 나머지 데이터들이 안바뀌는 경우가 있음
  }, [rowIndex, rowData, dispatch]); // props 데이터 모두 넣기

  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map(
          (
            td,
            i, // 반복문(map)안에서는 key를 무조건 입력해야 함
          ) => (
            <Td
              key={i}
              rowIndex={rowIndex}
              cellIndex={i}
              cellData={rowData[i]}
              dispatch={dispatch}
            /> // 셀의 내용이 변경되었을 때만 컴포넌트를 새롭게 렌더링하고 그 외는 렌더링하지 않음
          ),
        )}
    </tr>
  );
});

export default Tr;
