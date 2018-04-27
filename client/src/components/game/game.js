import React, {Component} from "react";
import Board from "../board";
import map from "./map.js";
import "./game.css";

class Game extends Component {
	
	state = {
		characters: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		width: `96vw`,
		height: `96vh`,
		tiles: [],
		lastClicked: false
	};

	componentDidMount() {
		this.setState({
			width: `96vw`,
			height: `96vh`,
			tiles: map,
		});
	}

	handleCharacterClick = character => {
		
		if(!this.state.lastClicked)
		{	
			let x = character.location[0];
			let y = character.location[1];

			let tiles = this.state.tiles.slice();
			let characters = this.state.characters.slice();
			let range = 0;
			let color = "";

			characters[character.id]=character;
		
			if(character.didMove === true)
			{
				range = 1;
				color = "red";
			}
			else
			{
				range = character.skill;
				color = "orange";
			}

			for(let dx=1; dx<=range; dx++)
			{
			
				if(x-dx >= 0)
				{				
					tiles[x-dx][y].type = color;
				}
			
				if(x+dx < 8)
				{	
					tiles[x+dx][y].type = color;
				}

				for(let dy=1; dy<=range; dy++)
				{
				
					if(y-dy >= 0)
					{
						tiles[x][y-dy].type = color;
					}

					if(y+dy < 8)
					{
						tiles[x][y+dy].type = color;
					}

					if (dy === dx && dy+dx <= range)
					{
						if(x-dx >= 0)
						{
							if(y-dy >= 0)
							{	
								tiles[x-dx][y-dy].type = color;
							}
							if(y+dy < 8)
							{
								tiles[x-dx][y+dy].type = color;
							}
						}

						if(x+dx < 8)
						{
							if(y-dy >= 0)
							{	
								tiles[x+dx][y-dy].type = color;
							}
							if (y+dy < 8)
							{
								tiles[x+dx][y+dy].type = color;
							}
						}
					}
				}
			}
		
			this.setState({tiles: tiles, lastClicked: character, characters: characters});
		}
	}

	handleMove = (target) => {

		if (target.type === "orange" && this.state.lastClicked)
		{
			let tiles = this.state.tiles.slice();
			let characters = this.state.characters.slice();
			let character = characters[this.state.lastClicked.id];
			let oldTile = character.location
			let oldX = oldTile[0];
			let oldY = oldTile[1];

			tiles[oldX][oldY].character = false;
			
			let newX = target.positionX;
			let newY = target.positionY;

			character.location = [newX,newY];
			
			character.didMove = true;
			characters[character.id] = character;
			tiles[newX][newY].character = character;

			tiles.forEach(row => {
				row.forEach(tile => {
					tile.type = 0;
				});
			});

			console.log(characters);

			this.setState({tiles: tiles, lastClicked: false, characters: characters});
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