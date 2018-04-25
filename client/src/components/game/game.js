import React, {Component} from "react";
import {Loop, Stage} from "react-game-kit";
import Board from "../board";
import "./game.css";

class Game extends Component {
	
	state = {
		characters: []
	};

	componentDidMount() {
    	
  	}

  	componentWillUnmount() {
    	
    }

 	update() {
    // tick logic
  	}

	render(){
		return(
			<Loop>
				<Stage>
					<Board />
				</Stage>
			</Loop>
		);
	}
}

export default Game;