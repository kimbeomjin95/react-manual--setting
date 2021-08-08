import React, { memo, useState } from 'react';

// memo: props or state가 변경되었을 때만 렌더링 실행
const Try = ({ tryInfo }) => {
  // 부모한테 받은 props를 변경해야 하면 useState를 만든 다음에 setState로 변경해야 함
  const [result, setResult] = useState(tryInfo.result);

  const onClick = () => {
    setResult('1')
  }

  return (
    <li>
      {/*{tryInfo.try} - {tryInfo.result}*/}
      <div>{tryInfo.try}</div>
      {/*<div>{tryInfo.result}</div>*/}
      <div onClick={onClick}>{result}</div>
    </li>
  );
};

export default memo(Try);
