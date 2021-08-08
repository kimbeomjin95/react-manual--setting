import React from 'react';

const Try = ({ v, i }) => {
  return (
    <li key={v.fruit + v.taste}>
      {v.fruit} - {v.taste} - {i}
      <div>콘텐츠1</div>
      <div>컨텐츠2</div>
      <div>컨텐츠3</div>
    </li>
  );
};

export default Try;
