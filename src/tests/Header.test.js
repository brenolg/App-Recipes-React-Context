import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../services/renderWithRouter';

describe('Test the header component', () => {
  it('if all elements appear on screen', () => {
    renderWithRouter(<Header pageTitle searchSymbol />);
    const profileButton = screen.getByTestId('profile-top-btn');
    searchButton = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');
    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('if search input appears on screen when search button is clicked', () => {
    renderWithRouter(<Header pageTitle searchSymbol />);
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
