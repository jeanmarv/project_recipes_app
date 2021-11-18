import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';
import CardsFoodDrink from '../components/CardsFoodDrink';
import { apiFoodsEndDrinks } from '../services/fetchApi';

const FOODS_NUMBER_PAGE = 12;
const FOODS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function MainPage() {
  const { data, setData } = useContext(RecipeContext);
  const { pathname } = useLocation();
  const page = pathname.split('/')[1];

  async function initialPageFood() {
    const resultFoodApi = await apiFoodsEndDrinks(FOODS_URL, true);
    setData(resultFoodApi);
  }

  // me apague

  useEffect(() => {
    initialPageFood();
  }, []);

  return (

    <div>
      <Header />
      <CategoryButtons />
      {data
        .slice(0, FOODS_NUMBER_PAGE)
        .map(({ idMeal, strMeal, strMealThumb }, index) => (
          <CardsFoodDrink
            indexID={ index }
            name={ strMeal }
            src={ strMealThumb }
            id={ idMeal }
            key={ idMeal }
            path={ page }
          />
        ))}
      <Footer />
    </div>
  );
}
