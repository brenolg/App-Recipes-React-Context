import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import Loading from '../components/Loading';
import requestApi from '../services/requestAPI';
import Footer from '../components/Footer';

export default function Recipes(props) {
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
    } if (togleCat === 'Beef' || togleCat === 'Breakfast' || togleCat === 'Chicken'
     || togleCat === 'Dessert' || togleCat === 'Goat') {
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
    } if (togleCat === 'Ordinary Drink' || togleCat === 'Cocktail'
    || togleCat === 'Shake' || togleCat === 'Cocoa') {
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

  const handleDrinksDetails = (id) => {
    const { history } = props;
    history.push(`/drinks/${id}`);
  };

  const handleMealsDetails = (id) => {
    const { history } = props;
    history.push(`/meals/${id}`);
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
                <button
                  type="button"
                  onClick={ () => handleDrinksDetails(drink.idDrink) }
                >
                  Detalhess
                </button>
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
                <button
                  type="button"
                  onClick={ () => handleDrinksDetails(drinkC.idDrink) }
                >
                  Detalhes
                </button>
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
              <button
                type="button"
                onClick={ () => handleMealsDetails(mealC.idMeal) }
              >
                Detalhes
              </button>
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
              <button
                type="button"
                onClick={ () => handleMealsDetails(meal.idMeal) }
              >
                Detalhes
              </button>
            </div>
          ))
        )}
        <Footer />
      </>
    );
  }
}
Recipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }) }.isRequired;
