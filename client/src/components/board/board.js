import React from "react";
import Tile from "../tile";
import Character from "../character";
import map from "./map.js";
import "./board.css";

const Board = props => {
	return(
		<div id = "board" style={{width: `${props.width}`, height: `${props.height}`}}>
			{map.map(function(row){
				return row.map(function(col){
					let keyValue = row.index.toString()+col.index;
					return <Tile key={keyValue} positionY={row.index} positionX={col.index} />
				});
			})}

			<Character handleCharacterClick={props.handleCharacterClick} resolveAttack={props.resolveAttack} />
		</div>
	);
};

export default Board;