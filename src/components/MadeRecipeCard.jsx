import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MadeRecipeCard({ recipeData, index }) {
  const { idMeal, idDrink, strMealThumb, strArea, strCategory, strMeal,
    date, type, strAlcoholic, strDrink, strDrinkThumb } = recipeData;

  function renderMeal() {
    return (
      <>
        <div className="done-recipe-card">
          <Link to={ `/comidas/${idMeal}` }>
            <img
              src={ strMealThumb }
              alt="done recipe"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <div>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${strArea} - ${strCategory}` }
            </p>
            <Link to={ `/${type}s/${idMeal}` }>
              <h4 data-testid={ `${index}-horizontal-name` }>{ strMeal }</h4>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { `Done at: ${date}` }
            </p>
          </div>
        </div>
        ;
      </>
    );
  }

  function renderDrink() {
    return (
      <>
        <div className="done-recipe-card">
          <Link to={ `/bebidas/${idDrink}` }>
            <img
              src={ strDrinkThumb }
              alt="done recipe"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <div>
            <p data-testid={ `${index}-horizontal-top-text` }>
              { `${strDrink} - ${strAlcoholic}` }
            </p>
            <Link to={ `/${type}s/${idDrink}` }>
              <h4 data-testid={ `${index}-horizontal-name` }>{ strDrink }</h4>
            </Link>
            <p data-testid={ `${index}-horizontal-done-date` }>
              { `Done at: ${date}` }
            </p>
          </div>
        </div>
        ;
      </>
    );
  }

  return (
    <div>
      { type === 'Meal' ? renderMeal() : renderDrink() }
    </div>
  );
}

MadeRecipeCard.propTypes = {
  recipeData: PropTypes.objectOf(PropTypes.any).isRequired,
  index: PropTypes.number.isRequired,
};

export default MadeRecipeCard;
