import React, {Component} from "react";
import Board from "../board";
import map from "./map.js";
import "./game.css";

class Game extends Component {
	
	state = {
		characters: [],
		width: `96vw`,
		height: `96vh`,
		tiles: [],
		lastClicked: null
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
		let characters = this.state.characters.slice();
		characters[character.id] = character;

		for(let dx=1; dx<=character.skill; dx++)
		{
			
			if(x-dx >= 0)
			{				
				tiles[x-dx][y].type = "orange";
			}
			
			if(x+dx < 8)
			{	
				tiles[x+dx][y].type = "orange";
			}

			for(let dy=1; dy<=character.skill; dy++)
			{
				
				if(y-dy >= 0)
				{
					tiles[x][y-dy].type = "orange";
				}

				if(y+dy < 8)
				{
					tiles[x][y+dy].type = "orange";
				}

				if (dy === dx && dy+dx <= character.skill)
				{
					if(x-dx >= 0)
					{
						if(y-dy >= 0)
						{	
							tiles[x-dx][y-dy].type = "orange";
						}
						
						tiles[x-dx][y+dy].type = "orange";
					}

					tiles[x+dx][y-dy].type = "orange";
					tiles[x+dx][y+dy].type = "orange";
				}
			}
		}
		
		this.setState({tiles: tiles, lastClicked: character});
	}

	handleMove = (target) => {
		if (target.type === "orange" && this.state.lastClicked)
		{
			let character = this.state.lastClicked;
			let tiles = this.state.tiles.slice();
			

			let oldTile = character.location.split("");
			let oldX = parseInt(oldTile[0]);
			let oldY = parseInt(oldTile[1]);

			tiles[oldX][oldY].character = false;

			let tileIndex = target.id.split("");
			let newX = parseInt(tileIndex[0]);
			let newY = parseInt(tileIndex[1]);

			character.location = target.id;
			tiles[newX][newY].character = character;

			
			this.setState({tiles: tiles, lastClicked: false});
		}	

	}

	resolveAttack = props => {

	}
 
	render(){
		
		return(
			<Board handleMove={this.handleMove} handleCharacterClick={this.handleCharacterClick} resolveAttack={this.resolveAttack} width={this.state.width} height={this.state.height} characters={this.state.characters} tiles={this.state.tiles} />
		);
	}
}

export default Game;