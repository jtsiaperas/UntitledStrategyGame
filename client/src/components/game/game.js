import React, {Component} from "react";
import Board from "../board";
import "./game.css";

class Game extends Component {
	constructor(props){
		super(props);

		this.state = {
			player1Characters:props.player1Characters,
			player2Characters: props.player2Characters,
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
			tiles: props.arena.tiles,
			tileSize:props.arena.tileSize,
			rows:props.arena.rows,
			cols:props.arena.cols
		};

		
	}
	componentDidMount() {
		let tiles = this.state.tiles.slice()
 		tiles.forEach(row=> row.forEach(col => col.occupied = false ));
 		this.setState({tiles:tiles});
	}

	
 	render(){
		
		return(
			<div id="view">
			<Board width={this.state.width} tileSize={this.state.tileSize} height={this.state.height} player1Characters={this.state.player1Characters} player2Characters={this.state.player2Characters} tiles={this.state.tiles} rows={this.state.rows} cols={this.state.cols} />
			</div>
		);
	}
}

export default Game;