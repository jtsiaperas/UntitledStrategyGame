import React, {Component} from "react";
import API from "../../utils/API.js";
import factions from "../../factions.js";
import Game from "../game";
import FactionChoice from "../factionChoice";
import ArenaChoice from "../arenaChoice";
import ArmyChoice from "../armyChoice"
import "./newGame.css";


class NewGame extends Component {
	
	state = {
		user: localStorage.getItem('user'),
		arenas:false,
		characters: false,
		chose: false,
		points: 0,
		faction: false,
		startGame: false,
		army:[]	
	}

	componentDidMount(){
		console.log(factions);
		API.getArenas().then(arenas=>
			{
				let results = arenas.data.slice();
				console.log(results);
				this.setState({arenas:results});
			}
		).catch(err=> alert(err));
		
	}
	
	chooseArena = arena =>{
		let points = arena.points;
		this.setState({chose:arena, points: points});
	}

	chooseFaction = faction =>{
		API.getCharacters(faction).then(
			characters=>
				this.setState({faction: faction, characters: characters.data})
		).catch(err=> alert(err));
		
	}

	chooseCharacter = index =>{
		let characters = this.state.characters.slice();
		let character = Object.assign({},characters[index]);
		let army = this.state.army.slice();
		let startGame = false;
		let points = this.state.points - character.pointValue;
		if (points >=0)
		{
			army.push(character);
			if(points == 0)
			{
				startGame = true;
			}
			this.setState({points:points,army:army,startGame:startGame});
		}
		else
		{
			alert("This character exceeds point limit!");
		}
	
		
	}
		
 	render(){
		
		return(
			<div id="newGame">
			{this.state.startGame?(

				<Game arena={this.state.chose} characters={this.state.army} {...this.props} /> ):
				(	
					this.state.faction ?(
						<ArmyChoice characters={this.state.characters} chooseCharacter={this.chooseCharacter} points={this.state.points} />
					):
					(this.state.chose ? (
							<FactionChoice factions={factions} chooseFaction={this.chooseFaction} />
						):
						(
							<ArenaChoice arenas={this.state.arenas} chooseArena={this.chooseArena} />
						)

					)
				)
			}
			</div>
		);
	}
}

export default NewGame;