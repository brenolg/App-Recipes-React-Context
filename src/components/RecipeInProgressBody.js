import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Loading from './Loading';
import './RecipeInProgress.css';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgressBody() {
  const history = useHistory();

  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState();
  const [loading, setLoading] = useState(true);
  const [mealOrDrink, setMealOrDrink] = useState();
  const [ingredientChecked, setIngredientChecked] = useState();
  const [shareButtonClick, setShareButtonClick] = useState(false);
  const [favoriteButtonClick, setFavoriteButtonClick] = useState(false);
  const [doneRecipes, setDoneRecipes] = useState();

  const { pathname } = history.location;
  const pathSplit = pathname.split('/');
  const recipeType = pathSplit[1];
  const recipeId = pathSplit[2];

  const getIngredients = (objMapped) => {
    const obj = objMapped[recipeType];
    const recipeData = obj[0];
    let filter1 = [];
    Object.keys(recipeData).forEach((key) => {
      if (recipeData[key] === null) delete recipeData[key];
      if (recipeData[key] === '') delete recipeData[key];
      if (recipeData[key] === ' ') delete recipeData[key];
      filter1 = recipeData;
    });
    const filter2 = Object
      .fromEntries(Object
        .entries(filter1).filter(([key]) => key.includes('strIngredient')));
    setIngredients(Object.values(filter2));
    const savedFlags = localStorage.getItem('inProgressRecipe');
    if (!savedFlags) {
      const flags = Object.values(filter2)
        .reduce((acc, curr) => ({ ...acc, [curr]: false }), {});
      setIngredientChecked(flags);
    }
  };

  const fetchRecipeById = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setRecipe(data);
    getIngredients(data);
    setLoading(false);
  };

  // const updateLocalStorage = () => new Promise((resolve) => {
  //   localStorage.setItem('inProgressRecipe', JSON.stringify(ingredientChecked));
  //   resolve();
  // });

  const handleChange = (ingredient) => {
    setIngredientChecked((current) => ({
      ...current,
      [ingredient]: !current[ingredient],
    }));
    const saveToStorage = {
      ...ingredientChecked,
      [ingredient]: !ingredientChecked[ingredient],
    };
    window.localStorage.setItem('inProgressRecipe', JSON.stringify(saveToStorage));
  };

  const updateDoneRecipes = () => {
    const today = new Date();
    const saveData = recipe[pathSplit[1]][0];
    const item = {
      id: recipeId,
      nationality: saveData.strArea ? saveData.strArea : '',
      name: saveData[`str${mealOrDrink}`],
      category: saveData.strCategory,
      image: saveData[`str${mealOrDrink}Thumb`],
      tags: saveData.strTags ? [...saveData.strTags.split(',')] : [],
      alcoholicOrNot: saveData.strAlcoholic ? saveData.strAlcoholic : '',
      type: mealOrDrink.toLowerCase(),
      doneDate: today.toISOString(),
    };
    if (doneRecipes === undefined) {
      window.localStorage.setItem('doneRecipes', JSON.stringify([item]));
    } else {
      const newStorage = [...doneRecipes, item];
      window.localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
    }
  };

  // updateFavoriteRecipes = () => {
  //   const favoritedRecipes = localStorage.getItem('favoriteRecipes')
  //   const isRecipeFavorited = JSON.parse(favoritedRecipes).find()
  //   const saveData = recipe[pathSplit[1]][0];
  //   const item = {
  //     id: recipeId,
  //     type: mealOrDrink.toLowerCase(),
  //     nationality: saveData.strArea ? saveData.strArea : '',
  //     category: saveData.strCategory,
  //     alcoholicOrNot: saveData.strAlcoholic ? saveData.strAlcoholic : '',
  //     name: saveData[`str${mealOrDrink}`],
  //     image: saveData[`str${mealOrDrink}Thumb`],
  //   };
  //   if (!favoritedRecipes || ) {
  //     const isRecipeFavorited = JSON.parse(favoritedRecipes).find
  //   } else {

  //   }
  // };

  useEffect(() => {
    const savedFlags = localStorage.getItem('inProgressRecipe');
    const areRecipesDone = localStorage.getItem('doneRecipes');
    if (recipeType === 'meals') {
      setMealOrDrink('Meal');
      fetchRecipeById(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    } else {
      setMealOrDrink('Drink');
      fetchRecipeById(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
    }

    if (savedFlags) {
      setIngredientChecked(JSON.parse(savedFlags));
    }
    if (areRecipesDone) {
      setDoneRecipes(JSON.parse(areRecipesDone));
    }
  }, []);

  if (loading) return (<Loading />);

  return (
    <div>
      { recipe[pathSplit[1]].map((selectedRecipe, index) => (
        <div
          key={ index }
        >
          <img
            data-testid="recipe-photo"
            src={ selectedRecipe[`str${mealOrDrink}Thumb`] }
            alt={ selectedRecipe[`str${mealOrDrink}`] }
          />
          <h3
            data-testid="recipe-title"
          >
            { selectedRecipe[`str${mealOrDrink}`] }
          </h3>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => {
              copy(`http://localhost:3000/${recipeType}/${recipeId}`);
              setShareButtonClick(!shareButtonClick);
            } }
          >
            { shareButtonClick ? 'Link copied!' : 'Share'}
          </button>
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ () => {
              setFavoriteButtonClick(!favoriteButtonClick);
            } }
          >
            <img
              className="favorite-btn"
              src={ favoriteButtonClick ? blackHeartIcon : whiteHeartIcon }
              alt="botão de favoritar"
            />
          </button>
          <p
            data-testid="recipe-category"
          >
            { selectedRecipe.strCategory }
          </p>
          <p
            data-testid="instructions"
          >
            { selectedRecipe.strInstructions }
          </p>
          { ingredients.map((ingredient, ingredientIndex) => (
            <div
              key={ ingredientIndex }
            >
              <label
                htmlFor={ ingredient }
                data-testid={ `${ingredientIndex}-ingredient-step` }
                className={ ingredientChecked[ingredient] ? 'checked' : '' }
              >
                <input
                  id={ ingredient }
                  type="checkbox"
                  checked={ ingredientChecked[ingredient] }
                  onChange={ () => handleChange(ingredient) }
                />
                {ingredient}
              </label>
            </div>
          ))}
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ Object.values(ingredientChecked).some((flag) => flag === false) }
            onClick={ () => {
              updateDoneRecipes();
              history.push('/done-recipes');
            } }
          >
            finish recipe
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipeInProgressBody;
