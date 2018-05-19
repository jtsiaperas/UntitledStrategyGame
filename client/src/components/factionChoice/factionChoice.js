import React from "react";
import "./factionChoice.css";

const FactionChoice = props => {
		let player = "player1";
		let title = "Player 1";
		if(props.player1Done)
		{
			player = "player2";
			title = "Player 2";
		}
		return(
			<div id = "factionChoice" className="container">
			<div className="row">
			<div className="col-12">
				<div className="card">
					<div className="card-header text-center">
					<h1>{`Choose ${title} faction`}</h1>
					</div>
				</div>
			</div>
			</div>
			
			<div className="row">
				{	props.factions ? (
					props.factions.map((faction,index) => {
						return(
						<div className="col" key={index}>
						<div className="card factionCard" onClick={()=>props.chooseFaction(faction.name,player)}>
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