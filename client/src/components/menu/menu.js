import React from "react";
import API from "../../utils/API";
import "./menu.css";

const Menu = props => {
		

		return(
			<div id = "menu">
				{props.loggedIn() ?
					(
						<div className = "container">
							<div className ="row">
								<div className = "col-4">
									<button className = "btn" onClick={() => props.goTo("newGame")}> New Game </button>
								</div>
								<div className ="col-4">
									<button className = "btn" onClick={() => props.goTo('loadGame')}> Load Game </button>
								</div>
								<div className = "col-4">
									<button className = "btn" onClick={() => props.logout()}> Log Out </button>
								</div>
							</div>
						</div>
					):
				 	(
						<div className ="container">
							<div className="row">
								<div className="col-4">
								</div>
								<div className="col-4">
									<button className = "btn" onClick={() => props.login()}> Log In / Sign Up </button>
								</div>
								<div className="col-4">
								</div>
							</div>
						</div>
					) 
				}	
			
			<div className = "container">
				<div className = "jumbotron text-center">
					<h1>Untitled Strategy Game</h1>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-header text-center">
								<h2>Summary</h2>
							</div>
							<div className="card-body">
							A strategy game implemented using React and HTML5, with hot-seat multiplayer.
							Each player chooses their faction and builds an army. The game uses a point-based
							weighting system to maintain balance, emphasizing strategy over simply choosing the
							strongest unit.
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-header text-center">
								<h2>How to play</h2>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-header text-center">
								<h3>Building your army</h3>
							</div>
							<div className="card-body">
								Choose as many units as possible, up to the total number of points available. Consider the
								arena's layout. Narrow areas that limit unit movement make ranged units more effective.
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-header text-center">
								<h3>Gameplay</h3>
							</div>
							
							<div className="card-body">	
							Each unit can move and attack once per turn. Once all units have moved, your turn is over.
							To move a unit, click it and then click a tile within its movement range. To attack, click your unit,
							then the target. The game ends when your opponent's units are all defeated.
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<div className="card">
							<div className="card-header text-center">
								<h3>Stats</h3>
							</div>
							
							<div className="card-body">	
							Attack: The number of "attack dice" rolled, max damage<br />
							Move: The number of tiles a unit can Move, also affects its chance to avoid damage<br />
							Health: The number of hits a unit can take
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	
};

export default Menu;