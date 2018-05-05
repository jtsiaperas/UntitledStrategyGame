import {React,Component} from "react";
import { login, logout, isLoggedIn } from '../utils/authenticationTool';
import "./board.css";

const Menu =() => {

		return(
			<div id = "menu">
				{(isLoggedIn()) ?
					(
						<div className = "row">
						<button className = "btn" onClick="window.location.href='/newGame'"> New Game </button>
						<button className = "btn" onClick="window.location.href='/loadGame'"> Load Game </button>
						<button className = "btn" onClick={() => logout()}> Log Out </button>
						</div>
					):
				 	(
						
						<button className = "btn" onClick={() => login()}> Log In / Sign Up </button>
					) 
				}	
			</div>
		);
	
};

export default Menu;