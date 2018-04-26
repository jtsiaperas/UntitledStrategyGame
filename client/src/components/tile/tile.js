import React from "react";
import Character from "../character";
import "./tile.css";

const Tile = props => {
	return (
		<div className={`tile ${props.type}`} id={props.id} onClick={() => props.handleMove({id: props.id, type: props.type})} >
			{(props.character) ? (<Character resolveAttack={props.resolveAttack} handleCharacterClick={props.handleCharacterClick} character={props.character} location={props.id}/>) : (<div></div>) }
		</div>
	);
};

export default Tile; 