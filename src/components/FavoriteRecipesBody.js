import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipesBody() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [flag, setFlags] = useState([]);
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
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </form>
      {favoriteRecipes.map((recipe, index) => (
        <div
          key={ index }
        >
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            { recipe.type === 'meal' && `${recipe.nationality} - ${recipe.category}` }
            { recipe.type === 'drink' && `${recipe.alcoholicOrNot}` }
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { recipe.name }
          </p>
          <button
            type="button"
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
