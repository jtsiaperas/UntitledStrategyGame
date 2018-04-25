import React from "react";
import Tile from "../tile";
import map from "./map.js";
import "./board.css";

const Board = props => {
	return(
		<div id = "board" style={{width: `${props.width}`, height: `${props.height}`}}>
			{map.map(function(row, rowIndex){
				return row.map(function(col, colIndex){
					let keyValue = rowIndex.toString()+colIndex;
					return <Tile handleCharacterClick={props.handleCharacterClick} resolveAttack={props.resolveAttack} key={keyValue} positionY={rowIndex} positionX={colIndex} type={col.type} character={col.character} id={keyValue} />
				});
			})}
			
		</div>
	);
};

export default Board;