import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import {Landing} from './Components/Landing/Landing.jsx';
import {Home} from './Components/Home/Home.jsx';
import {Details} from './Components/Details/Details.jsx'
import {Form} from './Components/Form/Form.jsx'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path = "/pokemons/:id" component={Details}/>        
        <Route exact path = "/pokemon" component={Form}/>
      </Switch>
    </div>
  );
}

export default App;
