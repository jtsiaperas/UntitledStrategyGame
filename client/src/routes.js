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
  return (
    <Router history={history}>
      <div>
        <Route exact path="/" render={(props) => <App {...props} auth={auth} />} />
        <Route path="/callback" render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />}
        }/>
        <Route exact path="/newGame" render={(props) => <NewGame {...props} />} />
        <Route exact path="/loadGame" render={(props) => <LoadGame {...props} />} />
      </div>
    </Router>
  );
}