import { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import requestApi from '../services/requestAPI';
import './meals&drinks.css';
import drinksCatList from '../images/drinksCatList';
import allDrink from '../images/allDrink.svg';

export default function DrinksT() {
  const {
    drinks,
    catDrink,
    setLoading,
    renderDrinks,
    setRenderDrinks,
    togleCat,
    setTogleCat,
  } = useContext(RecipesContext);

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
    drinkCategory(target);
  };

  const deleteFilterCat = () => {
    setRenderDrinks(drinks);
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

      <section className="cardsSection">

        {renderDrinks.drinks.slice(0, twelve).map((drinkC, index) => (

          <div
            className="cardContainer"
            data-testid={ `${index}-recipe-card` }
            key={ index }
          >
            <Link to={ `/drinks/${drinkC.idDrink}` }>
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

              >
                {drinkC.strDrink}
              </button>
            </Link>
          </div>
        ))}

      </section>

    </main>
  );
}
