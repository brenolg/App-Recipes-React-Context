import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';

describe('Teste do DoneRecipes', () => {
  const filterALL = 'filter-by-all-btn';
  const filterDrink = 'filter-by-drink-btn';
  const filterMeal = 'filter-by-meal-btn';

  test('Verifica os botoes renderizam', () => {
    renderWithRouter(<DoneRecipes />);

    const mealsBtn = screen.getByTestId(filterMeal);
    expect(mealsBtn).toBeInTheDocument();
    const drinksBtn = screen.getByTestId(filterDrink);
    expect(drinksBtn).toBeInTheDocument();
    const allBtn = screen.getByTestId(filterALL);
    expect(allBtn).toBeInTheDocument();
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();

    userEvent.click(mealsBtn);
    const nameMeal = screen.getByTestId('0-horizontal-name');
    expect(nameMeal).toBeInTheDocument();
  });

  test('Verifica o botao share', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    renderWithRouter(<DoneRecipes />);

    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
    userEvent.click(shareBtn);
  });
  test('Verifica se ao clicar botão all, são renderizadas 2 receitas', () => {
    renderWithRouter(<DoneRecipes />);
    const allBtn = screen.getByTestId(filterALL);
    expect(allBtn).toBeInTheDocument();

    userEvent.click(allBtn);
    const list = screen.getAllByTestId('teste');
    expect(list).toHaveLength(2);
  });
  test('Verifica se ao clicar no botão meal, meal é renderizado', () => {
    renderWithRouter(<DoneRecipes />);
    const mealsBtn = screen.getByTestId(filterMeal);
    expect(mealsBtn).toBeInTheDocument();

    userEvent.click(mealsBtn);
    const list = screen.getByText('Spicy Arrabiata Penne');
    expect(list).toBeInTheDocument();
  });
  test('Verifica se ao clicar no botão drink, o drink é renderizado', () => {
    renderWithRouter(<DoneRecipes />);
    const drinksBtn = screen.getByTestId(filterDrink);
    expect(drinksBtn).toBeInTheDocument();

    userEvent.click(drinksBtn);
    const list = screen.getByText('Aquamarine');
    expect(list).toBeInTheDocument();
  });
});
