import React from "react";
import Character from "../character";
import "./tile.css";

const Tile = props => {
	return (
		<div className="tile" id={props.id}>
			{props.character? (<Character resolveAttack={props.resolveAttack} handleCharacterClick={props.handleCharacterClick} />) : (<div></div>) }
		</div>
	);
};

export default Tile; 