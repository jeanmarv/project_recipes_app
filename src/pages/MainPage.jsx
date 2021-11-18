import React, { useState, useEffect, useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';
import CardSearch from '../components/CardSearch';

const FOODS_NUMBER_PAGE = 12;

export default function MainPage() {
  const [foods, setFoods] = useState([]);
  // console.log(foods);

  const FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const requestFoods = async () => {
    const response = await fetch(FOOD_URL);
    const resolve = await response.json();
    // console.log(resolve);
    setFoods(resolve.meals.slice(0, FOODS_NUMBER_PAGE));
  };

  useEffect(() => {
    requestFoods();
  }, []);

  const {
    fetchedFoods,
  } = useContext(RecipeContext);

  function mapDefaultFoods() {
    return (
      foods.map(({ idMeal, strMealThumb, strMeal }, index) => (
        <div key={ idMeal } data-testid={ `${index}-recipe-card` }>
          <p data-testid={ `${index}-card-name` }>{strMeal}</p>
          <img
            data-testid={ `${index}-card-img` }
            src={ strMealThumb }
            alt={ strMeal }
            style={ { width: '25%',
              margin: '20px 5px',
              display: 'flex',
              justifyContent: 'space-around' } }
          />
        </div>
      ))
    );
  }

  // console.log(foods);
  return (

    <div>
      <Header />
      <CategoryButtons />
      { fetchedFoods.meals ? <CardSearch /> : mapDefaultFoods() }
      <Footer />
    </div>
  );
}
