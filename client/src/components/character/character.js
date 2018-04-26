import React, {Component} from "react";
import "./character.css";

class Character extends Component {
	
	constructor(props) {
  		super(props);
  		this.state = {
    		class: (props.character.class)?(props.character.class):(null),
    		type: (props.type)?(props.type):(null),
    		strength: (props.character.strength)?(props.character.strength):(null),
    		skill: (props.character.skill)?(props.character.skill):(null),
    		health: (props.character.health)?(props.character.health):(null),
    		id: (props.id)?(props.id):(null),
    		handleCharacterClick: props.handleCharacterClick,
    		resolveAttack: props.resolveAttack,
        location: props.location
  		};

  }


	render(){
		return(<div className="character" type={this.state.type} id={this.state.id} onClick={() => this.state.handleCharacterClick(this.state)} location={this.state.location}> </div>);
	}	
};

export default Character;