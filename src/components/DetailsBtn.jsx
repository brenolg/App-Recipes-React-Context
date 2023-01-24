import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';

function DetailsBtn() {
  const start = 'Start Recipe';
  const [renderBtn, setRenderBtn] = useState(true);
  const [btnTxt, setBtnTxt] = useState(start);

  const pathLocation = window.location.pathname;
  const pathSplit = pathLocation.split('/');
  const id = pathSplit[2];
  const drinkOrMeal = pathSplit[1];

  useEffect(() => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(drinkOrMeal);
    if (progressRecipes !== null && progressRecipes !== undefined) {
      if (drinkOrMeal === 'meals') {
        const keysIdMeal = Object.keys(progressRecipes.meals);
        keysIdMeal.forEach((recipeM) => {
          if (recipeM === id) {
            setBtnTxt('Continue Recipe');
          } else {
            setBtnTxt(start);
          }
        });
      } else {
        const keysIdDrink = Object.keys(progressRecipes.drinks);
        keysIdDrink.forEach((recipeD) => {
          if (recipeD === id) {
            setBtnTxt('Continue Recipe');
          } else {
            setBtnTxt(start);
          }
        });
      }
    }
  }, []);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

    if (doneRecipes !== null && doneRecipes !== undefined) {
      doneRecipes.forEach((recipe) => {
        if (recipe.id === id) {
          setRenderBtn(false);
        } else {
          setRenderBtn(true);
        }
      });
    }
  }, []);

  return (
    <Link
      to={ `/${drinkOrMeal}/${id}/in-progress` }

    >
      <button
        className={ renderBtn ? 'visible' : 'invisible' }
        type="button"
        data-testid="start-recipe-btn"

      >
        {btnTxt}

      </button>
    </Link>

  );
}

export default DetailsBtn;
