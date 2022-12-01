import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/meals" component={ Recipes } />
      <Route path="/drinks" component={ Recipes } />
      <Route path="/profile" component={ Profile } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route path="/done-recipes" component={ DoneRecipes } />
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
