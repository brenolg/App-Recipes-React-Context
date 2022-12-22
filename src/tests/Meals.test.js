import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Recipes from '../pages/Recipes';
import fetch from '../../cypress/mocks/fetch';
import RecipesProvider from '../context/RecipesProvider';

describe('Teste da rota Meals', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockImplementation(fetch);
  });

  test('Testa se é renderizado todos elementos', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    await screen.findByText('Corba');
    const allBbtns = await screen.findAllByRole('button');
    const firstImg = screen.getByRole('img', { name: /corba/i });
    const lastBtn = screen.getByRole('button', { name: /pancakes/i });

    expect(allBbtns.length).toBe(22);
    expect(firstImg).toBeInTheDocument();
    expect(lastBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals');

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(10);
  });

  test('Testa renderização de categories Meals apos clicar na categoria', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    const kumpir = await screen.findByText('Kumpir');
    expect(kumpir).toBeInTheDocument();
    const btnBeef = screen.getByRole('button', { name: /beef/i });
    userEvent.click(btnBeef);

    await screen.findByText('Beef and Oyster pie');

    const brisket = screen.getByRole('img', { name: /beef brisket pot roast/i });
    expect(brisket).toBeInTheDocument();
    expect(kumpir).not.toBeInTheDocument();
  });

  test('Testa se ao clicar no botão detalhes o path é trocado', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    await screen.findByText('Corba');

    const detailsKumpir = screen.getByRole('img', { name: /kumpir/i });
    userEvent.click(detailsKumpir);

    expect(history.location.pathname).toBe('/meals/52978');
  });
});

// screen.logTestingPlaygroundURL();
