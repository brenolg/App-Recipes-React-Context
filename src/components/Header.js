import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageTitle }) {
  return (
    <div>
      <img
        src={ profileIcon }
        data-testid="profile-top-btn"
        alt="Profile Icon"
      />
      {
        (pageTitle === 'Meals' || pageTitle === 'Drinks')
        && (
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="Search Icon"
          />
        )
      }
      <h1 data-testid="page-title">
        {pageTitle}
      </h1>
    </div>
  );
}

Header.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};

export default Header;
