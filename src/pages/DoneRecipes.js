import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css'; // Css just for dark theme.

function DoneRecipes() {
  const doneRecipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];
  return (
    <div>
      <div>
        <Header pageTitle="Done Recipes">Done Recipes</Header>
      </div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => a() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => a() }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => a() }
        >
          Drinks
        </button>
      </div>
      <div>
        {
          doneRecipes.map((el, index) => (

            <div
              key={ index }
            >
              <img
                src={ el.image }
                alt={ `${doneRecipes[index]}.name` }
                data-testid={ `${index}-horizontal-image` }
              />

              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {
                  (el.type === 'meal')
                    ? `${el.nationality} - ${el.category}`
                    : (`${el.alcoholicOrNot}`)
                }
                {console.log(el.type)}
              </p>
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                {el.name}
              </p>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {el.doneDate}
              </p>
              <p
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="share"
              />

              { el.tags.map((indexs) => (

                <p
                  key={ index }
                  data-testid={ `${index}-${indexs}-horizontal-tag` }

                >
                  {indexs}
                </p>
              ))}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default DoneRecipes;
