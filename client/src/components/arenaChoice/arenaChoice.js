import React from "react";
import "./arenaChoice.css";

const ArenaChoice = props => {
	
		return(
			<div id = "arenaChoice">
				{ 	props.arenas
					// props.arenas.map(arena => {
					// 	return(
					// 	<div className="card" onClick={()=>props.chooseArena(arena)}>
					// 		<div className="card-header">
					// 			{arena.name}
					// 		</div>
					// 		<div className="card-body">
					// 			<p>
					// 				{arena.description}
					// 			</p>
					// 		</div>
					// 	</div>
					// 	);
					// })
				}	
			</div>
		);
	
};

export default ArenaChoice;