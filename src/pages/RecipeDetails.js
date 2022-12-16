import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function RecipesDetails() {
  const history = useHistory();
  const [recipe, setRecipe] = useState();

  const fetchIdRecipe = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setRecipe(data);
  };

  useEffect(() => {
    const { pathname } = history.location;
    const pathSplit = pathname.split('/');
    const id = pathSplit[2];
    console.log(pathSplit[1]);
    if (pathSplit[1] === 'meals') {
      fetchIdRecipe(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    } else {
      fetchIdRecipe(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }

    console.log(recipe);
  }, []);
  return (
    <div>
      <Header />
      <h1>Recipe Details</h1>
      <Footer />
    </div>
  );
}

export default RecipesDetails;
