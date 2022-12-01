import { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import Loading from '../components/Loading';
import requestApi from '../services/requestAPI';

export default function Recipes() {
  const {
    loading,
    drinks,
    meals,
    catDrink,
    catMeal,
    setLoading } = useContext(RecipesContext);
  const [path, setPath] = useState();
  const [catFilter, setCatFilter] = useState([]);
  const [filterSwitch, setFilterSwitch] = useState(false);

  useEffect(() => {
    const pathLocation = window.location.pathname;
    setPath(pathLocation);
  }, []);

  const catMealUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const catDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  const handleClickCategory = async ({ target }) => {
    setLoading(true);
    if (path === '/drinks') {
      const drinksFilter = await requestApi(catDrinkUrl, target.name);
      setCatFilter(drinksFilter);
      setFilterSwitch(true);
    } else {
      const mealsFilter = await requestApi(catMealUrl, target.name);
      setCatFilter(mealsFilter);
      setFilterSwitch(true);
    }
    setLoading(false);
  };

  const twelve = 12;
  const five = 5;
  if (loading === true) {
    <Loading />;
  } else {
    if (path === '/drinks') {
      return (
        <>

          {catDrink.drinks.slice(0, five).map((catD, index) => (
            <nav
              key={ index }
            >
              <button
                data-testid={ `${catD.strCategory}-category-filter` }
                key={ index }
                name={ catD.strCategory }
                type="button"
                onClick={ handleClickCategory }
              >
                {catD.strCategory}
              </button>
            </nav>
          ))}

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

        {catMeal.meals.slice(0, five).map((catM, index) => (
          <nav
            key={ index }
          >
            <button
              data-testid={ `${catM.strCategory}-category-filter` }
              name={ catM.strCategory }
              key={ index }
              type="button"
            >
              {catM.strCategory}
            </button>
          </nav>
        ))}

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
