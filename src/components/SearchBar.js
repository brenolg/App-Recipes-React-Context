import React from 'react';
import './SearchBar.css'; // Css just for dark theme.
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  return (
    <div>
      <div>
        <img src={ searchIcon } alt="search" />
        {/* Line 8 and 3 for test 10, remove after. */}
        <input
          type="text"
          placeholder="Search"
          data-testid="search-input"
        />
      </div>
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            name="radio"
            id="ingredient"
            value="ingredient"
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
