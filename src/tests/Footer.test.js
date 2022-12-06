import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Recipes from '../pages/Recipes';

describe('Teste do componente Footer e suas funcionalidades', () => {
  test('Verifica se  Footer está inserido e ao renderizar a página principal', () => {
    renderWithRouter(<Recipes />);

    const footerTestId = screen.getByTestId('footer');
    expect(footerTestId).toBeInTheDocument();

    const buttonsRole = screen.getAllByRole('button');
    expect(buttonsRole.length).toBe(2);
  });
  test('Verifica se ao clicar no botão drinks, é rendirecionado para a página "/drinks"', () => {
    const { history } = renderWithRouter(<Recipes />);

    const drinkTestId = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinkTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
  test('Verifica se ao clicar no botão meals, é rendirecionado para a página "/meals"', () => {
    const { history } = renderWithRouter(<Recipes />);

    const mealsTestId = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
