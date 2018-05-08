import React, {Component} from "react";
import API from "../../utils/api";
import "./loadGame.css";

class LoadGame extends Component {
	
	constructor(props) {
		super(props);
		this.state ={
			user: localStorage.getItem('id_token'),
			saves: []
		}
	}
	
	componentDidMount() {
		API.getSaves(this.state.user)
		.then(saves => this.setState({saves: saves}))
		.catch(err => console.log(err));
	}
	
 
	render(){
		
		return(
			<div id="loadGame">
			Load Game stuff goes here
			</div>
		);
	}
}

export default LoadGame;