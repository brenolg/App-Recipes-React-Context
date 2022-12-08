import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';

function AuthProvider({ children }) {
  const [test] = useState('test');
  return (
    <AuthContext.Provider value={ test }>
      { children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default AuthProvider;
