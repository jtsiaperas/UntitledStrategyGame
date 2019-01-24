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
		player1Faction: false,
		player2Faction: false,
		startGame: false,
		player1Army:[],
		player2Army:[],
		player1Done: false
	}

	componentDidMount(){
		console.log(factions);
		API.getArenas(this.props.auth).then(arenas=>
			{
				let results = arenas.data.slice();
				console.log(results);
				this.setState({arenas:results});
			}
		).catch(err=> console.log(err));
		
	}
	
	chooseArena = arena =>{
		let points = arena.points;
		let copiedArena = Object.assign({},arena);
		this.setState({chose:copiedArena, points: points});
	}


	chooseFaction = (faction,player) =>{
		API.getCharacters(faction).then(
			characters=>
			{
				if(player==="player1")
				{
					this.setState({player1Faction: faction, characters: characters.data})
				}
				else
				{	
					let points = this.state.chose.points;
					this.setState({player2Faction: faction, characters: characters.data,player1Faction:true,points:points})
				}
			}
		).catch(err=> alert(err));

		
	}

	chooseCharacter = (index,player) =>{
		
		let characters = this.state.characters.slice();
		let character = Object.assign({},characters[index]);
		let army = [];
		if (player === "player1")
		{
		 	army = this.state.player1Army.slice();
		}
		else
		{
			army = this.state.player2Army.slice();
		}

		let startGame = false;
		let points = this.state.points;
		points -= character.pointValue;
		if (points >=0)
		{
			character.id = army.length;
			character.owner = player;
			army.push(character);

			if(points === 0 && this.state.player1Done && this.state.player1Army.length > 0)
			{
				startGame = true;
			}
			else if (points === 0 && !this.state.player1Done)
			{
				this.setState({player1Done:true, player1Faction:false, points:100});
			}

			if (player === "player1")
			{
				this.setState({points:points,player1Army:army,startGame:startGame});
			}
			else
			{
				this.setState({points:points,player2Army:army,startGame:startGame});
			}
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

				<Game arena={this.state.chose} player1Characters={this.state.player1Army} player2Characters={this.state.player2Army} {...this.props} /> ):
				(	
					this.state.player1Faction ?(
						<ArmyChoice characters={this.state.characters} player1Done={this.state.player1Done} chooseCharacter={this.chooseCharacter} points={this.state.points} />
					):
					(this.state.chose ? (
							<FactionChoice factions={factions} player1Done={this.state.player1Done} chooseFaction={this.chooseFaction} />
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