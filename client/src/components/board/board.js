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
			tiles: this.props.tiles,
			clicked: false
			
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


	drawCharacters = (characters,tileSize,context,spriteSheet,zoom,offsetX,offsetY) =>{
		if(characters.length > 0 )
		{	
			
			characters.forEach(char => {
			
			var x = char.x;
			var y = char.y;

			var canvasX = (char.position[0] * tileSize);
			var canvasY = (char.position[1] * tileSize);
			
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

		if(!this.state.charactersPlaced)
		{
			this.drawCharacterPool(this.state.characters,tileSize,context,spriteSheet,zoom,offsetX,offsetY);
		}

	}
	
drawCharacterPool = (characters,tileSize,context,spriteSheet,zoom,offsetX,offsetY) =>{
	let startX = Math.floor(this.props.width/10);
	startX = startX - (startX%32);
	let y = Math.floor(this.props.height/5);
	y = y - (y%32);
	context.fillStyle="black";
   	context.fillRect(startX,y,(6*tileSize),(3*tileSize));
	characters.forEach((char,index) => {
		var x = char.x;
		var y = char.y;

		var canvasX = Math.floor((index * tileSize))+startX;
		var canvasY = y;
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

drawHighlights = (highlights,tileSize,context) =>{
		
		highlights.map(highlight => {
			
				var x = highlight.x*tileSize;
				var y = highlight.y*tileSize;
				
				context.globalAlpha = 0.5;
				context.fillStyle=highlight.type;
    			context.fillRect(x,y,tileSize,tileSize);
    			context.globalAlpha = 1.0;
				
		});
}

handleClick = event => {
		
		let click = true;
		if(!this.state.charactersPlaced)
		{
			return this.placeCharacter(event);
		}

		let x = Math.floor(event.clientX/(this.props.tileSize*this.state.zoom));
		let y =  Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));

		let tiles = this.state.tiles.slice();
		let character= new Object();
		let highlights = this.state.highlights.slice();
		
		if (tiles[y][x].occupied)
		{
			character = tiles[y][x].character;
		
			if(this.state.active === character || !this.state.active)
			{	
				let range = 0;
				let color = "";

				
				if(character.didMove === true)
				{
					range = character.maxRange;
					color = "red";
				}
			
				else
				{
					range = character.skill;
					color = "green";
				}

			for(let dx=1; dx<=range; dx++)
			{
			
				if(x-dx >= 0)
				{				
					let newX = x-dx;
					highlights.push({type:color,x:newX,y:y});
				}
			
				if(x+dx < this.props.cols)
				{	
					let newX = x+dx;
					highlights.push({type:color,x:newX,y:y});
				}

				for(let dy=1; dy<=range; dy++)
				{
				
					if(y-dy >= 0)
					{
						let newY= y-dy;
						highlights.push({type:color,x:x,y:newY});
					}

					if(y+dy < this.props.rows)
					{
						let newY= y+dy;
						highlights.push({type:color,x:x,y:newY});
					}

					if (dy === dx && dy+dx <= range)
					{
						if(x-dx >= 0)
						{
							if(y-dy >= 0)
							{	
								let newY= y-dy;
								let newX= x-dx;
								highlights.push({type:color,x:newX,y:newY});
							}	
							if(y+dy < this.props.rows)
							{
								let newY= y+dy;
								let newX= x-dx;
								highlights.push({type:color,x:newX,y:newY});
							}
						}

						if(x+dx < this.props.cols)
						{
							if(y-dy >= 0)
							{	
								let newY= y-dy;
								let newX= x+dx;
								highlights.push({type:color,x:newX,y:newY});
							}
							if (y+dy < this.props.rows)
							{
								let newY= y+dy;
								let newX= x+dx;
								highlights.push({type:color,x:newX,y:newY});
							}
						}
					}
				}
			}
		
			this.setState({tiles: tiles, active: character, highlights:highlights});
		}
		
		else{
			this.resolveAttack({attacker: this.state.active, defender:character});
		}
	}
		this.setState({click:click});
	}

	placeCharacter = event =>{
		console.log(event.clientX);
		let click = true;
		let x = Math.floor(event.clientX/(this.props.tileSize*this.state.zoom));
		let y = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let characters = this.state.characters.slice();
		let army = this.state.playerArmy.slice();
		let charactersPlaced = this.state.charactersPlaced;
		let tiles = this.state.tiles.slice();
		
		if (characters.length >= 1)
		{
			if (x < this.props.cols && y < 2)
			{
				let char = characters.pop();
				console.log(characters);
				char.position = [x,y];
				char.id = army.length;
				char.didMove = false;
				tiles[y][x].character = char;
				tiles[y][x].occupied = true;
				army.push(char);
			}
		}
		if (characters.length < 1)
		{
			charactersPlaced = true;
			let ctx = this.state.context;
			ctx.clearRect(0,0,this.props.width,this.props.height);
		}
		console.log(tiles);
		this.setState({playerArmy:army,characters:characters,charactersPlaced:charactersPlaced, tiles: tiles, click: click});
	}

	handleMouseMove = event =>{
		let x = Math.floor(event.clientX/(this.props.tileSize*this.state.zoom));
		let y = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let highlights = this.state.highlights.slice().filter(highlight => highlight.type != "orange");
		// let character = this.props.characters.slice().filter(character => character.x == x && character.y == y);
		// if (character.length > 0)
		let click = true;
		highlights.push({type:"orange", x:x, y:y});
		this.setState({highlights: highlights, click:click});
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
			this.drawCharacters(this.state.playerArmy,this.props.tileSize,this.state.context,this.state.spriteSheet,this.state.zoom,this.state.offsetX,this.state.offsetY);
		}
		return(
			<canvas ref={this.canvasRef} onClick={this.handleClick} onMouseMove={this.handleMouseMove} />
		);
	}
	
};

export default Board;