import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import requestApi from '../services/requestAPI';

export default function Drinks() {
  const history = useHistory();
  const {
    drinks,
    catDrink,
    setLoading,
    filterSwitch,
    setFilterSwitch,
    catFilter,
    setCatFilter } = useContext(RecipesContext);

  const [togleCat, setTogleCat] = useState('');

  const catDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

  const drinkCategory = async (target) => {
    setTogleCat(target.name);
    if (togleCat === '' || togleCat !== target.name) {
      setLoading(true);
      const drinksFilter = await requestApi(catDrinkUrl, target.name);
      setCatFilter(drinksFilter);
      setLoading(false);
      setFilterSwitch(true);
    } if (togleCat === 'Ordinary Drink' || togleCat === 'Cocktail'
    || togleCat === 'Shake' || togleCat === 'Cocoa') {
      setFilterSwitch(false);
      setTogleCat('');
    }
  };

  const handleClickCategory = async ({ target }) => {
    drinkCategory(target);
  };

  const deleteFilterCat = () => {
    setFilterSwitch(false);
  };
  const handleDrinksDetails = (id) => {
    history.push(`/drinks/${id}`);
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
      </nav>

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
              Detalhes
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
    </main>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }) }.isRequired;
