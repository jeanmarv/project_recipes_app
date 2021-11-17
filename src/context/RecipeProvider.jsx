import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipeContext from './RecipeContext';

export default function RecipeProvider({ children }) {
  const [searchFood, setSearchFood] = useState('');
  const [fetchedComidas, setFetchedComidas] = useState('');

  const [drinkState, setDrinkState] = useState([]);
  const [foodCategory, setFoodCategory] = useState([]);
  const [drinkCategory, setDrinkCategory] = useState([]);

  const [data, setData] = useState([]);
  const [recipeInProgress, setRecipeInProgress] = useState([]);
  const [linkCopy, setlinkCopy] = useState(false);
  const [nameCategory, setNameCategory] = useState('');

  const URL = `https://www.themealdb.com/api/json/v1/1/${searchFood}`;

  async function fetchComidas() {
    try {
      const response = await fetch(URL);
      const resolve = await response.json();
      setFetchedComidas(resolve);
      return fetchedComidas;
    } catch (error) {
      return error;
    }
  }

  const ContextGlobal = {
    searchFood,
    setSearchFood,
    fetchComidas,
    fetchedComidas,

    drinkState,
    setDrinkState,
    foodCategory,
    setFoodCategory,
    drinkCategory,
    setDrinkCategory,

    data,
    setData,
    recipeInProgress,
    setRecipeInProgress,
    linkCopy,
    setlinkCopy,
    nameCategory,
    setNameCategory,
  };

  return (
    <main>
      <RecipeContext.Provider value={ ContextGlobal }>
        { children }
      </RecipeContext.Provider>
    </main>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
