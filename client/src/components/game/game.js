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
		
		const position = character.location.split("");
		let x = parseInt(position[0]);
		let y = parseInt(position[1]);
		let tiles = this.state.tiles.slice();
		
		for(let dx=1; dx<character.skill; dx++)
		{
			
			if(x-dx >= 0)
			{				
				tiles[x-dx][y].type = "orange";
			}
				
				tiles[x+dx][y].type = "orange";

			for(let dy=1; dy<character.skill; dy++)
			{
				
			}
		}
		
		this.setState({tiles: tiles});
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