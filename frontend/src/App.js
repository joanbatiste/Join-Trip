
import React from 'react';
import './css/main.css';
import {BrowserRouter, Switch , Route} from 'react-router-dom';
import Home from './views/Home/Home';
import Profile from './views/Profile/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/profile" exact component={Profile}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
