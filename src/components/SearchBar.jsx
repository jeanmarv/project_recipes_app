import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';
import DrinkContext from '../context/DrinkContext';
import '../css/searchbar.css';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('ingredient');
  const [btnBuscarClicked, setbtnBuscarClicked] = useState('false');
  const history = useHistory();
  const notFound = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';

  const {
    setSearchFood,
    fetchComidas,
    fetchedComidas,
  } = useContext(RecipeContext);

  const {
    setSearchDrink,
    fetchDrinks,
    fetchedDrinks,
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
      if (inputValue.length > 1
        && radioValue === 'firstLetter'
        && btnBuscarClicked === true) {
        setbtnBuscarClicked(false);
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
      if (inputValue.length > 1
        && radioValue === 'firstLetter'
        && btnBuscarClicked === true) {
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
  }

  function handleRadioChange({ target }) {
    setRadioValue(target.value);
  }

  function foodPage() {
    if (fetchedComidas) {
      if (fetchedComidas.meals === null || fetchedComidas.meals.lenght === 0) {
        global.alert(notFound);
      } else if (fetchedComidas.meals.length === 1) {
        history.push(`/comidas/${fetchedComidas.meals[0].idMeal}`);
      }
    }
  } // '' false ; [] true ; {}

  function drinksPage() {
    if (fetchedDrinks.drinks) {
      console.log('dentro do if 1111111', fetchedDrinks.drinks);
      if (fetchedDrinks.drinks && fetchedDrinks.drinks.length === 1) {
        console.log('dentro do if 2', fetchedDrinks.drinks);
        history.push(`/bebidas/${fetchedDrinks.drinks[0].idDrink}`);
      }
    } else { global.alert(notFound); }
  }

  useEffect(() => {
    foodPage();
  }, [fetchedComidas]);

  useEffect(() => {
    if (fetchedDrinks) drinksPage();
  }, [fetchedDrinks]);

  async function handleClickBuscar() {
    setbtnBuscarClicked(true);
    if (title === 'Comidas') {
      await fetchComidas();
    } else if (title === 'Bebidas') {
      if (inputValue === '') {
        global.alert(notFound);
      } else {
        await fetchDrinks();
      }
    }
  }

  useEffect(() => {
    checkURL();
  }, [handleInputChange, handleRadioChange]);

  return (
    <div id="search-bar">
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
    </div>
  );
}
