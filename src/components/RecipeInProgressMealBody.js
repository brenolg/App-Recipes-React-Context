import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Loading from './Loading';

function RecipeInProgressMealBody() {
  const { meals, loading } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  if (loading) return (<Loading />);
  return (
    <div>
      { Object.values(meals.meals).filter((meal) => pathname.includes(meal.idMeal))
        .map((meal, index) => (
          <div
            key={ index }
          >
            <img
              data-testid="recipe-photo"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <h3
              data-testid="recipe-title"
            >
              { meal.strMeal }
            </h3>
            <button
              type="button"
              data-testid="share-btn"
            >
              compartilhar
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
            >
              favoritar
            </button>
            <p
              data-testid="recipe-category"
            >
              { meal.strCategory }
            </p>
            <p
              data-testid="instructions"
            >
              instructions
            </p>
            { Object.values(Object.fromEntries(Object.entries(meal)
              .filter(([key]) => key.includes('strIngredient'))))
              .filter((ingredient) => ingredient !== null && ingredient !== '')
              .map((ingredient, ingredientIndex) => (
                <div
                  key={ ingredientIndex }
                >
                  <label
                    htmlFor={ ingredient }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      id={ ingredient }
                      type="checkbox"
                    />
                    {ingredient}
                  </label>
                </div>
              ))}
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              finish recipe
            </button>
          </div>
        ))}
    </div>
  );
}

export default RecipeInProgressMealBody;
