import React from 'react';
import Tr from "./Tr";

const Table = ({ onClick, tableDate }) => {
	return (
		<table onClick={onClick}>
			{Array(tableDate.length).fill().map((tr, i) => (<Tr rowData={tableDate[i]}/>))}
		</table>
	)
}

export default Table;