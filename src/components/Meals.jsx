import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import requestApi from '../services/requestAPI';

export default function Meals() {
  const history = useHistory();
  const {
    meals,
    catMeal,
    setLoading,
    filterSwitch,
    setFilterSwitch,
    catFilter,
    setCatFilter } = useContext(RecipesContext);

  const [togleCat, setTogleCat] = useState('');

  const catMealUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  const mealCategory = async (target) => {
    setTogleCat(target.name);
    if (togleCat === '' || togleCat !== target.name) {
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

    <main>

      <nav>
        <button
          data-testid="All-category-filter"
          type="button"
          onClick={ deleteFilterCat }
        >
          All
        </button>

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
      </nav>

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

    </main>

  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }) }.isRequired;
