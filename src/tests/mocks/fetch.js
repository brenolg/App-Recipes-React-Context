import meals from './meals';
import breakfastMeals from './breakfastMeals ';
import mealCategories from './mealCategories';
import drinks from './drinks';
import cocoaDrinks from './cocoaDrinks';
import drinkCategories from './drinkCategories';

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(mealCategories); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(drinkCategories); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') { return Promise.resolve(breakfastMeals); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') { return Promise.resolve(cocoaDrinks); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(meals); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinks); }
  },
});

export default fetch;
