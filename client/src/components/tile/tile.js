import React from "react";
import Character from "../character";
import "./tile.css";

const Tile = props => {
	return (
		<div className={`tile ${props.type}`} id={props.id} onClick={() => props.handleMove({id: props.id, type: props.type, positionX: props.positionX, positionY: props.positionY})} >
			{(props.character) ? (<Character resolveAttack={props.resolveAttack} id={props.character.id} handleCharacterClick={props.handleCharacterClick} character={props.character} positionX={props.positionX} positionY={props.positionY} />) : (<div></div>) }
		</div>
	);
};

export default Tile; 