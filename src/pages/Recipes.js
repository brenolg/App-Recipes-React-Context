import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Loading from '../components/Loading';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';

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
              <Drinks />
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
            <Meals />
          </div>
        )}

        <Footer />

      </>
    );
  }
}
