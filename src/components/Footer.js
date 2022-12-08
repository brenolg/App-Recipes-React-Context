import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <button type="button" onClick={ () => history.push('/drinks') }>
        <img src={ drinkIcon } alt="drinkIcon" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ () => history.push('/meals') }>
        <img src={ mealIcon } alt="mealIcon" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}

export default Footer;
