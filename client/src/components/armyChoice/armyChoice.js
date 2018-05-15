import React from "react";
import "./armyChoice.css";

const ArmyChoice = props => {
	
		return(
			<div id = "armyChoice">
				
					<div className="row">
					<h2>Choose Characters</h2>
					<h3>{props.points} remaining</h3>
					{
						props.characters.map((character,index) =>{
						return(
						<div className="col" key={index}>
							<div className="card"  onClick={()=>props.chooseCharacter(index)}>
							<div className="card-header">
								{character.name}
							</div>
							<div className="card-body">
								<p>
									{character.description}
								</p>
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