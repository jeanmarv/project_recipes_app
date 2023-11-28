import React from 'react';
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
      <a data-testid="food-bottom-btn" href="/comidas">
        <img src={ mealIcon } alt="Icone de comida" />
      </a>
    </footer>
  );
}
