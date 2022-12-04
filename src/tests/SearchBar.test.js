import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';

describe('teste', () => {
  test('Se os elementos renderizam', () => {
    render(<SearchBar />);
    const search = screen.getByTestId('search-input');
    const ingrSearch = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const letterSearch = screen.getByTestId('first-letter-search-radio');
    const btnSearch = screen.getByTestId('exec-search-btn');

    expect(search).toBeInTheDocument();
    expect(ingrSearch).toBeInTheDocument();
    expect(nameSearch).toBeInTheDocument();
    expect(letterSearch).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  test('Se busca', () => {
    render(<SearchBar />);
    const search = screen.getByTestId('search-input');
    const ingrSearch = screen.getByTestId('ingredient-search-radio');
    const nameSearch = screen.getByTestId('name-search-radio');
    const letterSearch = screen.getByTestId('first-letter-search-radio');
    const btnSearch = screen.getByTestId('exec-search-btn');

    userEvent.click(ingrSearch);
    userEvent.type(search, 'chicken');
    userEvent.click(btnSearch);

    userEvent.click(nameSearch);
    userEvent.type(search, 'chicken');
    userEvent.click(btnSearch);

    userEvent.click(letterSearch);
    userEvent.type(search, 'c');
    userEvent.click(btnSearch);
  });
});
