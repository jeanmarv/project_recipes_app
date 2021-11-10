import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import RecipeContext from './RecipeContext';

export default function RecipeProvider({ children }) {
  const [searchFood, setSearchFood] = useState('');
  const [fetchedComidas, setFetchedComidas] = useState('');

  const URL = `https://www.themealdb.com/api/json/v1/1/${searchFood}`;

  async function fetchComidas() {
    console.log('passou fetchComidas()');
    try {
      const response = await fetch(URL);
      const resolve = await response.json();
      setFetchedComidas(resolve);
      console.log('URL', URL);
      console.log('retorno da API', fetchedComidas);
      return fetchedComidas;
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    if (searchFood !== '') {
      console.log(searchFood);
      fetchComidas();
    }
  }, []);

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
