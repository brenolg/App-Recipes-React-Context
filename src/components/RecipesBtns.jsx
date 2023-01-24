import { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import requestApi from '../services/requestAPI';
import './meals&drinks.css';
import drinksCatList from '../images/drinksCatList';
import allDrink from '../images/allDrink.svg';
import mealsCatList from '../images/mealsCatList';
import allMeal from '../images/allMeal.svg';

export default function RecipesBtns() {
  const {
    drinks,
    meals,
    setLoading,
    setRenderDrinks,
    setRenderMeals,
    path,
    catMeal,
    catDrink,
    togleCat,
    setTogleCat,
  } = useContext(RecipesContext);

  const catMealUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const mealCategory = async (target) => {
    if (togleCat === '' || togleCat !== target.name) {
      setTogleCat(target.name);
      setLoading(true);
      const mealsFilter = await requestApi(catMealUrl, target.name);
      setRenderMeals(mealsFilter);
      setLoading(false);
    } if (togleCat === 'Beef' || togleCat === 'Breakfast' || togleCat === 'Chicken'
     || togleCat === 'Dessert' || togleCat === 'Goat') {
      setRenderMeals(meals);
      setTogleCat('');
    }
  };

  const catDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const drinkCategory = async (target) => {
    setTogleCat(target.name);
    if (togleCat === '' || togleCat !== target.name) {
      setTogleCat(target.name);
      setLoading(true);
      const drinksFilter = await requestApi(catDrinkUrl, target.name);
      setLoading(false);
      setRenderDrinks(drinksFilter);
      setTogleCat(target.name);
      console.log(togleCat);
    } if (togleCat === 'Ordinary Drink' || togleCat === 'Cocktail'
    || togleCat === 'Shake' || togleCat === 'Cocoa' || togleCat === 'Other / Unknown') {
      setRenderDrinks(drinks);
      setTogleCat('');
    }
  };

  const handleClickCategory = async ({ target }) => {
    if (path === '/meals') {
      mealCategory(target);
    } else {
      drinkCategory(target);
    }
  };

  const deleteFilterCat = () => {
    if (path === '/meals') {
      setRenderMeals(meals);
    } else {
      setRenderDrinks(drinks);
    }
  };

  const five = 5;

  if (path === '/drinks') {
    return (

      <nav className="navRecipes">

        <button
          className="categoryRecipes"
          data-testid="All-category-filter"
          type="button"
          onClick={ deleteFilterCat }
        >
          <img
            className="imgCategory"
            src={ allDrink }
            alt="categoryIcon"
          />
          All
        </button>

        {catDrink.drinks.slice(0, five).map((catD, index) => (
          <div
            key={ index }
          >
            <button
              className="categoryRecipes"
              data-testid={ `${catD.strCategory}-category-filter` }
              key={ index }
              name={ catD.strCategory }
              type="button"
              onClick={ handleClickCategory }
            >

              <img
                name={ catD.strCategory }
                src={ drinksCatList[index] }
                className="imgCategory"
                alt='"categoryIcon"'
              />
              { catD.strCategory }
            </button>
          </div>
        ))}
      </nav>
    );
  }

  return (

    <nav className="navRecipes">
      <button
        className="categoryRecipes"
        data-testid="All-category-filter"
        type="button"
        onClick={ deleteFilterCat }
      >
        <img
          className="imgCategory"
          src={ allMeal }
          alt="categoryIcon"
        />
        All
      </button>

      {catMeal.meals.slice(0, five).map((catM, index) => (
        <div
          key={ index }
        >
          <button
            className="categoryRecipes"
            data-testid={ `${catM.strCategory}-category-filter` }
            name={ catM.strCategory }
            key={ index }
            type="button"
            onClick={ handleClickCategory }
          >

            <img
              name={ catM.strCategory }
              src={ mealsCatList[index] }
              className="imgCategory"
              alt='"categoryIcon"'
            />
            {catM.strCategory }
          </button>
        </div>
      ))}
    </nav>
  );
}
