import PropTypes from 'prop-types';
import React, { useState } from 'react';
import RecipeContext from './RecipeContext';

export default function RecipeProvider({ children }) {
  const [searchFood, setSearchFood] = useState('');
  const [fetchedComidas, setFetchedComidas] = useState('');

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
