import React from "react";
import "./arenaChoice.css";

const ArenaChoice = props => {
		console.log(props);
		return(
			<div id = "arenaChoice">
				{ 	props.arenas ? (
					props.arenas.map((arena,index) => {
						return(
						<div className="card" key={index} onClick={()=>props.chooseArena(arena)}>
							<div className="card-header">
								{arena.name}
							</div>
							<div className="card-body">
								<p>
									{arena.description}
								</p>
							</div>
						</div>
						);
					}) ) : (<div></div>)
				}	
			</div>
		);
	
};

export default ArenaChoice;