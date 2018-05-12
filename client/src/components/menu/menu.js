import React from "react";
import "./menu.css";

const Menu = props => {
	
		console.log(props);
		return(
			<div id = "menu">
				{props.loggedIn() ?
					(
						<div className = "row">
						<button className = "btn" onClick={() => props.goTo("newGame")}> New Game </button>
						<button className = "btn" onClick={() => props.goTo('loadGame')}> Load Game </button>
						<button className = "btn" onClick={() => props.logout()}> Log Out </button>
						</div>
					):
				 	(
						
						<button className = "btn" onClick={() => props.login()}> Log In / Sign Up </button>
					) 
				}	
			</div>
		);
	
};

export default Menu;