import React, {Component} from "react";
import API from "../../utils/API.js";
import factions from "../../../public/factions.js";
import "./newGame.css";

class NewGame extends Component {
	
	constructor(props) {
		super(props);
		this.state ={
			user: localStorage.getItem('user'),
			arenas: API.getArenas(),
			characters: false,
			chose: false,
			points: 0,
			faction: false
		}
	}
	
	chooseArena = arena =>{
		let points = arena.points;
		this.setState({chose:arena, points: points});
	}

	chooseFaction = faction =>{
		let characters = API.getCharacters(faction);
		this.setState({faction: faction, characters: characters});
	}
		
 	render(){
		
		return(
			<div id="newGame">
			{this.state.faction ?(
				<div className="row">
				{characters.forEach(character =>
					return(
					<div className="col">
						<div className="card">
						<div className="card-header">
								{character.name}
							</div>
							<div className="card-body">
								<p>
									{character.description}
								</p>
							</div>
						</div>
					</div>	
					);
				)}

				):
				</div>

				(this.state.chose ? (
				{factions.forEach(faction => {
					return(
						<div className="card" onClick={()=>this.chooseFaction(faction)}>
							<div className="card-header">
								{faction.name}
							</div>
							<div className="card-body">
								<p>
									{faction.description}
								</p>
							</div>
						</div>
					);
				});}
				):
				(
				{arenas.forEach(arena => {
					return(
						<div className="card" onClick={()=>this.chooseArena(arena)}>
							<div className="card-header">
								{arena.name}
							</div>
							<div className="card-body">
								<p>
									{arena.description}
								</p>
							</div>
						</div>
					);
				});}
			)
			)
			}


			</div>
		);
	}
}

export default NewGame;