import React, { useContext } from 'react';
import { CODE, TableContext } from './MineSearch';

const getTdStyle = code => {
  switch (code) {
    case CODE.NORMAL: // 기본칸
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.OPENED:
      return {
        background: 'white',
      };
    default:
      return {
        background: 'white',
      };
  }
};

const getTdText = code => {
  switch (code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X'
    default:
      return '';
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  // 몇번째 칸 몇번째 줄인지 알수가 있음
  const { tableData } = useContext(TableContext);

  return (
    <td style={getTdStyle(tableData[rowIndex][cellIndex])}>
      {' '}
      {/* 리액트가 좋은점이 알아서 데이터에 따라 화면을 변경해줌 */}
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  );
};

export default Td;
