import React, { useContext, useEffect, useState } from 'react';
import './SearchBar.css'; // Css just for dark theme.
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function SearchBar() {
  const [radio, setRadio] = useState('.');
  const [search, setSearch] = useState('');
  const [drinksOrMeals, setDrinksOrMeals] = useState('Drink');
  const [minUrl, setMinUrl] = useState('themealdb');
  // const [alertOneChar, setAlertOneChar] = useState(false);
  const [render, setRender] = useState([]);
  const [drinkOrMealUrla, setDrinkOrMealUrla] = useState('meals');

  const TWELVE = 12;
  const hist = useHistory();

  const {
    path,
    setDrinkOrMealUrl,
    setUrl,
    list,
  } = useContext(RecipesContext);

  useEffect(() => {
    switch (radio) {
    case 'letter':
      setUrl(`https://www.${minUrl}.com/api/json/v1/1/search.php?f=${search}`);
      break;
    case 'name':
      setUrl(`https://www.${minUrl}.com/api/json/v1/1/search.php?s=${search}`);
      break;
    default:
      setUrl(`https://www.${minUrl}.com/api/json/v1/1/filter.php?i=${search}`);
      break;
    }

    if (search) {
      console.log(path);
      return (path === '/meals'
        ? (
          setDrinksOrMeals('Meal'),
          setMinUrl('themealdb'),
          setDrinkOrMealUrl('meals'),
          setDrinkOrMealUrla('meals')
        )
        : (
          setDrinksOrMeals('Drink'),
          setMinUrl('thecocktaildb'),
          setDrinkOrMealUrl('drinks'),
          setDrinkOrMealUrla('drinks')
        ));
    }
  }, [search, radio, path, minUrl, setUrl, setDrinkOrMealUrla, setDrinkOrMealUrl]);

  const btnClickSearch = () => {
    if (radio === 'letter' && search.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    if (list) {
      if (list.length === 1) {
        hist.push(`/${drinkOrMealUrla}/${list[0][`id${drinksOrMeals}`]}`);
      } if (list.length > 1) {
        setRender(list);
      }
    } else if (!list) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
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
            onChange={ () => setRadio('ingredient') }
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
            onChange={ () => setRadio('name') }
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
            onChange={ () => setRadio('letter') }
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
        {
          render.slice(0, TWELVE).map((sel, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ sel[`id${drinksOrMeals}`] }
            >

              <p
                data-testid={ `${index}-card-name` }
              >
                { sel[`str${drinksOrMeals}`] }
              </p>
              <img
                src={ sel[`str${drinksOrMeals}Thumb`] }
                alt={ sel[`str${drinksOrMeals}Thumb`] }
                data-testid={ `${index}-card-img` }
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default SearchBar;
