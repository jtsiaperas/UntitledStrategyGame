import React, {Component} from "react";
import Board from "../board";
import map from "./map.js";
import "./game.css";

class Game extends Component {
	
	state = {
		characters: [],
		width: `96vw`,
		height: `96vh`,
		tiles: []
	};

	componentDidMount() {
		this.setState({
			width: `96vw`,
			height: `96vh`,
			tiles: map
		});
	}

	handleCharacterClick = character => {
		alert("click!");
		const position = character.location.split("");
		let [x,y] = position;
		let tiles = this.state.tiles.slice();

		for(let dx=0; dx<character.skill; dx++)
		{
			if(x-dx > 0)
			{
				tiles[y][(x-dx)].type = "orange";
			}

			for(let dy=0; dy<character.skill; dy++)
			{
				
			}
		}
	}

	resolveAttack = props => {

	}
 
	render(){
		return(
			<Board handleCharacterClick={this.handleCharacterClick} resolveAttack={this.resolveAttack} width={this.state.width} height={this.state.height} characters={this.state.characters} tiles={this.state.tiles} />
		);
	}
}

export default Game;