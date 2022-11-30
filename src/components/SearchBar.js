import React, { useEffect, useState } from 'react';
import './SearchBar.css'; // Css just for dark theme.
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [radio, setRadio] = useState('.');
  const [search, setSearch] = useState();
  const [url, setUrl] = useState('');
  const [listFood, setListFood] = useState();
  const [listDrink, setListDrink] = useState();
  // const [one, setOne] = useState(false);
  const [idFoods, setIdFood] = useState('');
  const [idDrinks, setIdDrink] = useState();
  // const [tt, setTt] = useState(false);

  const path = window.location.pathname;
  useEffect(() => {
    const fetchPlanetList = async () => {
      try {
        const response = await fetch(url);
        const lists = await response.json();
        if (path === '/meals') {
          setListFood(lists.meals.length);
          setIdFood(lists.meals[0].idMeal);
        } else {
          setListDrink(lists.drinks.length);
          setIdDrink(lists.drinks[0].idDrink);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanetList();
    // Make the request after clicking the search
    // button and not when clicking the radio
  }, [url]);

  useEffect(() => {
    let ingEnd = '';
    let nameEnd = '';
    let letterEnd = '';
    console.log(path);
    console.log(nameEnd);
    if (path === '/meals') {
      ingEnd = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`;
      nameEnd = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
      letterEnd = `https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`;
    } else {
      ingEnd = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}`;
      nameEnd = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
      letterEnd = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}`;
    }
    if (search !== undefined) {
      console.log(search);
      if (radio === 'letter' && search.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
    }
    if (radio === 'ingredient') {
      setUrl(ingEnd);
    } else if (radio === 'name') {
      setUrl(nameEnd);
    } else {
      setUrl(letterEnd);
    }
  }, [radio, search, path]);

  //   useEffect(() => {
  // const btnClickSearch = async () => {
  //   if (list.meals.length === 1) {
  //     setOne(true);
  //     setId(list.meals[0].idMeal);
  //   } else {
  //     setId(list.drinks[0].idDrink);
  //   }
  // };

  const hist = useHistory();
  const btnClickSearch = async () => {
    // setOne(window.location.pathname);
    if (listFood === 1) {
      return hist.push(`/meals/${idFoods}`);
    } if (listDrink === 1) {
      return hist.push(`/drinks/${idDrinks}`);
    }
  };

  return (
    <div>
      <div>
        <img src={ searchIcon } data-testid="search-top-btn" alt="search" />
        {/* Line 8 and 3 for test 10, remove after. */}
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
        <label htmlFor="Name">
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
        {/* <Link to={ one ? `/meals/:${id}` : '/meals' }> */}
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ btnClickSearch }
        >
          SEARCH
        </button>

        {/* </Link> */}
      </div>
    </div>
  );
}

export default SearchBar;
