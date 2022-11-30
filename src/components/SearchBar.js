import React from 'react';
import './SearchBar.css'; // Css just for dark theme.
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
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
