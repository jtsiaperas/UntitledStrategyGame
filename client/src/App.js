import React from "react";
import {Router,Route} from "react-router-dom";
import Menu from "./components/menu";
import "./App.css";

const App = () => (
	<div className="container">
	<Router>
		<Route exact path = "/" component={Menu} />
		<Route exact path = "/newGame" component={Menu} />
		<Route exact path = "/loadGame" component={Menu} />
	</Router>
	</div>
);

export default App;
