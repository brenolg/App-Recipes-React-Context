import React, { useContext, useEffect, useState } from 'react';
import './SearchBar.css'; // Css just for dark theme.
// import { useHistory } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import Loading from './Loading';

function Cards() {
  const [drinksOrMeals, setDrinksOrMeals] = useState('Drink');
  const TWELVE = 12;

  const {
    path,
    list,
    loading,
    setList,
    meals,
    drinks,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (path === '/meals'
      ? (
        console.log('meals'),
        setDrinksOrMeals('Meal'),
        setList(meals.meals)
      )
      : (
        console.log(drinks),
        setDrinksOrMeals('Drink'),
        setList(drinks.drinks)
      ));
  }, [path, setList, drinks.drinks, meals.meals]);

  useEffect(() => {
    setList(list);
  }, [list]);

  if (loading === true) {
    <Loading />;
  } else {
    return (

      <div>
        {
          list.slice(0, TWELVE).map((sel, index) => (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ sel[`id${drinksOrMeals}`] }
            >

              <p
                data-testid={ `${index}-card-name` }
              >
                { sel[`str${drinksOrMeals}`] }
              </p>
              <img
                src={ sel[`str${drinksOrMeals}Thumb`] }
                alt={ sel[`str${drinksOrMeals}Thumb`] }
                data-testid={ `${index}-card-img` }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

export default Cards;
