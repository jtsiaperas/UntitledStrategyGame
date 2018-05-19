import React from "react";
import "./armyChoice.css";

const ArmyChoice = props => {
		let player = "player1";
		let title = "Player 1";
		if (props.player1Done)
		{
			player = "player2";
			title = "Player 2";
		}
		return(
			<div id = "armyChoice" className="container">
				
					<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-header text-center">
							<h1>{`Choose ${title} Troops: ${props.points} points remaining`}</h1>
							</div>
						</div>
					</div>
					</div>
					<div className="row">
					{
						props.characters.map((character,index) =>{
						return(
						<div className="col-4" key={index}>
							<div className="card characterCard"  onClick={()=>props.chooseCharacter(index,player)}>
							<div className="card-header">
								{character.name}
							</div>
							<div className="card-body">
								<p>
									{character.description}
								</p>
								<table className="table-dark">
								<tbody>
								<tr>
								<th>Points</th><th>Attack</th><th>Move</th><th>Health</th>
								</tr>
								<tr>
								<td>{character.pointValue}</td>
								<td>{character.strength}</td>
								<td>{character.skill}</td>
								<td>{character.health}</td>
								</tr>
								</tbody>
								</table>
							</div>
							</div>
						</div>	
						);
					})
					}
					</div>
			
			</div>
		);
	
};

export default ArmyChoice;