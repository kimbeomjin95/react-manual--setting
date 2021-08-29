import React, {useContext} from 'react';
import Td from "./Td";
import {TableContext} from "./MineSearch";

const Tr = ({ rowIndex }) => {
  const {tableData} = useContext(TableContext);
  return (
    <tr>
      {tableData[0] && Array(tableData[0].length).fill().map((td, i) => <Td rowIndex={rowIndex} cellIndex={i}/>)}  {/* tableData[0]가 0일수도 있으므로 */}
    </tr>
  )
}

export default Tr;