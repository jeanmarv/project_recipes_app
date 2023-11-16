import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router';
import '../css/ingredient.css';

export default function IngredientsCard({ name, index }) {
  const history = useHistory();
  const { location: { pathname } } = history;
  const webSiteCheck = pathname.includes('bebidas') ? 'thecocktaildb' : 'themealdb';
  const src = `https://www.${webSiteCheck}.com/images/ingredients/${name}-Small.png`;

  return (
    <button
      onClick={ () => history.push('/comidas') }
      type="button"
      data-testid={ `${index}-ingredient-card` }
      className="ingredient-card"
    >
      <p data-testid={ `${index}-card-name` }>{name}</p>
      <img
        alt="imagem de ingrediente"
        data-testid={ `${index}-card-img` }
        src={ src }
      />
    </button>
  );
}

IngredientsCard.propTypes = {
  index: PropTypes.any,
  name: PropTypes.any,
}.isRequired;
