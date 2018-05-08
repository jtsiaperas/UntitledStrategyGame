import React, {Component} from "react";
import API from "../../utils/API";
import Board from "../board";
import "./loadGame.css";

class LoadGame extends Component {

	constructor(props) {
		super(props);
		
		this.state ={
			saves: false,
			profile: localStorage.getItem('profile')
		}
	}
	
	componentDidMount() {
			
			API.getSaves(this.state.profile)
			.then(saves => this.setState({saves: saves}))
			.catch(err => console.log(err));
	}
	
	loadGame(index) {
		return ( <Board {...this.state.saves[index]} />);
	}
 
	render(){
		
		return(
			<div id="loadGame">
			
			{this.state.saves ? (this.state.saves.map((save,index) => <button className="btn save" id={index} key={index} onClick = {()=>this.loadGame({index})}>{save.name}</button>)):(<h1>No Saves Found</h1>)}
			</div>
		);
	}
}

export default LoadGame;