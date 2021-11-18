import React, { useContext, useState, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';
import DrinkContext from '../context/DrinkContext';

const NUMBER_TWELVE = 12;

export default function CardSearch() {
  const [firstFoods, setFirstFoods] = useState([]);
  const [firstDrinks, setFirstDrinks] = useState([]);

  const {
    fetchedFoods,
  } = useContext(RecipeContext);

  const {
    fetchedDrinks,
  } = useContext(DrinkContext);

  useEffect(() => {
    if (fetchedFoods.meals) {
      setFirstFoods(fetchedFoods.meals.slice(0, NUMBER_TWELVE));
      setFirstDrinks([]);
    }
  }, [fetchedFoods]);

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
          >
            <span
              data-testid={ `${index}-card-name` }
            >
              { food.strMeal }
            </span>
            <img
              data-testid={ `${index}-card-img` }
              alt={ food.strMeal }
              src={ food.strMealThumb }
              style={ { width: '25%', margin: '5px 0.5px' } }
            />
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
          >
            <span
              data-testid={ `${index}-card-name` }
            >
              { drink.strDrink }
            </span>
            <img
              data-testid={ `${index}-card-img` }
              alt={ drink.strDrink }
              src={ drink.strDrinkThumb }
              style={ { width: '25%', margin: '5px 0.5px' } }
            />
          </div>
        ))
      );
    }
  }

  return (
    <>
      { mapFoods() }
      { mapDrinks() }
    </>
  );
}
