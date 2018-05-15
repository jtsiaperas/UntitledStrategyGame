import React, {Component} from "react";
import Board from "../board";
import "./game.css";

class Game extends Component {
	constructor(props){
		super(props);

		this.state = {
			characters:props.characters,
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
			tiles: props.arena.tiles,
			tileSize:props.arena.tileSize,
			rows:props.arena.rows,
			cols:props.arena.cols
		};
	}
	componentDidMount() {
	
	}

	
 	componentDidUpdate(){
 		let width = document.documentElement.clientWidth;
 		let height = document.documentElement.clientHeight;
 		this.setState({width: width, height: height});
 	}

	render(){
		
		return(
			<div id="view">
			<Board width={this.state.width} tileSize={this.state.tileSize} height={this.state.height} characters={this.state.characters} tiles={this.state.tiles} rows={this.state.rows} cols={this.state.cols} />
			</div>
		);
	}
}

export default Game;