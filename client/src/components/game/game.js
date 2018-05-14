import React, {Component} from "react";
import Board from "../board";
import "./game.css";

class Game extends Component {
	constructor(props){
		super(props);

		this.state = {
			characters:props.characters,
			width: "",
			height: "",
			tiles: props.arena.tiles,
			active: false,
			target: false,
			tileSize:props.arena.tileSize,
			zoom:2,
			rows:props.arena.rows,
			cols:props.arena.cols
		};
	}
	componentDidMount() {
		let width = document.documentElement.clientWidth;
		let height = document.documentElement.clientHeight;
	
		this.setState({width:width,height:height});
	}

	handleClick = character => {
		
		if(this.state.active === character || !this.state.active)
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
		
			this.setState({tiles: tiles, characters: characters, active: character});
		}

		else{
			this.resolveAttack({attacker: this.state.active, defender:character});
		}
	}

	handleMove = (target) => {

		if (target.type === "orange" && this.state.active && !target.character)
		{
			let tiles = this.state.tiles.slice();
			let characters = this.state.characters.slice();
			let character = this.state.active;
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

			this.setState({tiles: tiles, active: false, characters: characters});
		}	

	}

	resolveAttack = props => {
		alert("attack!");
		let characters = this.state.characters.slice();
		let tiles = this.state.tiles.slice();
		let hits = 0;
		let toWound = 4+(props.attacker.skill-props.defender.skill);
		
		for (let i = 0; i<props.attacker.strength; i++)
		{
			let roll = Math.floor(Math.random()*6) + 1;
			if (roll <= toWound)
			{
				hits++;
			}
		}

		props.defender.health -= hits;

		if (props.defender.health > 0)
		{	
			characters[props.defender.id] = props.defender;
		}
		else
		{
			tiles[props.defender.location[0]][props.defender.location[1]].character = false;
			characters[props.defender.id] = false;
		}

		this.setState({characters: characters, tiles: tiles});
	}
 
	render(){
		
		return(
			<div id="view">
			<Board handleMove={this.handleMove} handleCharacterClick={this.handleCharacterClick} resolveAttack={this.resolveAttack} width={this.state.width} tileSize={this.state.tileSize} height={this.state.height} characters={this.state.characters} tiles={this.state.tiles} rows={this.state.rows} cols={this.state.cols} />
			</div>
		);
	}
}

export default Game;