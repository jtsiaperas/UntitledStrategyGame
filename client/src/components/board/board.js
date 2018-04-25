import React from "react";
import Tile from "../tile";
import Character from "../character";
import "./board.css";

const Board = props => {
	return(
		<div id = "board" >
			<Tile />
			<Character handleCharacterClick={props.handleCharacterClick} resolveAttack={props.resolveAttack} />
		</div>
	);
};

export default Board;