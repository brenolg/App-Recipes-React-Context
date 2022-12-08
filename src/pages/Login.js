import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';

function Login(props) {
  const { history } = props;
  return (
    <LoginForm history={ history } />
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
