import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Profile from '../pages/Profile';
import RecipesProvider from '../context/RecipesProvider';

describe('Teste da página Profile e suas funcionalidades', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@email.com' }));
  });

  test('Testa se ao renderizar a página Profile é exibido o e-mail e os botões', () => {
    renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const emailTestId = screen.getByTestId('profile-email');
    expect(emailTestId).toBeInTheDocument();
    expect(emailTestId.innerHTML).toBe('E-mail: test@email.com');

    const buttonsByRole = screen.getAllByRole('button');
    expect(buttonsByRole.length).toBe(6);
  });
  test('Verifica se ao clicar no botão "Done Recipes", é rendirecionado para a página "/done-recipes"', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const buttonDoneByTestId = screen.getByTestId('profile-done-btn');
    userEvent.click(buttonDoneByTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  test('Verifica se ao clicar no botão "Favorite Recipes", é rendirecionado para a página "/favorite-recipes"', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const buttonFavoriteByTestId = screen.getByTestId('profile-favorite-btn');
    userEvent.click(buttonFavoriteByTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  test('Verifica se ao clicar no botão "Logout", é rendirecionado para a página "/" de Login', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Profile />
      </RecipesProvider>,
    );

    const buttonLogoutByTestId = screen.getByTestId('profile-logout-btn');
    userEvent.click(buttonLogoutByTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
