import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header2 from '../components/Header2';
import '../css/explore.css';

export default function ExploreDrinks() {
  const history = useHistory();

  function handleClick() {
    return fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then((response) => response.json())
      .then((res) => res.drinks)
      .then((res) => history.push(`/bebidas/${res[0].idDrink}`));
  }

  return (
    <>
      <Header2 />
      <div className="explore-main-div">
        <button
          onClick={ () => history.push('/explorar/bebidas/ingredientes') }
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </>
  );
}
