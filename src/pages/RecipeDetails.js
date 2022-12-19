import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import IngredientsList from '../components/IngredientsList';

function RecipesDetails() {
  const history = useHistory();
  const [recipe, setRecipe] = useState(); // guarda a receita
  const [weight, setWeight] = useState(); // guarda os pesos dos ingredients
  const [ingredients, setIngredients] = useState([]); // guarda os ingredients
  const [codeVideo, setCodeVideo] = useState(''); // guarda o codigo do vídeo p/ meals
  const { pathname } = history.location;
  const pathSplit = pathname.split('/');
  const type = pathSplit[1]; // Tipo Meals ou Drinks

  const removeEmptyAttrs = (objMapped) => {
    const obj = objMapped[type];
    const recipeData = obj[0];
    let filter1 = [];
    Object.keys(recipeData).forEach((key) => {
      if (recipeData[key] === null) delete recipeData[key];
      filter1 = recipeData;
    });
    const filter2 = Object
      .fromEntries(Object
        .entries(filter1).filter(([key]) => key.includes('strIngredient')));
    setIngredients(Object.values(filter2));

    const filter3 = Object
      .fromEntries(Object
        .entries(filter1).filter(([key]) => key.includes('strMeasure')));
    setWeight(Object.values(filter3));
  };

  const youTubeEmbed = (data) => { // função para separar o código do vídeo e exibir via Youtube.
    const link = data.meals[0].strYoutube;
    const linkSplit = link.split('=');
    const code = linkSplit[1];
    setCodeVideo(code);
  };

  const fetchIdRecipe = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setRecipe(data);
    removeEmptyAttrs(data);
    if (type === 'meals') {
      youTubeEmbed(data);
    }
  };

  useEffect(() => {
    const id = pathSplit[2];
    if (pathSplit[1] === 'meals') {
      fetchIdRecipe(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    } else {
      fetchIdRecipe(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
  }, []);
  return (
    <div>
      <Header />
      <h1>Recipe Details</h1>
      <div>
        { !recipe && <Loading /> }
        {
          (recipe && type === 'meals') && (
            recipe.meals.map((meal) => (
              <div key={ meal.idMeal }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid="recipe-photo"
                />
                <h3 data-testid="recipe-title">{meal.strMeal}</h3>
                <h4 data-testid="recipe-category">{`Categoria: ${meal.strCategory}`}</h4>
                <div>
                  <IngredientsList ingredients={ ingredients } weight={ weight } />
                </div>
                <h3>Instructions</h3>
                <p data-testid="instructions">{meal.strInstructions}</p>
                <h3>Vídeo</h3>
                <iframe
                  width="360"
                  height="315"
                  src={ `https://www.youtube.com/embed/${codeVideo}` }
                  title="YouTube video player"
                  frameBorder="0"
                  allowFullScreen
                  data-testid="video"
                />
              </div>
            ))
          )
        }
        {
          (recipe && type === 'drinks') && (
            recipe.drinks.map((drink) => (
              <div key={ drink.idDrink }>
                <img
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid="recipe-photo"
                />
                <h3 data-testid="recipe-title">{drink.strDrink}</h3>
                <h4
                  data-testid="recipe-category"
                >
                  {`Categoria: ${drink.strAlcoholic}`}
                </h4>
                <IngredientsList ingredients={ ingredients } weight={ weight } />
                <h3>Instructions</h3>
                <p data-testid="instructions">{drink.strInstructions}</p>
              </div>
            ))
          )
        }
      </div>
      <Footer />
    </div>
  );
}

export default RecipesDetails;
