import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import fetchRecipes from '../services/requestAPI';
import RecipesContext from './RecipesContext';

export default function RecipesProvider({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [catDrink, setCatDrink] = useState([]);
  const [catMeal, setCatMeal] = useState([]);
  const [searchInput, setSearchInput] = useState(false);
  const [filterSwitch, setFilterSwitch] = useState(false);
  const [catFilter, setCatFilter] = useState([]);
  const [togleCat, setTogleCat] = useState('');
  const [path, setPath] = useState();
  const [url, setUrl] = useState('');
  const [list, setList] = useState();
  const [listMeals, setListMeals] = useState();
  const [listDrinks, setListDrinks] = useState();
  const [drinkOrMealUrl, setDrinkOrMealUrl] = useState('meals');

  const mealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const catDrinkUrl = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const catMealUrl = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  useEffect(() => {
    async function fetch() {
      setDrinks(await fetchRecipes(drinkUrl));
      setMeals(await fetchRecipes(mealsUrl));
      setCatDrink(await fetchRecipes(catDrinkUrl));
      setCatMeal(await fetchRecipes(catMealUrl));
      setLoading(false);
    }
    fetch();
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('recipesdkorMel', drinkOrMealUrl);
        setList(data[`${drinkOrMealUrl}`]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchList();
  }, [url, drinkOrMealUrl]);

  const value = useMemo(() => ({
    catMeal,
    catDrink,
    drinks,
    meals,
    loading,
    searchInput,
    filterSwitch,
    catFilter,
    togleCat,
    path,
    url,
    listMeals,
    listDrinks,
    list,
    setList,
    setListDrinks,
    setListMeals,
    setUrl,
    setTogleCat,
    setCatFilter,
    setFilterSwitch,
    setDrinks,
    setMeals,
    setSearchInput,
    setLoading,
    setPath,
    setDrinkOrMealUrl,
  }), [
    drinks,
    meals,
    loading,
    catDrink,
    catMeal,
    searchInput,
    filterSwitch,
    catFilter,
    togleCat,
    path,
    url,
    listDrinks,
    listMeals,
    list,
  ]);

  return (
    <RecipesContext.Provider value={ value }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
