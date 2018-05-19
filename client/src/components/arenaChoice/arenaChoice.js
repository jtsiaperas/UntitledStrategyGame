import React from "react";
import "./arenaChoice.css";

const ArenaChoice = props => {
		console.log(props);
		return(
			<div id = "arenaChoice" className="container">
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card-header text-center">
							<h1> Choose Arena </h1>
						</div>
					</div>
				</div>
			</div>
			
				{ 	props.arenas ? (
					props.arenas.map((arena,index) => {
						return(
						<div className="card arenaCard" key={index} onClick={()=>props.chooseArena(arena)}>
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