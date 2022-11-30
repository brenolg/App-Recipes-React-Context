import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes da tela de Login', () => {
  test('testa se os elementos estão na tela e funcionando', () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeDisabled();

    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, 'password');
    expect(loginButton).toBeEnabled();

    userEvent.click(loginButton);

    expect(history.location.pathname).toMatch('/meals');
  });
});
