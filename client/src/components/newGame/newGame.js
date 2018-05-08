import React, {Component} from "react";
import "./newGame.css";

class NewGame extends Component {
	
	constructor(props) {
		super(props);
		this.state ={
			user: localStorage.getItem('user')
		}
	}
	
	
 	render(){
		
		return(
			<div id="newGame">
			
			</div>
		);
	}
}

export default NewGame;