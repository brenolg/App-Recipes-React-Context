import { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import './meals&drinks.css';
import RecipesBtns from './RecipesBtns';

export default function Drinks() {
  const {
    renderDrinks,
  } = useContext(RecipesContext);

  const twelve = 12;

  return (

    <main className="mainRecipes">

      <RecipesBtns />

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
