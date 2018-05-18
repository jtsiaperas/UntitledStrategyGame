import React from "react";
import "./factionChoice.css";

const FactionChoice = props => {
		let player = "player1";
		if(props.player1Done)
		{
			player = "player2";
		}
		return(
			<div id = "factionChoice" className="container">
			<h2>Choose {player} faction</h2>
			<br />
			<div className="row">
				{	props.factions ? (
					props.factions.map((faction,index) => {
						return(
						<div className="col" key={index}>
						<div className="card" onClick={()=>props.chooseFaction(faction.name,player)}>
							<div className="card-header">
								{faction.name}
							</div>
							<div className="card-body">
								<p>
								{faction.description}
								</p>
							</div>
						</div>
						</div>
						);
					})
					):(<div></div>)
				}	
			</div>
			</div>
		);
	
};

export default FactionChoice;