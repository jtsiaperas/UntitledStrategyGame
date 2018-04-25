import React, {Component} from "react";
import "./character.css";

class Character extends Component {
	
	constructor(props) {
  		super(props);
  		this.state = {
    		class: props.class,
    		type: props.type,
    		strength: props.strength,
    		skill: props.skill,
    		health: props.health,
    		id: props.id,
    		handleCharacterClick: props.handleCharacterClick,
    		resolveAttack: props.resolveAttack
  		};
	}

	render(){
		return(<div className="character" type={this.state.type} id={this.state.id} onClick={this.state.handleCharacterClick}></div>);
	}	
};

export default Character;