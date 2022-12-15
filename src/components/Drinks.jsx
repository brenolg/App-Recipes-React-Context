import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesContext';
import requestApi from '../services/requestAPI';
import './meals&drinks.css';
import drinksCatList from '../images/drinksCatList';
import allDrink from '../images/allDrink.svg';

export default function Drinks() {
  const history = useHistory();
  const {
    drinks,
    catDrink,
    setLoading,
    filterSwitch,
    setFilterSwitch,
    catFilter,
    setCatFilter,
    togleCat,
    setTogleCat } = useContext(RecipesContext);

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

      {filterSwitch === true ? (

        <section className="cardsSection">

          {catFilter.drinks.slice(0, twelve).map((drink, index) => (

            <div
              className="cardContainer"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >

              <img
                className="imgRecipes"
                data-testid={ `${index}-card-img` }
                alt={ drink.strDrink }
                src={ drink.strDrinkThumb }
              />
              <button
                className="detailsCards"
                data-testid={ `${index}-card-name` }
                type="button"
                onClick={ () => handleDrinksDetails(drink.idDrink) }
              >
                {drink.strDrink}
              </button>
            </div>

          ))}

        </section>

      ) : (

        <section className="cardsSection">

          {drinks.drinks.slice(0, twelve).map((drinkC, index) => (

            <div
              className="cardContainer"
              data-testid={ `${index}-recipe-card` }
              key={ index }
            >

              <img
                className="imgRecipes"
                data-testid={ `${index}-card-img` }
                alt={ drinkC.strDrink }
                src={ drinkC.strDrinkThumb }
              />
              <button
                className="detailsCards"
                data-testid={ `${index}-card-name` }
                type="button"
                onClick={ () => handleDrinksDetails(drinkC.idDrink) }
              >
                {drinkC.strDrink}
              </button>
            </div>
          ))}

        </section>

      )}
    </main>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }) }.isRequired;
