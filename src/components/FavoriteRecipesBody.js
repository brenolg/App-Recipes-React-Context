import React, { useState, useEffect } from 'react';

function FavoriteRecipesBody() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);
  return (
    <>
      { console.log(favoriteRecipes) }
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
            { recipe.category }
          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            { recipe.name }
          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            compartilhar
          </button>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            favoritar
          </button>
        </div>
      ))}
    </>
  );
}

export default FavoriteRecipesBody;
