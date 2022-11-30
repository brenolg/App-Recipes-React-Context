import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageTitle, searchSymbol }) {
  return (
    <header>

      <button
        type="button"
      >
        <img
          src={ profileIcon }
          alt="Perfil"
          data-testid="profile-top-btn"
        />
      </button>

      {
        searchSymbol
      && (
        <button
          type="button"
        >
          <img
            src={ searchIcon }
            alt="Pesquisar"
            data-testid="search-top-btn"
          />
        </button>
      )
      }

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
