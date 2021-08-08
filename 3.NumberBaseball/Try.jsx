import React, { memo } from 'react';

// memo: props or state가 변경되었을 때만 렌더링 실행
const Try = ({ tryInfo }) => {
  return (
    <li>
      {/*{tryInfo.try} - {tryInfo.result}*/}
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default memo(Try);
