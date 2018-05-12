import {React,Component} from "react";
import Button from "../button";
import "./board.css";

const Button = props => {

		return(
			<button id={props.id} className="btn" onClick={props.onClick}>{props.name}</button>
		);

};

export default Button;