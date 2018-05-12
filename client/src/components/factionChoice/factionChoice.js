import React from "react";
import "./factionChoice.css";

const FactionChoice = props => {
	
		return(
			<div id = "factionChoice">
				{
					props.factions.map(faction => {
						return(
						<div className="card" onClick={()=>props.choosefaction(faction)}>
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
				}	
			</div>
		);
	
};

export default FactionChoice;