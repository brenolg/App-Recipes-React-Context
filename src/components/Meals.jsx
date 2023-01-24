import { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import './meals&drinks.css';
import RecipesBtns from './RecipesBtns';

export default function Meals() {
  const {
    renderMeals,
  } = useContext(RecipesContext);

  const twelve = 12;

  return (

    <main className="mainRecipes">

      <RecipesBtns />

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
