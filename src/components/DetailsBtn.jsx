import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Carousel.css';
import PropTypes from 'prop-types';

function DetailsBtn() {
  const [renderBtn, setRenderBtn] = useState(true);
  const [btnTxt, setBtnTxt] = useState('Start Recipe');

  const pathLocation = window.location.pathname;
  const pathSplit = pathLocation.split('/');
  const id = pathSplit[2];
  const drinkOrMeal = pathSplit[1];

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (progressRecipes !== null) {
      progressRecipes.forEach((recipe) => {
        if (recipe.id === id) {
          setBtnTxt('Continue Recipe');
        } else {
          setBtnTxt('Start Recipe');
        }
      });
    }

    if (doneRecipes !== null) {
      doneRecipes.forEach((recipeP) => {
        if (recipeP.id === id) {
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

DetailsBtn.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default DetailsBtn;
