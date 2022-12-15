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
    expect(global.fetch).toHaveBeenCalledTimes(4);
  });

  test('Testa renderização de categories Drinks apos clicar duas vezes na mesma categoria', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Recipes />
      </RecipesProvider>,
    );
    await screen.findByText('Corba');
    userEvent.click(screen.getByTestId(drinkTestId));
    await screen.findByText('GG');

    const btnShake = screen.getByRole('button', { name: /shake/i });
    userEvent.click(btnShake);

    await screen.findByText('151 Florida Bushwacker');

    const shake = screen.getByRole('img', { name: /Black Forest Shake/i });
    expect(shake).toBeInTheDocument();

    const btnShake2 = screen.getByRole('button', { name: /shake/i });
    userEvent.click(btnShake2);
    await screen.findByText('Corba');
    expect(shake).not.toBeInTheDocument();
  });
});

// Teste precisaria de um await da pagina de detalhes para funcionar
// test('Testa se ao clicar no botão detalhes o path é trocado', async () => {
//   const { history } = renderWithRouter(
//     <RecipesProvider>
//       <Recipes />
//     </RecipesProvider>,
//   );

//   act(() => {
//     history.push('/meals');
//   });

//   await screen.findByText('Corba');

//   const detailsBtn = screen.getAllByRole('button', { name: /detalhes/i });
//   userEvent.click(detailsBtn[0]);

//   expect(history.location.pathname).toBe('/meals/17222');
// });
