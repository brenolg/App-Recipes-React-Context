import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function LoginForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButtonValidation, setLoginButtonValidation] = useState(true);

  useEffect(() => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const six = 6;
    if (regex.test(email) && password.length > six) {
      setLoginButtonValidation(false);
    } else {
      setLoginButtonValidation(true);
    }
  }, [email, password]);

  return (
    <form>
      <label
        htmlFor="email-input"
      >
        <input
          id="email-input"
          type="text"
          data-testid="email-input"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
      </label>
      <label
        htmlFor="password-input"
      >
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ loginButtonValidation }
        onClick={ () => {
          const { history } = props;
          localStorage.setItem('user', JSON.stringify({ email }));
          // IMPORTANTE: reverter para meals quando o requisito 56 for concluído
          history.push('/favorite-recipes');
        } }
      >
        Login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default LoginForm;
