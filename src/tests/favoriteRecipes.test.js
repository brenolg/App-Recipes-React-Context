import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('testes da tela receitas Favoritas', () => {
  beforeEach(() => {
    // pesquisei esse mock do localStorage em:
    // https://stackoverflow.com/questions/65282181/how-to-use-jest-for-testing-a-react-component-with-localstorage
    const localStorageMock = (() => {
      let store = {};
      return {
        getItem(key) {
          return store[key] || null;
        },
        setItem(key, value) {
          store[key] = value.toString();
        },
        removeItem(key) {
          delete store[key];
        },
        clear() {
          store = {};
        },
      };
    })();
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  const favoriteRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  const setLocalStorage = (id, data) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };

  test('testa se os elementos de filtragem estão na tela e funcionando', () => {
    const { history } = renderWithRouter(<App />);

    setLocalStorage('favoriteRecipes', favoriteRecipes);

    act(() => {
      history.push('/favorite-recipes');
    });

    const allButton = screen.getByTestId('filter-by-all-btn');
    const mealButton = screen.getByTestId('filter-by-meal-btn');
    const drinkButton = screen.getByTestId('filter-by-drink-btn');

    expect(allButton).toBeInTheDocument();
    expect(mealButton).toBeInTheDocument();
    expect(drinkButton).toBeInTheDocument();

    userEvent.click(drinkButton);

    const drinkItem = screen.getByText('Aquamarine');
    expect(drinkItem).toBeInTheDocument();
    userEvent.click(mealButton);

    const mealItem = screen.getByText('Spicy Arrabiata Penne');
    expect(mealItem).toBeInTheDocument();

    userEvent.click(allButton);
  });

  test('testa se os botões de compartilhar e desfavoritar estão na tela e funcionando', () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };

    global.navigator.clipboard = mockClipboard;

    const { history } = renderWithRouter(<App />);

    setLocalStorage('favoriteRecipes', favoriteRecipes);

    act(() => {
      history.push('/favorite-recipes');
    });

    const copyButton = screen.getByTestId('0-copy-button');
    const removeRecipeButton = screen.getByTestId('1-unfavorite-button');

    userEvent.click(copyButton);
    userEvent.click(removeRecipeButton);
  });
});
