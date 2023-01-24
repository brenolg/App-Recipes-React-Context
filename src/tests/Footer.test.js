import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Recipes from '../pages/Recipes';
import RecipesProvider from '../context/RecipesProvider';
import fetch from './mocks/fetch';

describe('Teste do componente Footer e suas funcionalidades', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });
  test('Verifica se  Footer está inserido e ao renderizar a página principal', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );

    const footerTestId = await screen.findByTestId('footer');
    expect(footerTestId).toBeInTheDocument();

    const buttonsRole = screen.getAllByRole('button');
    expect(buttonsRole.length).toBe(22);
  });
  test('Verifica se ao clicar no botão drinks, é rendirecionado para a página "/drinks"', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );

    const drinkTestId = await screen.findByTestId('drinks-bottom-btn');
    userEvent.click(drinkTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
  test('Verifica se ao clicar no botão meals, é rendirecionado para a página "/meals"', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );

    const mealsTestId = await screen.findByTestId('meals-bottom-btn');
    userEvent.click(mealsTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
