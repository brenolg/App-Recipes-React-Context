import React from 'react';
import { useHistory } from 'react-router-dom';
import RecipeInProgressMealBody from '../components/RecipeInProgressMealBody';
import RecipeInProgressDrinkBody from '../components/RecipeInProgressDrinkBody';

function RecipeInProgress() {
  const history = useHistory();
  const { pathname } = history.location;
  if (pathname.includes('meals')) {
    return (
      <RecipeInProgressMealBody />
    );
  }

  if (pathname.includes('drinks')) {
    return (
      <RecipeInProgressDrinkBody />
    );
  }
}

export default RecipeInProgress;
