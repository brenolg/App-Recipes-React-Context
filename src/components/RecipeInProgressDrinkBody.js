import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Loading from './Loading';
import './RecipeInProgress.css';

function RecipeInProgressDrinkBody() {
  const { drinks, loading } = useContext(RecipesContext);
  const history = useHistory();
  const { pathname } = history.location;
  const [ingredientChecked, setIngredientChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const savedFlags = JSON.parse(localStorage.getItem('inProgressRecipe'));
    if (!loading) {
      const selectedDrink = drinks.drinks
        .filter((drink) => pathname.includes(drink.idDrink));

      const ingredientsIncludingNulls = Object
        .values(Object.fromEntries(Object.entries(selectedDrink['0'])
          .filter(([key]) => key.includes('strIngredient'))));

      const ingredientsExcludingNulls = ingredientsIncludingNulls
        .filter((ingredient) => ingredient !== null && ingredient !== '');

      const flags = ingredientsExcludingNulls
        .reduce((acc, curr) => ({ ...acc, [curr]: false }), {});

      setIngredientChecked(
        flags,
      );
    }
    if (savedFlags) {
      setIngredientChecked(savedFlags);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressRecipe', JSON.stringify(ingredientChecked));
  }, [ingredientChecked]);

  useEffect(() => {
    if (!loading) {
      const selectedDrink = drinks.drinks
        .filter((drink) => pathname.includes(drink.idDrink));

      const ingredientsIncludingNulls = Object
        .values(Object.fromEntries(Object.entries(selectedDrink['0'])
          .filter(([key]) => key.includes('strIngredient'))));

      const ingredientsExcludingNulls = ingredientsIncludingNulls
        .filter((ingredient) => ingredient !== null && ingredient !== '');

      if (Object.values(ingredientChecked)
        .every((ingredient) => ingredient)
        && Object.keys(ingredientChecked).length === Object.keys(ingredientsExcludingNulls
          .length)) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    }
  }, [ingredientChecked]);

  if (loading) return (<Loading />);

  return (
    <div>
      { Object.values(drinks.drinks).filter((drink) => pathname.includes(drink.idDrink))
        .map((drink, index) => (
          <div
            key={ index }
          >
            <img
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <h3
              data-testid="recipe-title"
            >
              { drink.strDrink }
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
              { drink.strCategory }
            </p>
            <p
              data-testid="instructions"
            >
              instructions
            </p>
            {/* pesquisado filtrar objetos pelo nome das chaves em
                https://masteringjs.io/tutorials/fundamentals/filter-key#:~:text=JavaScript%20objects%20don't%20have,()%20function%20as%20shown%20below.
             */}
            { Object.values(Object.fromEntries(Object.entries(drink)
              .filter(([key]) => key.includes('strIngredient'))))
              .filter((ingredient) => ingredient !== null && ingredient !== '')
              .map((ingredient, ingredientIndex) => (
                <div
                  key={ ingredientIndex }
                >
                  <label
                    htmlFor={ ingredient }
                    data-testid={ `${index}-ingredient-step` }
                    className={ ingredientChecked[ingredient] ? 'checked' : '' }
                  >
                    <input
                      id={ ingredient }
                      type="checkbox"
                      checked={ ingredientChecked[ingredient] }
                      onChange={ () => setIngredientChecked((current) => ({
                        ...current,
                        [ingredient]: !current[ingredient],
                      })) }
                    />
                    {ingredient}
                  </label>
                </div>
              ))}
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isButtonDisabled }
            >
              finish recipe
            </button>
          </div>
        ))}
    </div>
  );
}

export default RecipeInProgressDrinkBody;
