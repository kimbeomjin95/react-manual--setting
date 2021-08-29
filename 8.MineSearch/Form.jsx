import React, { useState, useCallback, useContext } from 'react';
import {START_GAME, TableContext} from './MineSearch';

const Form = () => {
  const [row, setRow] = useState(10); // 세로
  const [cell, setCell] = useState(10); // 가로
  const [mine, setMine] = useState(20); // 지뢰
  const { dispatch } = useContext(TableContext); // context api를 통해서 dispatch를 가져옴

  const onChangeRow = useCallback(e => {
    // useCallback: 불필요한 렌더링 방지(습관 중요)
    setRow(e.target.value);
  }, []);
  const onChangeCell = useCallback(e => {
    setCell(e.target.value);
  }, []);
  const onChangeMine = useCallback(e => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => { // 우리가 입력한 값을 해당 action에 전달
    dispatch({
      type: START_GAME,
      row,
      cell,
      mine,
    });
  }, [row, cell, mine]);

  return (
    <div>
      <input
        type="number"
        placeholder="세로"
        value={row}
        onChange={onChangeRow}
      />
      <input
        type="number"
        placeholder="가로"
        value={cell}
        onChange={onChangeCell}
      />
      <input
        type="number"
        placeholder="지뢰"
        value={mine}
        onChange={onChangeMine}
      />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
};

export default Form;
