import React, {Component} from "react";
import Board from "../board";
import "./game.css";

class Game extends Component {
	
	state = {
		characters: [],
		width: window.innerWidth,
		height: window.innerHeight
	};

	handleCharacterClick = props => {

	}

	resolveAttack = props => {

	}
 
	render(){
		return(
			<Board handleCharacterClick={this.handleCharacterClick} resolveAttack={this.resolveAttack}/>
		);
	}
}

export default Game;