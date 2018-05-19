import React,{Component} from "react";
import API from "../../utils/API";
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
			zoom:1,
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
			player1Turn: true,
			attackResults:""
			
		}
		this.canvasRef = React.createRef();
	}

	componentDidMount() {
		var canvas = this.canvasRef.current;
		
		let boardWidth = this.props.tileSize * this.props.cols;
		let boardHeight = this.props.tileSize * this.props.rows;

		canvas.width= this.props.width;
		canvas.height= this.props.height;
		let user = localStorage.getItem('profile');
			API.saveUser(user)
			.then(result => console.log(result))
			.catch(err => console.log(err));
		
		var offsetY = 0;
		var offsetX = 0;

  		var ctx = canvas.getContext('2d');
		
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		let zoom = canvas.height/(boardHeight);
		canvas.width = boardWidth*zoom;

		ctx.scale(zoom,zoom);
		var spriteSheet = new Image();
		
		spriteSheet.src = require(`../../tileSheet.png`);
		spriteSheet.onload = () => {
			this.drawTiles(this.state.tiles,this.props.tileSize,ctx,spriteSheet,this.state.zoom,offsetX,offsetY);
		}

		this.setState({canvas: canvas, spriteSheet: spriteSheet, context: ctx, offsetX: offsetX, offsetY: offsetY, zoom: zoom});
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
   			context.fillRect(canvasX,canvasY,32,10);
   			
   			context.fillStyle="white"; 
   			let number = 1;
   			context.font = "bold 30px sans-serif";
   			if(char.owner !== "player1")
   			{
   				number = 2;
   			}
   			context.fillText(number, canvasX+8, canvasY+32);
   			context.globalAlpha = 1;
   			 			
   			context.font = "10px sans-serif";
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
	
	let startX = (this.props.cols/4)*tileSize;
	let startY = 3*tileSize;
	
	let num = 1;
	

	if(!this.state.player1Turn)
	{
		startY = 6*tileSize;
		num = 2;
		
	}

	context.fillStyle="white";
   	context.fillRect(startX-2,startY-2,((this.props.cols/2)*tileSize)+4,(3*tileSize)+4);

  	context.fillStyle="black";
   	context.fillRect(startX,startY,((this.props.cols/2)*tileSize),(3*tileSize));

   	context.fillStyle="white";
   	context.font = "17px sans-serif";
   	

	context.fillText(`Deploy Player ${num} Troops`, startX+8, startY+20);
	
	context.fillStyle="white";
   	context.fillRect(startX,startY+30,(6*tileSize),2);
   	
   	context.globalAlpha = 0.2;
   	if(this.state.player1Turn)
   	{
   		for(let i=0; i<2; i++)
   		{
   			for(let j=0; j<this.props.cols; j++)
   			{
   				var x = j*tileSize;
				var y = i*tileSize;
				context.fillStyle="yellow";
    			context.fillRect(x,y,tileSize,tileSize);
   			}
   		}
   	}
   	else
   	{
   		for(let i=this.props.rows-2; i<this.props.rows; i++)
   		{
   			for(let j=0; j<this.props.cols; j++)
   			{
   				var x = j*tileSize;
				var y = i*tileSize;
				context.fillStyle="yellow";
    			context.fillRect(x,y,tileSize,tileSize);
   			}
   		}
   	}
   	context.globalAlpha = 1.0;
	characters.forEach((char,index) => {
		let x = char.x;
		let y = char.y;

		let canvasX = Math.floor((index * tileSize))+startX;
		let canvasY = startY+32;
		let canvasTileSize = tileSize;

		if (index >= this.props.cols/2)
		{
			canvasX = ((index-(this.props.cols/2))*tileSize)+startX;
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
	
	
	tiles.map((row,indexR) => {
			
		row.map((col,indexC) =>{
			var x = col.x;
			var y = col.y;
				
			var canvasX = (indexC * tileSize);
			var canvasY = (indexR * tileSize);
			
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

drawHighlights = (highlights,tileSize,context,offsetX,offsetY) =>{
		
		highlights.map(highlight => {
			
				var x = highlight.x*tileSize;
				var y = highlight.y*tileSize;
				
				context.globalAlpha = 0.3;
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

		else
		{
			let x = Math.floor((event.clientX-200)/(this.props.tileSize*this.state.zoom));
			let y =  Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
			
			if(x<this.props.cols&&y<this.props.rows&&x>=0&&y>=0)
			{	
				let tiles = this.state.tiles.slice();
				let highlights = this.state.highlights.slice();
		
				if (!this.state.active && tiles[y][x].occupied)
				{
					let character = tiles[y][x].character;
					if(this.state.player1Turn && character.owner === "player2")
					{
						return alert("It is player 1's turn!");
					}
					else if(!this.state.player1Turn && character.owner === "player1")
					{
						return alert("It is player 2's turn!");
					}

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
				
							
							if (dy+dx <= range)
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
					}
				this.setState({tiles: tiles, active: character, highlights:highlights, click:click});
				}
		
				else if(tiles[y][x].occupied&&this.state.active)
				{
					let attackTypes = this.state.active.attackType.split(",");
					let aoe = false;
					let arc = false;
					attackTypes.forEach(word=> {
						if(word==="aoe")
						{
							aoe=true;
						}
						if(word==="arc")
						{
							arc=true;
						}
					});

					if(arc)
					{
						this.resolveAttack({attacker: this.state.active, defender:tiles[y][x+1].character});
						this.resolveAttack({attacker: this.state.active, defender:tiles[y][x-1].character});
						this.resolveAttack({attacker: this.state.active, defender:tiles[y][x].character});
					}

					this.resolveAttack({attacker: this.state.active, defender:tiles[y][x].character});
				}
	
				else
				{
					return this.handleMove(event);
				}
			}
			this.setState({click:click});
		}
}


placeCharacter = event =>{
		let click = true;
		let x = Math.floor((event.clientX-200)/(this.props.tileSize*this.state.zoom));
		let y = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let highlights = [];
		let characters = this.state.player1Characters.slice();
		let army = this.state.player1Army.slice();
		
		if(!this.state.player1Turn){
			characters = this.state.player2Characters.slice();
			army = this.state.player2Army.slice();
		}

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

			else if(x>=(this.props.cols/4)&&y>3)
			{
				if (y == 5)
				{
					active = characters[x+3];

				}
				else
				{
					active = characters[x-3];
				}
				highlights.push({type:"blue",x:x,y:y});
			}

			this.setState({player1Army:army,player1Characters:characters, tiles: tiles, click: click, highlights: highlights, active:active});
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
			else if(x>=(this.props.cols/4)&&y>6)
			{
				if (y == 8)
				{
					active = characters[x+3];
				}
				else
				{
					active = characters[x-3];
				}
				highlights.push({type:"blue",x:x,y:y});
			}
			this.setState({player2Army:army,player2Characters:characters, tiles: tiles, click:click, active:active, highlights: highlights});
		}
		

		if (characters.length < 1 && this.state.player1Turn)
		{
			this.setState({player1Turn:false});
		}
		else if (characters.length < 1 && !this.state.player1Turn)
		{
			this.setState({charactersPlaced:true, player1Turn:true});
		}
		
}

	handleMouseMove = event =>{
		let x = Math.floor((event.clientX-200)/(this.props.tileSize*this.state.zoom));
		let y = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let highlights = this.state.highlights.slice().filter(highlight => highlight.type != "orange");
		let click = false;
		if(x<this.props.cols&&y<this.props.rows&&x>=0&&y>=0)
		{
			highlights.push({type:"orange", x:x, y:y});
		}
		this.setState({highlights: highlights, click:click});
	}
	endTurn = () =>{
		let player1Army = this.state.player1Army.slice();
		
		let player2Army = this.state.player2Army.slice();
		

		player1Army.forEach(char => {
			char.didMove = false;
			char.didAttack = false;
		});

		player2Army.forEach(char => {
			char.didMove = false;
			char.didAttack = false;
		});

		this.setState({player1Turn:!this.state.player1Turn,player2Army:player2Army,player1Army:player1Army});
	}
	handleMove = event => {
		let newX = Math.floor((event.clientX-200)/(this.props.tileSize*this.state.zoom));
		let newY = Math.floor(event.clientY/(this.props.tileSize*this.state.zoom));
		let tiles = this.state.tiles.slice();
		let characters = this.state.player1Army.slice();
		
		if(!this.state.player1Turn)
		{
			characters = this.state.player2Army.slice();
		}

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
			else
			{
				alert("Sorry, that is out of range!");
			}

		}	

		let allMoved = true;
		let allAttacked = true;
		characters.forEach(char=>{
			if(!char.didMove)
			{
				allMoved=false;
			}
			if(!char.didAttack)
			{
				allAttacked = false;
			}
		});

		if(allMoved)
		{
			alert("All of your troops have moved! Click the end turn button.");
		}
		else if(allAttacked)
		{
			alert("All of your troops have attacked! Click the end turn button.")
		}
		this.setState({tiles: tiles, active: false, characters: characters, highlights: highlights});
	}

	resolveAttack = props => {
		if(props.defender)
		{	
		let player1Army = this.state.player1Army.slice();
		let player2Army = this.state.player2Army.slice();
		let tiles = this.state.tiles.slice();
		let highlights = [];
		let hits = 0;
		let toWound = 4+(props.attacker.skill-props.defender.skill);
		if (toWound > 5)
		{
			toWound = 5;
		}
		else if(toWound <1)
		{
			toWound = 1;
		}
		let active = false;
		let distance = Math.abs(props.attacker.position[0]-props.defender.position[0])+ Math.abs(props.attacker.position[1]-props.defender.position[1]);
		let flavorText = "";
		if (!props.attacker.didAttack && distance <= props.attacker.rangeMax && props.attacker.owner != props.defender.owner)
		{
			for (let i = 0; i<props.attacker.strength; i++)
			{
				let roll = Math.floor(Math.random()*6) + 1;
				if (roll <= toWound)
				{
					hits++;
				}
			}

			props.defender.health -= hits;
			if(props.attacker.owner === "player1")
			{
				flavorText = `Player 1's ${props.attacker.name} attacked Player 2's ${props.defender.name}, dealing ${hits} damage!`;
			}
			else
			{
				flavorText = `Player 2's ${props.attacker.name} attacked Player 1's ${props.defender.name}, dealing ${hits} damage!`;
			}
			if(props.defender.health < 1)
			{
				tiles[props.defender.position[1]][props.defender.position[0]].character = false;
				tiles[props.defender.position[1]][props.defender.position[0]].occupied = false;
				if (props.defender.owner === "player1")
				{
					player1Army = player1Army.filter(char => props.defender.id != char.id);
					if(player1Army.length < 1)
					{
						alert("Player 2 wins!");
						window.location.replace("/");
					}
				}
				else
				{
					player2Army = player2Army.filter(char => props.defender.id != char.id);
					if(player2Army.length < 1)
					{
						alert("Player 1 wins!");
						window.location.replace("/");
					}
				}
			}
			props.attacker.didAttack = true;
		}
		else if (props.defender.owner === props.attacker.owner)
		{
			alert("You should not attack your own troops!");
		}

		this.setState({player1Army: player1Army, player2Army: player2Army,tiles: tiles, highlights:highlights, active: active, attackResults:flavorText});
	}
	}
saveGame = state => {
	API.saveGame(state)
	.then(()=>alert("Game saved!"))
	.catch(err=> console.log(err));
}

	render(){
		if (this.state.context)
		{
			this.drawTiles(this.state.tiles,this.props.tileSize,this.state.context,this.state.spriteSheet,this.state.offsetX,this.state.offsetY);
			this.drawCharacters(this.state.player1Army,this.props.tileSize,this.state.context,this.state.spriteSheet,this.state.offsetX,this.state.offsetY);
			this.drawCharacters(this.state.player2Army,this.props.tileSize,this.state.context,this.state.spriteSheet,this.state.offsetX,this.state.offsetY);
			this.drawHighlights(this.state.highlights,this.props.tileSize,this.state.context,this.state.offsetX, this.state.offsetY);
		}
		return(
			<div className="boardDiv">
			<div className="tips">
				<table className="table">
					<tbody>
					<tr>
					<th>Tips:</th>
					</tr>
					<tr>
					<td>
						Deploy troops by first clicking them, then clicking one of the highlighted tiles.
					</td>
					</tr>
					<tr>
					<td>
						Once troops are deployed, select units by clicking them.
					</td>
					</tr>
					<tr>
					<td>
						Click on one of the tiles highlighted in green to move the unit.
					</td>
					</tr>
					<tr>
					<td>
						Attack enemies by moving within range and clicking the enemy unit highlighted in red.
					</td>
					</tr>
					<tr>
					<td>
						{this.state.player1Turn ?("It is currently Player 1's turn."):("It is currently Player 2's turn.")}
					</td>
					</tr>
					<tr>
					<td>
					{this.state.attackResults}
					</td>
					</tr>
					</tbody>
				</table>

			</div>
			<canvas ref={this.canvasRef} onClick={this.handleClick} onMouseMove={this.handleMouseMove} />
			<button className="vertical text-center" onClick={this.endTurn}><span><strong>End Turn</strong></span></button>
			<button className="vertical text-center" onClick={() => this.saveGame(this.state)}><span><strong>Save Game</strong></span></button>
			<button className="vertical text-center" onClick={() => window.location.replace("/")}><span><strong>Exit Game</strong></span></button>
			</div>
		);
	}
	
};

export default Board;