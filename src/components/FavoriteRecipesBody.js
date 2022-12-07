import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteRecipesBody.css';

function FavoriteRecipesBody() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [flag, setFlags] = useState([]);
  const [buttonFilter, setButtonFilter] = useState('all');
  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setFlags(favoriteRecipes.map((recipe) => ({
      [recipe.id]: false,
    })));
  }, []);
  return (
    <>
      <form>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setButtonFilter('all') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => setButtonFilter('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setButtonFilter('drink') }
        >
          Drinks
        </button>
      </form>
      {(favoriteRecipes !== null) && favoriteRecipes.filter((recipe) => {
        if (buttonFilter === 'all') {
          return true;
        }
        return recipe.type === buttonFilter;
      }).map((recipe, index) => (
        <div
          key={ index }
        >
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
          >
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.type === 'meal' && `${recipe.nationality} - ${recipe.category}` }
            { recipe.type === 'drink' && `${recipe.alcoholicOrNot}` }
          </p>
          <Link
            to={ `${recipe.type}s/${recipe.id}` }
            data-testid={ `${index}-horizontal-name` }
          >
            { recipe.name }
          </Link>
          <button
            type="button"
            data-testid={ `${index}-copy-button` }
            onClick={ () => {
              copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
              setFlags((current) => ({
                ...current,
                [recipe.id]: true,
              }));
            } }
          >
            { flag[recipe.id] && ('Link copied!')}
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="icone de compartilhar"
            />
          </button>
          <button
            type="button"
          >
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="icone de compartilhar"
            />
          </button>
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipesBody;
