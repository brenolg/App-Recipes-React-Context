import React, { useEffect, useState } from 'react';
import './SearchBar.css'; // Css just for dark theme.
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [radio, setRadio] = useState('.');
  const [search, setSearch] = useState();
  const [url, setUrl] = useState('');

  useEffect(() => {
    const fetchPlanetList = async () => {
      try {
        const response = await fetch(url);
        const list = await response.json();
        console.log(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlanetList();
    // Make the request after clicking the search
    // button and not when clicking the radio
  }, [url]);
  const path = window.location.pathname;
  useEffect(() => {
    let ingEnd = '';
    let nameEnd = '';
    let letterEnd = '';

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
        <button
          type="button"
          data-testid="exec-search-btn"
        //   onClick={ () => () }
        >
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
