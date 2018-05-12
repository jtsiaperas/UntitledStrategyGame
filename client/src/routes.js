import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Callback from './Callback';
import Auth from './components/auth';
import NewGame from "./components/newGame";
import LoadGame from "./components/loadGame";
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  auth.getProfile();
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" render={(props) => <App {...props} auth={auth} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} auth={auth}/>}
        }/>
        <Route exact path="/newGame" render={(props) => {
          handleAuthentication(props);
          return <NewGame {...props} auth={auth}/>} }/>
        <Route exact path="/loadGame" render={(props) => {
          handleAuthentication(props);
          return <LoadGame {...props} auth={auth}/>} }/>
      </div>
    </Router>
  );
}