import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/38706.png';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/footer.css';

export default function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <button type="button" data-testid="drinks-bottom-btn" href="/bebidas">
        <img src={ drinkIcon } alt="Icone de bebida" />
      </button>
      <a data-testid="explore-bottom-btn" href="/explorar">
        <img src={ exploreIcon } alt="Icone de explorar" />
      </a>
      <Link data-testid="food-bottom-btn" to="/comidas">
        <img src={ mealIcon } alt="Icone de comida" />
      </Link>
    </footer>
  );
}
