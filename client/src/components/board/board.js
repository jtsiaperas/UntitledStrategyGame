import React,{Component} from "react";
import "./board.css";

class Board extends Component{
	constructor(props){
		super(props);
		this.state = {
			canvas: "",
			spriteSheet: "",
			context: ""
		}

	}

	componentDidMount() {
		var canvas = document.getElementById("board");
		canvas.width = 900;
		canvas.height = 900;
		var ctx = canvas.getContext('2d');
		
		var spriteSheet = new Image();

		spriteSheet.src = require(`../../tileSheet.png`);
		spriteSheet.onload = () => {
			this.drawTiles(this.props.tiles,this.props.tileSize,ctx,spriteSheet,this.props.zoom);
		}

		this.setState({canvas: canvas, spriteSheet: spriteSheet, context: ctx});
	}

	drawCharacters = (tiles,tileSize,characters,context,spriteSheet,zoom) =>{
		characters.forEach(char => {
			var x = char.x;
			var y = char.y;

			var canvasX = char.position[0] * tileSize;
			var canvasY = char.position[1] * tileSize;
			var canvasTileSize = tileSize;
			
			context.drawImage(
				spriteSheet,
				x,
				y,
				tileSize,
				tileSize,
				canvasX,
				canvasY,
				canvasTileSize,
				canvasTileSize
			);
		});
	}

	drawTiles = (tiles,tileSize,context,spriteSheet,zoom) =>{
		console.log(context);
		tiles.map((row,indexR) => {
			row.map((col,indexC) =>{
				var x = col.x;
				var y = col.y;
				
				var canvasX = indexC * tileSize;
				var canvasY = indexR * tileSize;
				
				var canvasTileSize = tileSize;
				context.drawImage(
					spriteSheet,
					x,
					y,
					tileSize,
					tileSize,
					canvasX,
					canvasY,
					canvasTileSize,
					canvasTileSize
				);
				
			});
		});
	}

	render(){
		
		return(
			<div> </div>
		);
	}
	
};

export default Board;