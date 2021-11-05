import PropTypes from 'prop-types';
import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer({ history }) {
  return (
    <footer className="footer" data-testid="footer">
      <input
        data-testid="drinks-bottom-btn"
        type="image"
        onClick={ () => history.push('/bebidas') }
        src={ drinkIcon }
        alt="Icone de bebida"
      />
      <input
        data-testid="explore-bottom-btn"
        type="image"
        onClick={ () => history.push('/explorar') }
        src={ exploreIcon }
        alt="Icone de explorar"
      />
      <input
        data-testid="food-bottom-btn"
        type="image"
        onClick={ () => history.push('/comidas') }
        src={ mealIcon }
        alt="Icone de comida"
      />
    </footer>
  );
}

Footer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
