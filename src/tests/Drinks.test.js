import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';
import Recipes from '../pages/Recipes';
import RecipesProvider from '../context/RecipesProvider';

describe('Teste da rota Drinks', () => {
  const drinkTestId = 'drinks-bottom-btn';
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  test('Testa se é renderizado todos elementos', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );
    await screen.findByText('Corba');

    act(() => {
      history.push('/meals');
    });

    userEvent.click(screen.getByTestId(drinkTestId));
    await screen.findByText('GG');

    const allBbtns = await screen.findAllByRole('button');
    const firstImg = screen.getByRole('img', { name: /gg/i });
    const lastBtn = screen.getByRole('button', { name: /b-52/i });

    expect(allBbtns.length).toBe(22);
    expect(firstImg).toBeInTheDocument();
    expect(lastBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/drinks');

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(10);
  });

  test('Testa renderização de categories Drinks apos clicar na categoria', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );
    await screen.findByText('Corba');
    userEvent.click(screen.getByTestId(drinkTestId));
    await screen.findByText('GG');

    const btnShake = screen.getByRole('button', { name: /cocoa/i });
    userEvent.click(btnShake);

    await screen.findByText('Chocolate Beverage');

    const shake = screen.getByRole('img', { name: /Orange Scented Hot Chocolate/i });
    expect(shake).toBeInTheDocument();
  });

  test('Testa se ao clicar no botão detalhes o path é trocado', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );
    await screen.findByText('Corba');

    act(() => {
      history.push('/meals');
    });

    userEvent.click(screen.getByTestId(drinkTestId));
    await screen.findByText('GG');
    screen.logTestingPlaygroundURL();

    const secondImg = screen.getByRole('img', { name: /a1/i });
    userEvent.click(secondImg);

    expect(history.location.pathname).toBe('/drinks/17222');
  });
});
