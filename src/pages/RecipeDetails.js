import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

function RecipesDetails() {
  const history = useHistory();
  const [recipe, setRecipe] = useState(); // guarda a receita
  const [info, setInfo] = useState();
  const [ingredients, setIngredients] = useState([]);
  const { pathname } = history.location;
  const pathSplit = pathname.split('/');
  const type = pathSplit[1];

  const removeEmptyAttrs = (objMapped) => {
    Object.keys(objMapped).forEach((key) => {
      if (objMapped[key] && typeof objMapped[key] === 'object') {
        removeEmptyAttrs(objMapped[key]);
        if (Object.keys(objMapped[key]).length === 0) { // se pai ficou sem filhos
          delete objMapped[key]; // remove pai
        }
      } else if (objMapped[key] === null) delete objMapped[key];
    });
  };

  const fetchIdRecipe = async (url) => {
    const response = await fetch(url);
    setRecipe(await response.json());
  };

  useEffect(() => {
    const id = pathSplit[2];
    console.log(pathSplit[1]);
    if (pathSplit[1] === 'meals') {
      fetchIdRecipe(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    } else {
      fetchIdRecipe(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    }
    // const i = recipe[type];
    // console.log(i);
  }, []);
  console.log(recipe);
  return (
    <div>
      <Header />
      <h1>Recipe Details</h1>
      <div>
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
                <ul>
                  <li data-testid="1-ingredient-name-and-measure">
                    {meal.strIngredient1}
                  </li>
                  <li data-testid="1-ingredient-name-and-measure">
                    {meal.strIngredient1}
                  </li>
                </ul>
              </div>
            ))
          )
        }
        {/* {
          !recipe ? <Loading /> : (
            // console.log(recipe.meals)
            recipe.meals.map((meal) => (
              <div key={ meal.idMeal }>
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid="recipe-photo"
                />
                <h3 data-testid="recipe-title">{meal.strMeal}</h3>
                <h4 data-testid="recipe-category">{meal.strCategory}</h4>
              </div>
            ))
          )
        } */}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default RecipesDetails;
