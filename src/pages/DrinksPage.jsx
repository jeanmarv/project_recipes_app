import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';
import CardsFoodDrink from '../components/CardsFoodDrink';
import RecipeContext from '../context/RecipeContext';
import { apiFoodsEndDrinks } from '../services/fetchApi';
import CardSearch from '../components/CardSearch';
import DrinkContext from '../context/DrinkContext';
import '../css/main.css';

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

  const {
    fetchedDrinks,
  } = useContext(DrinkContext);

  function mapDefaultDrinks() {
    return (
      data !== null ? data
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
        )) : null
    );
  }

  return (
    <div>
      <Header />
      <CategoryButtons />
      <div className="main-card-div">
        { fetchedDrinks.drinks ? <CardSearch /> : mapDefaultDrinks() }
      </div>
      <Footer />
    </div>
  );
}
