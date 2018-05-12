import React, {Component} from "react";
import API from "../../utils/API.js";
import factions from "../../factions.js";
import Game from "../game";
import FactionChoice from "../factionChoice";
import ArenaChoice from "../arenaChoice";
import ArmyChoice from "../armyChoice"
import "./newGame.css";

class NewGame extends Component {
	
	constructor(props) {
		super(props);
		this.state ={
			user: localStorage.getItem('user'),
			arenas: [],
			characters: false,
			chose: false,
			points: 0,
			faction: false,
			startGame: false,
			army:false
		}
	}

	componentDidMount(){
		console.log(factions);
		API.getArenas().then(arenas=>
			{
				console.log(arenas);
				this.setState({arenas:arenas});
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
				this.setState({faction: faction, characters: characters})
		).catch(err=> alert(err));
		
	}

	chooseCharacter = character =>{
		let army = [];
		let startGame = false;
		if(this.state.army)
		{
			army = this.state.army.slice();
		}
		let points = this.state.points - character.points;
		if (points >=0)
		{
			army.push[character];
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
							<FactionChoice factions={this.state.factions} chooseFaction={this.chooseFaction} />
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