import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DrinkContext from './DrinkContext';

export default function DrinkProvider({ children }) {
  const [searchDrink, setSearchDrink] = useState('');
  const [fetchedDrinks, setFetchedDrinks] = useState('');

  const URL = `https://www.thecocktaildb.com/api/json/v1/1/${searchDrink}`;

  async function fetchDrinks() {
    try {
      const response = await fetch(URL);
      const resolve = await response.json();
      setFetchedDrinks(resolve);
    } catch (error) {
      global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
      return error;
    }
  }

  const ContextGlobal = {
    searchDrink,
    setSearchDrink,
    fetchDrinks,
    fetchedDrinks,
  };

  return (
    <main>
      <DrinkContext.Provider value={ ContextGlobal }>
        { children }
      </DrinkContext.Provider>
    </main>
  );
}

DrinkProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
