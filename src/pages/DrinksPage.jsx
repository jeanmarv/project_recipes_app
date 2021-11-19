import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';
import CardsFoodDrink from '../components/CardsFoodDrink';
import RecipeContext from '../context/RecipeContext';
import { apiFoodsEndDrinks } from '../services/fetchApi';

const DRINKS_NUMBER_PAGE = 12;

// me apague

export default function DrinksPage() {
  const { data, setData } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const page = pathname.split('/')[1];

  async function initialPageDrink() {
    const resultDrinkApi = await apiFoodsEndDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', false);
    setData(resultDrinkApi);
  }

  useEffect(() => {
    initialPageDrink();
  }, []);

  return (
    <div>
      <Header />
      <CategoryButtons />
      {data !== null ? data
        .slice(0, DRINKS_NUMBER_PAGE)
        .map(({ idDrink, strDrink, strDrinkThumb }, index) => (
          <CardsFoodDrink
            key={ idDrink }
            src={ strDrinkThumb }
            name={ strDrink }
            indexID={ index }
            id={ idDrink }
            path={ page }
          />
        )) : null }

      <Footer />
    </div>
  );
}
