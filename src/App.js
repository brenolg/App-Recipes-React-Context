import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import SearchBar from './components/SearchBar';
import Recipes from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route exact path="/meals" component={ SearchBar } />
      <Route exact path="/drinks" component={ SearchBar } />
      { /* Route line 12 add for dev component SearchBar */ }
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Recipes } />
      <div className="meals">
        <span className="logo">TRYBE</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
    </Switch>
  );
}

export default App;
