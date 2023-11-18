import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import DrinkContext from '../context/DrinkContext';
import "../css/searchPage.css";

const NUMBER_TWELVE = 10;

export default function CardSearch() {
  const [firstFoods, setFirstFoods] = useState([]); // antes estava firstComidas
  const [firstDrinks, setFirstDrinks] = useState([]);

  const {
    fetchedComidas,
  } = useContext(RecipeContext);

  const {
    fetchedDrinks,
  } = useContext(DrinkContext);

  useEffect(() => {
    if (fetchedComidas.meals) {
      setFirstFoods(fetchedComidas.meals.slice(0, NUMBER_TWELVE));
      setFirstDrinks([]);
    }
  }, [fetchedComidas]);

  useEffect(() => {
    if (fetchedDrinks.drinks) {
      setFirstDrinks(fetchedDrinks.drinks.slice(0, NUMBER_TWELVE));
      setFirstFoods([]);
    }
  }, [fetchedDrinks]);

  function mapFoods() {
    if (firstFoods) {
      return (
        firstFoods.map((food, index) => (
          <div
            key={ food.id }
            data-testid={ `${index}-recipe-card` }
            className="search-card"
          >
            <img
              data-testid={ `${index}-card-img` }
              alt={ food.strMeal }
              src={ food.strMealThumb }
            />
            <span data-testid={ `${index}-card-name` }>
              { food.strMeal }
            </span>


          </div>
        ))
      );
    }
  }

  function mapDrinks() {
    if (firstDrinks) {
      return (
        firstDrinks.map((drink, index) => (
          <div
            key={ drink.id }
            data-testid={ `${index}-recipe-card` }
            className="search-card"
          >
            <img
              data-testid={ `${index}-card-img` }
              alt={ drink.strDrink }
              src={ drink.strDrinkThumb }
            />
            <span
              data-testid={ `${index}-card-name` }
            >
              { drink.strDrink }
            </span>

          </div>
        ))
      );
    }
  }

  return (
    <div className="main-search-box">
      { mapFoods() }
      { mapDrinks() }
    </div>
  );
}
