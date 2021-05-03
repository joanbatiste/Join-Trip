
import React from 'react';
import './css/main.css';
import {BrowserRouter, Switch , Route} from 'react-router-dom';
import Home from './views/Home/Home';
import Profile from './views/Profile/Profile';
import DataUser from './components/DataUser/DataUser';
import TripView from './views/TripView/TripView';
import Trips from './views/Trips/Trips';
import PostTrip from './views/PostTrip/PostTrip';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/profile/datauser" exact component={DataUser}/>
          <Route path="/trips/view" exact component={TripView}/>
          <Route path="/trips" exact component={Trips}/>
          <Route path="/trips/post" exact component={PostTrip}/>
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
