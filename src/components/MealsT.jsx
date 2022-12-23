import { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import requestApi from '../services/requestAPI';
import './meals&drinks.css';
import mealsCatList from '../images/mealsCatList';
import allMeal from '../images/allMeal.svg';

export default function MealsT() {
  const {
    meals,
    catMeal,
    setLoading,
    renderMeals,
    setRenderMeals,
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

  const handleClickCategory = async ({ target }) => {
    mealCategory(target);
  };

  const deleteFilterCat = () => {
    setRenderMeals(meals);
  };

  const twelve = 12;
  const five = 5;
  return (

    <main className="mainRecipes">

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

      <section className="cardsSection">

        {renderMeals.meals.slice(0, twelve).map((meal, index) => (

          <div
            className="cardContainer"
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <Link to={ `/meals/${meal.idMeal}` }>
              <img
                className="imgRecipes"
                data-testid={ `${index}-card-img` }
                alt={ meal.strMeal }
                src={ meal.strMealThumb }
              />
              <button
                className="detailsCards"
                data-testid={ `${index}-card-name` }
                type="button"
              >
                {meal.strMeal}
              </button>
            </Link>
          </div>
        ))}

      </section>

    </main>
  );
}
