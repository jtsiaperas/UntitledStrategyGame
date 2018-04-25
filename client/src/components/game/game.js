import React, {Component} from "react";
import Board from "../board";
import "./game.css";

class Game extends Component {
	
	state = {
		characters: []
	};

	render(){
		return(<Board />);
	}
}

export default Game;