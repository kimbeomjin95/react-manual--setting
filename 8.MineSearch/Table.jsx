import React, {useContext} from 'react';
import Tr from "./Tr";
import {TableContext} from "./MineSearch";

const Table = () => {
	const { tableData } = useContext(TableContext); // value.tableContext
	return (
		<table>
			{Array(tableData.length).fill().map((tr, i) => <Tr rowIndex={i}/>)} {/* fill() 메소드는 정적 인 값을 갖는 배열에서 모든 요소를 채운다. */}
			{/* 지뢰가  몇번째줄 몇번째 칸에 그려야 하는지 알아야 하기 때문에 index 넘기기 */}
		</table>
	)
}

export default Table;