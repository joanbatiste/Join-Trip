
import React from 'react';
import './css/main.css';
import {BrowserRouter, Switch , Route} from 'react-router-dom';
import Home from './views/Home/Home';
import Profile from './views/Profile/Profile';
import DataUser from './components/DataUser/DataUser';
import TripView from './views/TripView/TripView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/profile/datauser" exact component={DataUser}/>
          <Route path="/trips/view" exact component={TripView}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
