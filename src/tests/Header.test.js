import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from '../services/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';

describe('Test the header component', () => {
  it('if all elements appear on screen', async () => {
    renderWithRouter(
      <RecipesProvider>
        <Header pageTitle searchSymbol />
      </RecipesProvider>,
    );
    const profileButton = await screen.findByTestId('profile-top-btn');
    const searchButton = await screen.findByTestId('search-top-btn');
    const pageTitle = await screen.findByTestId('page-title');
    expect(profileButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });
  it('if search input appears on screen when search button is clicked', () => {
    renderWithRouter(
      <RecipesProvider>
        <Header pageTitle searchSymbol />
      </RecipesProvider>,
    );
    const searchButton = screen.getByTestId('search-top-btn');
    userEvent.click(searchButton);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });
});
