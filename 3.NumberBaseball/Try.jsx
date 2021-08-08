import React from 'react';

const Try = ({ tryInfo }) => {
  return (
    <li>
      {tryInfo.try} - {tryInfo.result}
    </li>
  );
};

export default Try;
