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
  const [togleCat, setTogleCat] = useState('');

  useEffect(() => {
    const pathLocation = window.location.pathname;
    setPath(pathLocation);
    setFilterSwitch(false);
  }, []);

  const catMealUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
  const catDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const mealCategory = async (target) => {
    if (togleCat === '' || togleCat !== target.name) {
      setLoading(true);
      const mealsFilter = await requestApi(catMealUrl, target.name);
      setCatFilter(mealsFilter);
      setFilterSwitch(true);
      setLoading(false);
      setTogleCat(target.name);
    } if (togleCat === 'Beef') {
      setFilterSwitch(false);
      setTogleCat('');
    } if (togleCat === 'Breakfast') {
      setFilterSwitch(false);
      setTogleCat('');
    } if (togleCat === 'Chicken') {
      setFilterSwitch(false);
      setTogleCat('');
    } if (togleCat === 'Dessert') {
      setFilterSwitch(false);
      setTogleCat('');
    } if (togleCat === 'Goat') {
      setFilterSwitch(false);
      setTogleCat('');
    }
  };

  const drinkCategory = async (target) => {
    if (togleCat === '' || togleCat !== target.name) {
      setLoading(true);
      const drinksFilter = await requestApi(catDrinkUrl, target.name);
      setCatFilter(drinksFilter);
      setFilterSwitch(true);
      setLoading(false);
      setTogleCat(target.name);
    } if (togleCat === 'Ordinary Drink') {
      setFilterSwitch(false);
      setTogleCat('');
    } if (togleCat === 'Cocktail') {
      setFilterSwitch(false);
      setTogleCat('');
    } if (togleCat === 'Shake') {
      setFilterSwitch(false);
      setTogleCat('');
    } if (togleCat === 'Cocoa') {
      setFilterSwitch(false);
      setTogleCat('');
    }
  };

  const handleClickCategory = async ({ target }) => {
    if (path === '/drinks') {
      drinkCategory(target);
    } else {
      mealCategory(target);
    }
  };

  const deleteFilterCat = () => {
    setFilterSwitch(false);
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

          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ deleteFilterCat }
          >
            Other/Unknown
          </button>

          {filterSwitch === true ? (
            catFilter.drinks.slice(0, twelve).map((drink, index) => (
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
            ))

          ) : (

            drinks.drinks.slice(0, twelve).map((drinkC, index) => (
              <div
                data-testid={ `${index}-recipe-card` }
                key={ index }
              >
                <p data-testid={ `${index}-card-name` }>
                  {drinkC.strDrink}
                </p>
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ drinkC.strDrink }
                  src={ drinkC.strDrinkThumb }
                />
              </div>
            ))
          )}

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
              onClick={ handleClickCategory }
            >
              {catM.strCategory}
            </button>

          </nav>
        ))}

        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ deleteFilterCat }
        >
          Other/Unknown
        </button>

        {filterSwitch === true ? (
          catFilter.meals.slice(0, twelve).map((mealC, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >
              <p data-testid={ `${index}-card-name` }>
                {mealC.strMeal}
              </p>
              <img
                data-testid={ `${index}-card-img` }
                alt={ mealC.strMeal }
                src={ mealC.strMealThumb }
              />
            </div>
          ))

        ) : (

          meals.meals.slice(0, twelve).map((meal, index) => (
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
          ))
        )}

      </>
    );
  }
}
