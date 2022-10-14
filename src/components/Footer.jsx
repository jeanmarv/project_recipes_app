import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '..css/footer.css';

export default function Footer() {
  const history = useHistory();
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
