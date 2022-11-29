import React from 'react';

function LoginForm() {
  return (
    <form>
      <label
        htmlFor="email-input"
      >
        <input
          id="email-input"
          type="text"
          data-testid="email-input"
        />
      </label>
      <label
        htmlFor="password-input"
      >
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
