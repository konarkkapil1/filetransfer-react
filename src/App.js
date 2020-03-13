import React from 'react';
import Login from './login/login';
import Track from './track/track';
import Dashboard from './dashboard/dashboard';
import {BrowserRouter,Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/track" component={Track} />
        <Route path="/dashboard" component={Dashboard} />
      </BrowserRouter>
    </div>
  );
}

export default App;
