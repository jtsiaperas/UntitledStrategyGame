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
			player1Army:[],
			player2Army:[],
			player1Characters: this.props.player1Characters,
			player2Characters: this.props.player2Characters,
			tiles: this.props.tiles,
			clicked: false,
			player1Turn: true
			
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
			
			context.globalAlpha = 0.5
			context.fillStyle="black";
   			context.font = "10px Courier New";
   			context.fillRect(canvasX,canvasY,32,10);
   			
   			context.globalAlpha = 1;  			
   			context.fillStyle="white";
			context.fillText(char.strength, canvasX+2, canvasY+8);
			context.fillText(char.health, canvasX+24, canvasY+8);
			
			});
			
		}

		if(!this.state.charactersPlaced)
		{
			if(this.state.player1Turn)
			{
				this.drawCharacterPool(this.state.player1Characters,tileSize,context,spriteSheet,zoom,offsetX,offsetY);
			}
			else
			{
				this.drawCharacterPool(this.state.player2Characters,tileSize,context,spriteSheet,zoom,offsetX,offsetY);
			}
		}

	}

	
drawCharacterPool = (characters,tileSize,context,spriteSheet,zoom,offsetX,offsetY) =>{
	let startX = 3*tileSize;
	let startY = 3*tileSize;
	if (!this.state.player1Turn)
	{
		startY *= 2;
	}	

	context.fillStyle="white";
   	context.fillRect(startX-2,startY-2,(6*tileSize)+4,(3*tileSize)+4);

  	context.fillStyle="black";
   	context.fillRect(startX,startY,(6*tileSize),(3*tileSize));

   	context.fillStyle="white";
   	context.font = "18px Courier New";
	context.fillText("Character Pool", startX+20, startY+20);
	
	context.fillStyle="white";
   	context.fillRect(startX,startY+30,(6*tileSize),2);

	characters.forEach((char,index) => {
		var x = char.x;
		var y = char.y;

		var canvasX = Math.floor((index * tileSize))+startX;
		var canvasY = startY+32;
		var canvasTileSize = tileSize;
		if (index >= 6)
		{
			canvasX = ((index-6)*tileSize)+startX;
			canvasY += 32;
		}
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
	if (!this.state.player1Turn)
	{
		offsetY = zoom*tileSize*(Math.floor(this.props.rows/2));
	}
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
		else{
		let x = Math.floor(event.clientX/(this.props.tileSize*this.state.zoom));
		let y =  Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		if(x<this.props.cols&&y<this.props.rows&&x>=0&&y>=0)
		{	
			let tiles = this.state.tiles.slice();
			let highlights = this.state.highlights.slice();
		
			if (!this.state.active && tiles[y][x].occupied)
			{
				let character = tiles[y][x].character;
		
				let range = 0;
				let color = "";
				highlights = [];
				
				if(character.didMove === true && !character.didAttack)
				{
					range = character.rangeMax;
					color = "red";
				}
			
				else if(!character.didMove)
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
		
			this.setState({tiles: tiles, active: character, highlights:highlights, click:click});
			}
		
			else if(tiles[y][x].occupied&&this.state.active){
			this.resolveAttack({attacker: this.state.active, defender:tiles[y][x].character});
			}
	
			else{
				return this.handleMove(event);
			}
			this.setState({click:click});
		}
	}
}
	placeCharacter = event =>{
		let click = true;
		let x = Math.floor(event.clientX/(this.props.tileSize*this.state.zoom));
		let y = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let characters = this.state.player1Characters.slice();
		let army = this.state.player1Army.slice();
		let player1 = false;
		if(!this.state.player1Turn){
			characters = this.state.player2Characters.slice();
			army = this.state.player2Army.slice();
		}
		let charactersPlaced = this.state.charactersPlaced;
		let tiles = this.state.tiles.slice();
		let active = false;
		if (characters.length >= 1 && this.state.player1Turn)
		{
			if (x < this.props.cols && y < 2 && !tiles[y][x].occupied && this.state.active)
			{
				let char = this.state.active;
				char.position = [x,y];
				char.didMove = false;
				char.didAttack = false;
				tiles[y][x].character = char;
				tiles[y][x].occupied = true;
				army.push(char);
				characters = characters.filter(character => character.id !== char.id);
				console.log(characters);
				
			}
			else if(x>2&&y>3)
			{
				if (y == 5)
				{
					active = characters[x+3];
				}
				else
				{
					active = characters[x-3];
				}
			}
		}
		else if (characters.length >=1 && !this.state.player1Turn)
		{
			if (x < this.props.cols && y > 9 && !tiles[y][x].occupied && this.state.active)
			{
				let char = this.state.active;
				char.position = [x,y];
				char.didMove = false;
				char.didAttack = false;
				tiles[y][x].character = char;
				tiles[y][x].occupied = true;
				army.push(char);
				characters = characters.filter(character => character.id !== char.id);
				console.log(characters);
			}
			else if(x>2&&y>6)
			{
				if (y == 8)
				{
					active = characters[x+3];
				}
				else
				{
					active = characters[x-3];
				}
			}
		}
		if (characters.length < 1 && this.state.player1Turn)
		{
			let ctx = this.state.context;
			player1 = false;
			ctx.clearRect(0,0,this.props.width,this.props.height);
		}
		
		if(this.state.player1Turn)
		{	
			this.setState({player1Army:army,player1Characters:characters,charactersPlaced:charactersPlaced, tiles: tiles, click: click, active:active, player1Turn: player1});
		}
	}

	handleMouseMove = event =>{
		let x = Math.floor(event.clientX/(this.props.tileSize*this.state.zoom));
		let y = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let highlights = this.state.highlights.slice().filter(highlight => highlight.type != "orange");
		let click = false;
		if(x<this.props.cols&&y<this.props.rows&&x>=0&&y>=0)
		{
			highlights.push({type:"orange", x:x, y:y});
		}
		this.setState({highlights: highlights, click:click});
	}
	handleMove = (event) => {
		let newX = Math.floor(event.clientX/(this.props.tileSize*this.state.zoom));
		let newY = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let tiles = this.state.tiles.slice();
		let characters = this.state.characters.slice();
		let character = this.state.active;
		let highlights = [];
		if (character && !tiles[newY][newX].occupied && !character.didMove)
		{
			let oldTile = character.position
			let oldX = oldTile[0];
			let oldY = oldTile[1];
			let distance = Math.abs(oldX-newX) + Math.abs(oldY-newY);

			if (distance <= character.skill)
			{
				tiles[oldY][oldX].character = false;
				tiles[oldY][oldX].occupied = false;
				character.position = [newX,newY];
				character.didMove = true;
				characters[character.id] = character;
				tiles[newY][newX].character = character;
				tiles[newY][newX].occupied = true;
			}

		}	

		this.setState({tiles: tiles, active: false, characters: characters, highlights: highlights});
	}

	resolveAttack = props => {
		
		let playerArmy = this.state.playerArmy.slice();
		let tiles = this.state.tiles.slice();
		let highlights = [];
		let hits = 0;
		let toWound = 4+(props.attacker.skill-props.defender.skill);
		let active = false;
		let distance = Math.abs(props.attacker.position[0]-props.defender.position[0])+ Math.abs(props.attacker.position[1]-props.defender.position[1]);
		if (!props.attacker.didAttack && distance <= props.attacker.rangeMax){
			for (let i = 0; i<props.attacker.strength; i++)
			{
				let roll = Math.floor(Math.random()*6) + 1;
				if (roll <= toWound)
				{
					hits++;
				}
			}

			props.defender.health -= hits;

			if(props.defender.health < 1)
			{
				tiles[props.defender.position[1]][props.defender.position[0]].character = false;
				tiles[props.defender.position[1]][props.defender.position[0]].occupied = false;
				playerArmy = playerArmy.filter(char => props.defender.id != char.id);
			}
			props.attacker.didAttack = true;
		}
		this.setState({playerArmy: playerArmy, tiles: tiles, highlights:highlights, active: active});
	}
 	

	render(){
		if (this.state.context)
		{
			this.drawTiles(this.state.tiles,this.props.tileSize,this.state.context,this.state.spriteSheet,this.state.zoom,this.state.offsetX,this.state.offsetY);
			this.drawHighlights(this.state.highlights,this.props.tileSize,this.state.context,this.state.offsetX, this.state.offsetY);
			this.drawCharacters(this.state.player1Army,this.props.tileSize,this.state.context,this.state.spriteSheet,this.state.zoom,this.state.offsetX,this.state.offsetY);
			this.drawCharacters(this.state.player2Army,this.props.tileSize,this.state.context,this.state.spriteSheet,this.state.zoom,this.state.offsetX,this.state.offsetY);
		}
		return(
			
			<canvas ref={this.canvasRef} onClick={this.handleClick} onMouseMove={this.handleMouseMove} />
		);
	}
	
};

export default Board;