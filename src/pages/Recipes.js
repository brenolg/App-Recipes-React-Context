import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MealsT from '../components/MealsT';
import DrinksT from '../components/DrinksT';

export default function Recipes() {
  const history = useHistory();

  const {
    loading,
    searchInput,
    path,
    setPath,
  } = useContext(RecipesContext);

  useEffect(() => {
    const pathLocation = window.location.pathname;
    setPath(pathLocation);
  }, []);

  if (loading === true) {
    <Loading />;
  } else {
    if (path === '/drinks') {
      return (
        <>
          <header>
            {
              history.location.pathname === '/meals'
                ? <Header pageTitle="Meals" searchSymbol />
                : <Header pageTitle="Drinks" searchSymbol />
            }
          </header>

          {!searchInput && (
            <div>
              <DrinksT/>
            </div>
          )}

          <Footer />

        </>
      );
    }

    return (
      <>

        <header>
          {
            history.location.pathname === '/meals'
              ? <Header pageTitle="Meals" searchSymbol />
              : <Header pageTitle="Drinks" searchSymbol />
          }
        </header>

        {!searchInput && (
          <div>
            <MealsT />
          </div>
        )}

        <Footer />

      </>
    );
  }
}
