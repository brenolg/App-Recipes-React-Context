import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import RecipesContext from '../context/RecipesContext';

function Header({ pageTitle, searchSymbol }) {
  const { searchInput, setSearchInput } = useContext(RecipesContext);
  return (
    <header>
      <Link
        to="/profile"
      >
        <button
          type="button"
        >
          <img
            src={ profileIcon }
            alt="Profile"
            data-testid="profile-top-btn"
          />
        </button>
      </Link>

      {
        searchSymbol
      && (
        <button
          type="button"
          onClick={ () => setSearchInput((prevState) => !prevState) }
        >
          <img
            src={ searchIcon }
            alt="Search"
            data-testid="search-top-btn"
          />
        </button>
      )
      }
      {searchInput
      // <input type="text" data-testid="search-input" />
      && <SearchBar data-testid="search-input" />}
      <h1
        data-testid="page-title"
      >
        {pageTitle}
      </h1>

    </header>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  searchSymbol: PropTypes.bool.isRequired,
};

export default Header;
