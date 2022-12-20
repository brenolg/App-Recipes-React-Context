import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import './Carousel.css';
import Loading from './Loading';

function Carousel() {
  const { path, meals, drinks, loading } = useContext(RecipesContext);

  const six = 6;

  if (loading === true) {
    <Loading />;
  } else {
    if (path === '/meals') {
      return (
        <section className="cardsSectionF">

          {drinks.drinks.slice(0, six).map((drinkC, index) => (

            <div
              className="cardContainerF"
              data-testid={ `${index}-recommendation-card` }
              key={ index }
            >
              <Link to={ `/drinks/${drinkC.idDrink}` }>
                <img
                  className="imgRecipesF"
                  alt={ drinkC.strDrink }
                  src={ drinkC.strDrinkThumb }
                />
                <button
                  className="detailsCardsF"
                  data-testid={ `${index}-recommendation-title` }
                  type="button"
                >
                  {drinkC.strDrink}
                </button>
              </Link>
            </div>
          ))}
          <button
            className="startBtn"
            data-testid="start-recipe-btn"
            type="button"
          >
            Start Recipe

          </button>
        </section>

      );
    }

    return (
      <section className="cardsSectionF">

        {meals.meals.slice(0, six).map((meal, index) => (

          <div
            className="cardContainerF"
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <Link
              to={ `/meals/${meal.idMeal}` }
            >

              <img
                className="imgRecipesF"
                alt={ meal.strMeal }
                src={ meal.strMealThumb }
              />

              <button
                className="detailsCardsF"
                type="button"
                data-testid={ `${index}-recommendation-title` }
              >
                {meal.strMeal}
              </button>
            </Link>
          </div>
        ))}

        <button
          className="startBtn"
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe

        </button>

      </section>
    );
  }
}

export default Carousel;
