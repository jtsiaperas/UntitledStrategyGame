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
			.then(saves => {
				console.log(saves.data.saves);
				this.setState({saves: saves.data.saves})
			})
			.catch(err => console.log(err));
	}
	
	loadGame(index) {
		return ( <Board {...this.state.saves[index]} />);
	}
 
	render(){
		
		return(
			<div id="loadGame">
			<div className="container">
			<button className = "btn" onClick={() => window.location.replace('/')}> Menu </button>
			<h1 className="text-center">Saved Games</h1>
			{this.state.saves.length>0 ? (this.state.saves.map((save,index) => <button className="btn save" id={index} key={index} onClick = {()=>this.loadGame({index})}>{save.time}</button>)):(<h1>No Saves Found</h1>)}
			</div>
			</div>
		);
	}
}

export default LoadGame;