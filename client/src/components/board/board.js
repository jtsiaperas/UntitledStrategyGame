import React,{Component} from "react";
import "./board.css";

class Board extends Component{
	constructor(props){
		super(props);
		this.state = {
			canvas: "",
			spriteSheet: "",
			context: "",
			offsetX:"",
			offsetY:"",
			zoom:2,
			highlights:[],
			floaters:[],
			active: false,
			target: false,
			charactersPlaced:false,
			playerArmy:[],
			characters: this.props.characters,
			tiles: this.props.tiles
			
		}
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		var canvas = this.canvasRef.current;
		
		let boardWidth = this.props.tileSize * this.props.cols;
		let boardHeight = this.props.tileSize * this.props.rows;

		let zoom = Math.floor(this.props.width/boardWidth);

		canvas.width= this.props.width;
		canvas.height= this.props.height;

		var offsetX = 0;
		var offsetY = 0;

  		if(offsetY < 0)
  		{
  			offsetY = 32;
  		}
  		if (offsetX < 0)
  		{
  			offsetX = 32;
  		}

		var ctx = canvas.getContext('2d');
		ctx.scale(zoom,zoom);
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;

		var spriteSheet = new Image();

		spriteSheet.src = require(`../../tileSheet.png`);
		spriteSheet.onload = () => {
			this.drawTiles(this.state.tiles,this.props.tileSize,ctx,spriteSheet,this.state.zoom,offsetX,offsetY);
		}

		this.setState({canvas: canvas, spriteSheet: spriteSheet, context: ctx, offsetY: offsetY, offsetX: offsetX, zoom: zoom});
	}


	drawCharacters = (tiles,tileSize,characters,context,spriteSheet,zoom,offsetX,offsetY) =>{
		characters.forEach(char => {
			var x = char.x;
			var y = char.y;

			var canvasX = (char.position[0] * tileSize)+offsetX;
			var canvasY = (char.position[1] * tileSize)+offsetY;
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

	drawTiles = (tiles,tileSize,context,spriteSheet,zoom,offsetX,offsetY) =>{
		
		tiles.map((row,indexR) => {
			
			row.map((col,indexC) =>{
				var x = col.x;
				var y = col.y;
				
				var canvasX = (indexC * tileSize) + offsetX;
				var canvasY = (indexR * tileSize) + offsetY;
				console.log(canvasY);
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

drawHighlights = (highlights,tileSize,context,spriteSheet,zoom,offsetX,offsetY) =>{
		
		highlights.map(highlight => {
			
				var x = highlight.x*tileSize;
				var y = highlight.y*tileSize;
				var color;
				switch(highlight.type)
				{
					case "hover":
					color = "orange";
					break;
				}

				context.globalAlpha = 0.2;
				context.fillStyle=color;
    			context.fillRect(x,y,tileSize,tileSize);
    			context.globalAlpha = 1.0;
				
		});
	}
	handleClick = event => {
		alert("click!");

		if(!this.state.charactersPlaced)
		{
			return this.placeCharacter(event);
		}

		let x = event.positionX;
		let y = event.positionY;
		let tiles = this.state.tiles.slice();
		let character = tiles[y][x].character;
		if(this.state.active === character || !this.state.active)
		{	
			let characters = this.state.characters.slice();
			let range = 0;
			let color = "";

			characters[character.id]=character;
		
			if(character.didMove === true)
			{
				range = 1;
				color = "red";
			}
			else
			{
				range = character.skill;
				color = "orange";
			}

			for(let dx=1; dx<=range; dx++)
			{
			
				if(x-dx >= 0)
				{				
					tiles[x-dx][y].type = color;
				}
			
				if(x+dx < 8)
				{	
					tiles[x+dx][y].type = color;
				}

				for(let dy=1; dy<=range; dy++)
				{
				
					if(y-dy >= 0)
					{
						tiles[x][y-dy].type = color;
					}

					if(y+dy < 8)
					{
						tiles[x][y+dy].type = color;
					}

					if (dy === dx && dy+dx <= range)
					{
						if(x-dx >= 0)
						{
							if(y-dy >= 0)
							{	
								tiles[x-dx][y-dy].type = color;
							}
							if(y+dy < 8)
							{
								tiles[x-dx][y+dy].type = color;
							}
						}

						if(x+dx < 8)
						{
							if(y-dy >= 0)
							{	
								tiles[x+dx][y-dy].type = color;
							}
							if (y+dy < 8)
							{
								tiles[x+dx][y+dy].type = color;
							}
						}
					}
				}
			}
		
			this.setState({tiles: tiles, characters: characters, active: character});
		}

		else{
			this.resolveAttack({attacker: this.state.active, defender:character});
		}
	}

	placeCharacter = event =>{
		let x = Math.floor(event.clientX/(this.props.tileSize*this.state.zoom));
		let y = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let characters = this.state.characters.slice();
		let army = this.state.playerArmy.slice();

		if (x < 2 && y < 2)
		{
			army.push(characters.pop());
		}

		this.setState
	}

	handleMouseMove = event =>{
		let x = Math.floor(event.clientX/(this.props.tileSize*this.state.zoom));
		let y = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let highlights = this.state.highlights.slice().filter(highlight => highlight.type != "hover");
		// let character = this.props.characters.slice().filter(character => character.x == x && character.y == y);
		// if (character.length > 0)
		highlights.push({type:"hover", x:x, y:y});
		this.setState({highlights: highlights});
	}
	handleMove = (target) => {

		if (target.type === "orange" && this.state.active && !target.character)
		{
			let tiles = this.state.tiles.slice();
			let characters = this.state.characters.slice();
			let character = this.state.active;
			let oldTile = character.location
			let oldX = oldTile[0];
			let oldY = oldTile[1];

			tiles[oldX][oldY].character = false;
			
			let newX = target.positionX;
			let newY = target.positionY;

			character.location = [newX,newY];
			
			character.didMove = true;
			characters[character.id] = character;
			tiles[newX][newY].character = character;

			tiles.forEach(row => {
				row.forEach(tile => {
					tile.type = 0;
				});
			});

			this.setState({tiles: tiles, active: false, characters: characters});
		}	

	}

	resolveAttack = props => {
		alert("attack!");
		let characters = this.state.characters.slice();
		let tiles = this.state.tiles.slice();
		let hits = 0;
		let toWound = 4+(props.attacker.skill-props.defender.skill);
		
		for (let i = 0; i<props.attacker.strength; i++)
		{
			let roll = Math.floor(Math.random()*6) + 1;
			if (roll <= toWound)
			{
				hits++;
			}
		}

		props.defender.health -= hits;

		if (props.defender.health > 0)
		{	
			characters[props.defender.id] = props.defender;
		}
		else
		{
			tiles[props.defender.location[0]][props.defender.location[1]].character = false;
			characters[props.defender.id] = false;
		}

		this.setState({characters: characters, tiles: tiles});
	}
 	

	render(){
		if (this.state.context)
		{
			this.drawTiles(this.state.tiles,this.props.tileSize,this.state.context,this.state.spriteSheet,this.state.zoom,this.state.offsetX,this.state.offsetY);
			this.drawHighlights(this.state.highlights,this.props.tileSize,this.state.context,this.state.offsetX, this.state.offsetY);
		}
		return(
			<canvas ref={this.canvasRef} onClick={this.handleClick} onMouseMove={this.handleMouseMove} />
		);
	}
	
};

export default Board;