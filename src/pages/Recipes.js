import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';

export default function Recipes() {
  const { loading, drinks, meals } = useContext(RecipesContext);
  const [path, setPath] = useState();

  useEffect(() => {
    const pathLocation = window.location.pathname;
    setPath(pathLocation);
  }, []);

  const twelve = 12;
  if (loading === false) {
    if (path === '/drinks') {
      return (
        <>
          {drinks.drinks.slice(0, twelve).map((drink, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <p data-testid={ `${index}-card-name` }>
                {drink.strDrink}
              </p>
              <img
                data-testid={ `${index}-card-img` }
                alt={ drink.strDrink }
                src={ drink.strDrinkThumb }
              />
            </div>
          ))}
        </>
      );
    }
    return (
      <>
        {meals.meals.slice(0, twelve).map((meal, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <p
              key={ index }
              data-testid={ `${index}-card-name` }
            >
              {meal.strMeal}
            </p>
            <img
              data-testid={ `${index}-card-img` }
              alt={ meal.strMeal }
              src={ meal.strMealThumb }
            />
          </div>
        ))}
      </>
    );
  }
}
