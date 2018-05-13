import React from "react";
import "./factionChoice.css";

const FactionChoice = props => {
	
		return(
			<div id = "factionChoice">
				{	props.factions ? (
					props.factions.map((faction,index) => {
						return(
						<div className="card" key={index} onClick={()=>props.chooseFaction(faction.name)}>
							<div className="card-header">
								{faction.name}
							</div>
							<div className="card-body">
								<p>
								{faction.description}
								</p>
							</div>
						</div>
						);
					})
					):(<div></div>)
				}	
			</div>
		);
	
};

export default FactionChoice;