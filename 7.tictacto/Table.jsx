import React from 'react';
import Tr from "./Tr";

const Table = ({ onClick, tableDate, dispatch }) => {
	return (
		<table onClick={onClick}>
			{Array(tableDate.length).fill().map((tr, i) => (<Tr key={i} rowIndex={i} rowData={tableDate[i]} dispatch={dispatch} />))}
		</table>
	)
}

export default Table;