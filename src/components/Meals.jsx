import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import requestApi from '../services/requestAPI';
// import './Recipes.css';

export default function Meals() {
  const history = useHistory();
  const {
    meals,
    catMeal,
    setLoading,
    filterSwitch,
    setFilterSwitch,
    catFilter,
    setCatFilter,
    togleCat,
    setTogleCat } = useContext(RecipesContext);

  const catMealUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const mealCategory = async (target) => {
    if (togleCat === '' || togleCat !== target.name) {
      setTogleCat(target.name);
      setLoading(true);
      const mealsFilter = await requestApi(catMealUrl, target.name);
      setCatFilter(mealsFilter);
      setLoading(false);
      setFilterSwitch(true);
    } if (togleCat === 'Beef' || togleCat === 'Breakfast' || togleCat === 'Chicken'
     || togleCat === 'Dessert' || togleCat === 'Goat') {
      setFilterSwitch(false);
      setTogleCat('');
    }
  };

  const handleClickCategory = async ({ target }) => {
    mealCategory(target);
  };

  const deleteFilterCat = () => {
    setFilterSwitch(false);
  };

  const handleMealsDetails = (id) => {
    history.push(`/meals/${id}`);
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
              {catM.strCategory}
            </button>
          </div>
        ))}
      </nav>

      {filterSwitch === true ? (

        <section className="cardsSection">

          {catFilter.meals.slice(0, twelve).map((mealC, index) => (

            <div
              className="cardContainer"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >

              <img
                className="imgRecipes"
                data-testid={ `${index}-card-img` }
                alt={ mealC.strMeal }
                src={ mealC.strMealThumb }
              />
              <button
                className="detailsCards"
                data-testid={ `${index}-card-name` }
                type="button"
                onClick={ () => handleMealsDetails(mealC.idMeal) }
              >
                {mealC.strMeal}
              </button>
            </div>
          ))}

        </section>

      ) : (

        <section className="cardsSection">

          {meals.meals.slice(0, twelve).map((meal, index) => (

            <div
              className="cardContainer"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >

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
                onClick={ () => handleMealsDetails(meal.idMeal) }
              >
                {meal.strMeal}
              </button>
            </div>
          ))}

        </section>

      )}

    </main>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }) }.isRequired;
