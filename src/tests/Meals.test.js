import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import renderWithRouter from './renderWithRouter';
import Recipes from '../pages/Recipes';
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

    expect(allBbtns.length).toBe(20);
    expect(firstImg).toBeInTheDocument();
    expect(lastBtn).toBeInTheDocument();
    expect(history.location.pathname).toBe('/meals');

    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(4);
  });

  test('Testa renderização de categories Meals apos clicar duas vezes na mesma categoria', async () => {
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

    userEvent.click(btnBeef);
    await screen.findByText('Corba');
    expect(brisket).not.toBeInTheDocument();
    expect(kumpir).toBeInTheDocument();
  });
});

//   test('Testa se ao clicar no botão detalhes o path é trocado', async () => {
//     const { history } = renderWithRouter(
//       <RecipesProvider>
//         <Recipes />
//       </RecipesProvider>,
//     );

//     act(() => {
//       history.push('/meals');
//     });

//     await screen.findByText('Corba');

//     const detailsBtn = screen.getAllByRole('button', { name: /detalhes/i });
//     userEvent.click(detailsBtn[0]);

//     expect(history.location.pathname).toBe('/meals/17222');
//   });
