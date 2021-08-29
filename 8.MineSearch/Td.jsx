import React, { useCallback, useContext } from 'react';
import {
  CLICK_MINE,
  CODE,
  FLAG_CELL,
  NOMALIZE_CELL,
  OPEN_CELL,
  QUESTION_CELL,
  TableContext,
} from './MineSearch';

const getTdStyle = code => {
  switch (code) {
    case CODE.NORMAL: // 기본칸
    case CODE.MINE:
      return {
        background: '#444',
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: 'white',
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: 'yellow',
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: 'red',
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
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return '?';
    default:
      return '';
  }
};

const Td = ({ rowIndex, cellIndex }) => {
  // 몇번째 칸 몇번째 줄인지 알수가 있음
  const { tableData, halted, dispatch } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (halted) {
      console.log('halted', halted);
      // 지뢰 클릭 시 게임 stop
      return;
    }
    switch (
      tableData[rowIndex][cellIndex] // 칸 상태별로 클릭했을 때 동작이 달라야 함
    ) {
      case CODE.OPENED:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE: // 위 5개는 클릭이 안되게 설정
        return;
      case CODE.NORMAL: // -1 값을 클릭시 해당 cell open
        dispatch({
          type: OPEN_CELL,
          row: rowIndex,
          cell: cellIndex,
        });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, cell: cellIndex });
        return;
      default:
        return '';
    }
  }, [tableData[rowIndex][cellIndex], halted]); // 데이터는 계속 변경되므로

  const onRightClickTd = useCallback(
    e => {
      e.preventDefault(); // 클릭시 메뉴 뜨는 부분 해제
      if (halted) {
        // 지뢰 클릭 시 게임 stop
        return;
      }
      switch (tableData[rowIndex][cellIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, cell: cellIndex }); // 보통 -> 깃발
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          dispatch({ type: QUESTION_CELL, row: rowIndex, cell: cellIndex }); // 깃발 -> 물음표
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: NOMALIZE_CELL, row: rowIndex, cell: cellIndex }); // 깃발 -> 보통
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][cellIndex], halted],
  );

  // onContextMenu: 오른쪽 클릭 event
  return (
    <td
      style={getTdStyle(tableData[rowIndex][cellIndex])}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >
      {' '}
      {/* 리액트가 좋은점이 알아서 데이터에 따라 화면을 변경해줌 */}
      {getTdText(tableData[rowIndex][cellIndex])}
    </td>
  );
};

export default Td;
