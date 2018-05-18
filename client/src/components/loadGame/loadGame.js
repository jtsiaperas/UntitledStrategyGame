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
				console.log(saves);
				this.setState({saves: saves.data})
			})
			.catch(err => console.log(err));
	}
	
	loadGame(index) {
		return ( <Board {...this.state.saves[index]} />);
	}
 
	render(){
		
		return(
			<div id="loadGame">
			
			{this.state.saves.length>0 ? (this.state.saves.map((save,index) => <button className="btn save" id={index} key={index} onClick = {()=>this.loadGame({index})}>{save.time}</button>)):(<h1>No Saves Found</h1>)}
			</div>
		);
	}
}

export default LoadGame;