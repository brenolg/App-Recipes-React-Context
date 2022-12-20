import PropTypes from 'prop-types';

function IngredientsList(props) {
  const { ingredients, weight } = props;

  return (
    <div>
      <h3>Ingredients:</h3>
      <div>
        {
          ingredients.map((i, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${i} -`}
            </p>
          ))
        }
        {
          weight.map((w, index) => (
            <p
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {w}
            </p>
          ))
        }
      </div>
    </div>
  );
}

IngredientsList.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.string),
  weight: PropTypes.arrayOf(PropTypes.string),
}.isRequired;

export default IngredientsList;
