import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [copiedUrl, setcopiedUrl] = useState(false);
  const [list, setList] = useState(doneRecipes);
  const copyUrl = (index) => {
    const copyText = (`${window.location.protocol}//${
      window.location.host
    }/meals/${doneRecipes[index].id}`);
    navigator.clipboard.writeText(copyText);
    // clipboardCopy(`${window.location.protocol}//${
    //   window.location.host
    // }/meals/${doneRecipes[index].id}`);
    setcopiedUrl(true);
  };
  console.log('aaaa');
  const btnFilter = (e) => {
    console.log(e);
    switch (e) {
    case 'Meals':
      console.log('meals');
      setList(doneRecipes.filter((el) => el.type.includes('meal')));
      break;
    case 'Drinks':
      console.log('drinks');
      setList(doneRecipes.filter((el) => el.type.includes('drink')));
      break;
    default:
      setList(doneRecipes);
      break;
    }
  };

  return (
    <div>
      <div>
        <Header pageTitle="Done Recipes">Done Recipes</Header>
      </div>
      <div>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => btnFilter('Meals') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => btnFilter('Drinks') }
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => btnFilter('All') }
        >
          All
        </button>
      </div>
      <div>
        {
          list.map((el, index) => (

            <div
              key={ index }
              data-testid="teste"
            >
              <Link to={ `/${el.type}s/${el.id}` }>
                <img
                  src={ el.image }
                  alt={ `${doneRecipes[index]}.name` }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                {
                  (el.type === 'meal')
                    ? `${el.nationality} - ${el.category}`
                    : (`${el.alcoholicOrNot}`)
                }
              </p>
              <Link to={ `/${el.type}s/${el.id}` }>
                <p
                  data-testid={ `${index}-horizontal-name` }
                >
                  {el.name}
                </p>
              </Link>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                {el.doneDate}
              </p>
              <button
                type="button"
                onClick={ () => copyUrl(index) }

              >
                <p
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  className="share"
                  alt="share"
                />
                {copiedUrl && 'Link copied!'}
              </button>

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
