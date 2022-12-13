import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import RecipesContext from '../context/RecipesContext';

function Footer() {
  const history = useHistory();

  const { setPath } = useContext(RecipesContext);

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => {
          setPath('/drinks');
          history.push('/drinks');
        } }
      >
        <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => {
          setPath('/meals');
          history.push('/meals');
        } }
      >
        <img src={ mealIcon } alt="mealIcon" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
