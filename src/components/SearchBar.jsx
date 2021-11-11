import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import DrinkContext from '../context/DrinkContext';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('ingredient');

  const {
    setSearchFood,
    fetchComidas,
  } = useContext(RecipeContext);

  const {
    setSearchDrink,
    fetchDrinks,
  } = useContext(DrinkContext);

  // find location (http)
  const { pathname } = useLocation();
  const path = pathname.split('/')[1];
  const title = path[0].toUpperCase() + path.substr(1);

  function checkFood() {
    if (radioValue === 'ingredient') {
      setSearchFood(`filter.php?i=${inputValue}`);
    }

    if (radioValue === 'name') {
      setSearchFood(`search.php?s=${inputValue}`);
    }

    if (radioValue === 'firstLetter') {
      if (inputValue.length > 1 && radioValue === 'firstLetter') {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        setSearchFood(`search.php?f=${inputValue}`);
      }
    }
  }

  function checkDrink() {
    if (radioValue === 'ingredient') {
      setSearchDrink(`filter.php?i=${inputValue}`);
    }

    if (radioValue === 'name') {
      setSearchDrink(`search.php?s=${inputValue}`);
    }

    if (radioValue === 'firstLetter') {
      if (inputValue.length > 1 && radioValue === 'firstLetter') {
        global.alert('Sua busca deve conter somente 1 (um) caracter');
      } else {
        setSearchDrink(`search.php?f=${inputValue}`);
      }
    }
  }

  function checkURL() {
    if (title === 'Comidas') {
      checkFood();
    } else if (title === 'Bebidas') {
      checkDrink();
    }
  }

  function handleInputChange({ target }) {
    setInputValue(target.value);
    checkURL();
  }

  function handleRadioChange({ target }) {
    setRadioValue(target.value);
    checkURL();
  }

  async function handleClickBuscar() {
    checkURL();
    if (title === 'Comidas') {
      await fetchComidas();
    } else if (title === 'Bebidas') {
      await fetchDrinks();
    }
  }

  useEffect(() => {
    checkURL();
  });

  return (
    <>
      <input
        type="text"
        data-testid="search-input"
        name="search"
        placeholder="Buscar Receita"
        value={ inputValue }
        onChange={ handleInputChange }
      />

      <label htmlFor="ingredient">
        Ingredientes
        <input
          type="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleRadioChange }
          value="ingredient"
          name="radio-search"
        />
      </label>
      <label htmlFor="name">
        Nome
        <input
          type="radio"
          id="name"
          data-testid="name-search-radio"
          value="name"
          onChange={ handleRadioChange }
          name="radio-search"
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra
        <input
          type="radio"
          id="first-letter"
          firstLetter
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ handleRadioChange }
          name="radio-search"
        />
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickBuscar }
      >
        Buscar
      </button>
    </>
  );
}
