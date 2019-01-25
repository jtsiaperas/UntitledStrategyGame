import React,{Component} from "react";
import Menu from "./components/menu"; 
import "./App.css";

class App extends Component {
	constructor(props) {
	super(props);

	}

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }


  render() {
   		
		return(
			<Menu loggedIn = {this.props.auth.isAuthenticated} goTo = {route => this.props.history.replace(`/${route}`)} login = {this.props.auth.login} logout = {this.props.auth.logout} />
			
		);
	}
}

export default App;