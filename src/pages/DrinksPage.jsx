import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';

const DRINKS_NUMBER_PAGE = 12;

export default function DrinksPage() {
  const [drinks, setDrinks] = useState([]);
  // console.log(foods);

  const requestDrinks = async () => {
    const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(DRINKS_URL);
    const resolve = await response.json();
    // console.log(resolve);
    setDrinks(resolve.drinks.slice(0, DRINKS_NUMBER_PAGE));
  };

  useEffect(() => {
    requestDrinks();
  }, []);

  // console.log(drinks);
  return (
    <div>
      <Header />
      <CategoryButtons />
      {/* { drinks.map((drink) => console.log(drink))} */}
      {
        drinks.map(({ idDrink, strDrinkThumb, strDrink }, index) => (
          <div key={ idDrink } data-testid={ `${index}-recipe-card` }>
            <p data-testid={ `${index}-card-name` }>{strDrink}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ strDrinkThumb }
              alt={ strDrink }
              style={ { width: '25%',
                margin: '20px 5px',
                display: 'flex',
                justifyContent: 'space-around' } }
            />
          </div>
        ))
      }
      <Footer />
    </div>
  );
}
