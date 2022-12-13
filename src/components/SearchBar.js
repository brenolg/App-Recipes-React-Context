import React, { useEffect, useState } from 'react';
import './SearchBar.css'; // Css just for dark theme.
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [radio, setRadio] = useState('.');
  const [search, setSearch] = useState('');
  const [url, setUrl] = useState('');
  const [drinksOrMeals, setDrinksOrMeals] = useState('drinks');
  const [listMeals, setListMeals] = useState();
  const [listDrinks, setListDrinks] = useState();
  const [alertOneChar, setAlertOneChar] = useState(false);
  const [render, setRender] = useState([]);

  const TWELVE = 12;
  const path = window.location.pathname;
  const hist = useHistory();

  useEffect(() => {
    const fetchPlanetList = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setListMeals(data.meals);
        setListDrinks(data.drinks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanetList();
    // Make the request after clicking the search
    // button and not when clicking the radio
  }, [url]);

  useEffect(() => {
    if (path === '/meals' && search !== undefined) {
      setDrinksOrMeals('meals');
      switch (radio) {
      case 'ingredient':
        setUrl(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`);
        break;
      case 'name':
        setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        break;
      case 'letter':
        return (search.length <= 1)
          ? setUrl(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
          : setAlertOneChar(true);
      default:
      }
    }

    if (path === '/drinks' && search !== undefined) {
      setDrinksOrMeals('drinks');
      switch (radio) {
      case 'ingredient':
        setUrl(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`);
        break;
      case 'name':
        setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
        break;
      case 'letter':
        return (search.length <= 1)
          ? setUrl(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`)
          : setAlertOneChar(true);
      default:
      }
    }
  }, [search, radio, path]);

  const btnClickSearch = () => {
    if (path === '/meals' && listMeals) {
      if (listMeals.length === 1) {
        return hist.push(`/meals/${listMeals[0].idMeal}`);
      } if (listMeals.length > 1) {
        return setRender(listMeals);
      }
    } else if (!listDrinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (path === '/drinks' && listDrinks) {
      if (listDrinks.length === 1) {
        return hist.push(`/drinks/${listDrinks[0].idDrink}`);
      } if (listDrinks.length > 1) {
        return setRender(listDrinks);
      }
    } else if (!listDrinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    return alertOneChar && global.alert('Your search must have only 1 (one) character');
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
          data-testid="search-input"
          onChange={ (e) => setSearch(e.target.value) }
        />
      </div>
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="radio"
            id="ingredient"
            value="ingredient"
            onChange={ (e) => setRadio(e.target.value) }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name="radio"
            id="name"
            value="name"
            onChange={ (e) => setRadio(e.target.value) }
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="letter">
          <input
            type="radio"
            name="radio"
            id="letter"
            value="letter"
            maxLength="1"
            onChange={ (e) => setRadio(e.target.value) }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>
      <div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ () => btnClickSearch() }
        >
          SEARCH
        </button>

      </div>
      <div>
        { ((drinksOrMeals === 'meals') ? (
          render.slice(0, TWELVE).map((sel, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ sel.idMeal }
            >
              <p
                data-testid={ `${index}-card-name` }
              >
                { sel.strMeal }
              </p>
              <img
                src={ sel.strMealThumb }
                alt={ sel.strMealThumb }
                data-testid={ `${index}-card-img` }
              />
            </div>
          ))) : (
          render.slice(0, TWELVE).map((sel, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ sel.idDrink }
            >
              <p
                data-testid={ `${index}-card-name` }
              >
                { sel.strDrink }
              </p>
              <img
                src={ sel.strDrinkThumb }
                alt={ sel.strDrinkThumb }
                data-testid={ `${index}-card-img` }
              />
            </div>
          ))))}
      </div>
    </div>
  );
}

export default SearchBar;
