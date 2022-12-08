import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Recipes({ history }) {
  return (
    <header>
      {
        history.location.pathname === '/meals'
          ? <Header pageTitle="Meals" searchSymbol />
          : <Header pageTitle="Drinks" searchSymbol />
      }
    </header>
  );
}

Recipes.propTypes = ({
  history: PropTypes.string,
}).isRequired;

export default Recipes;
