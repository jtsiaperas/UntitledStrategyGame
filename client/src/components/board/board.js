import React from "react";
import Tile from "../tile";
import "./board.css";

const Board = props => {
	return(
		<canvas id = "board" width={props.width} height={props.height} >
			{props.tiles.map(function(row, rowIndex){
				return row.map(function(col, colIndex){
					let keyValue = rowIndex.toString()+colIndex;
					return <Tile handleCharacterClick={props.handleCharacterClick} height={props.tileHeight} width={props.tileWidth} handleMove = {props.handleMove} resolveAttack={props.resolveAttack} key={keyValue} positionY={colIndex} positionX={rowIndex} type={col.type} character={col.character} id={keyValue} />
				});
			})

			}
		</canvas>
	);
};

export default Board;