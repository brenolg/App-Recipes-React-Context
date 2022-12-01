import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import fetchRecipes from '../services/requestAPI';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  useEffect(() => {
    async function fetch() {
      setDrinks(await fetchRecipes(drinkUrl));
      setMeals(await fetchRecipes(mealsUrl));
      setLoading(false);
    }
    fetch();
  }, []);

  const value = useMemo(() => ({

    drinks,
    meals,
    loading,
    setDrinks,
    setMeals,
    setLoading,
  }), [drinks, meals, loading]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
