import React from 'react';
import Login from './login/login';
import Track from './track/track';
import Dashboard from './dashboard/dashboard';
import Pageerror from './error/pagenotfound';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.REACT_APP_BASENAME || ""}> 
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/track" component={Track} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={Pageerror} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
