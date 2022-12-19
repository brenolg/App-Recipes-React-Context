import React, { useContext, useEffect, useState } from 'react';
import './SearchBar.css'; // Css just for dark theme.
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Cards from './Cards';

function SearchBar() {
  const [radio, setRadio] = useState('.');
  const [search, setSearch] = useState('');
  const [drinksOrMeals, setDrinksOrMeals] = useState('Drink');
  const [minUrl, setMinUrl] = useState('themealdb');
  const [drinkOrMealUrla, setDrinkOrMealUrla] = useState('meals');

  const hist = useHistory();

  const {
    path,
    setDrinkOrMealUrl,
    setUrl,
    list,
    setList,
    setBtn,
    btn,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (search) {
      return path === '/meals'
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
        );
    }
  }, [search, radio, path, minUrl, setUrl, setDrinkOrMealUrla,
    setDrinkOrMealUrl, list, setList, btn]);

  useEffect(() => {
    const teste = async () => {
      if (btn && list) {
        console.log('listtt', list);
        if (list.length === 1) {
          console.log('uma');
          setList(list);
          hist.push(`/${drinkOrMealUrla}/${list[0][`id${drinksOrMeals}`]}`);
        } if (list.length > 1) {
          console.log('maaaais');
          setList(list);
        } else if (list.length === 0 || list === null) {
          console.log('cccccc');
          global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
      }
    };
    teste();
  }, [list, setList, btn]);

  const btnClickSearch = async () => {
    setBtn(true);
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
    if (radio === 'letter' && search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
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
        <Cards />
        {/* {
          list.slice(0, TWELVE).map((sel, index) => (
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
        } */}
      </div>
    </div>
  );
}

export default SearchBar;
