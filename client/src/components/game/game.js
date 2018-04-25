import React, {Component} from "react";
import Board from "../board";
import "./game.css";

class Game extends Component {
	
	state = {
		characters: [],
		width: `96vw`,
		height: `96vh`
	};

	componentDidMount() {
		this.setState({
			width: `96vw`,
			height: `96vh`
		});
	}

	handleCharacterClick = props => {
		alert("click!");
	}

	resolveAttack = props => {

	}
 
	render(){
		return(
			<Board handleCharacterClick={this.handleCharacterClick} resolveAttack={this.resolveAttack} width={this.state.width} height={this.state.height} />
		);
	}
}

export default Game;