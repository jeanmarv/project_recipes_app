import React, { useState } from 'react';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('');
  // const [filteredIngredients, setFilteredIngredients] = useState([]);

  function handleInputChange({ target }) {
    setInputValue(target.value);
  }

  function handleRadioChange({ target }) {
    setRadioValue(target.value);
    console.log(target.value);
  }

  function handleClickBuscar() {
    if (radioValue === 'ingredient') {
      // requisição filtro ingrediente
    }

    if (radioValue === 'name') {
      // requisição filtro name
    }

    if (radioValue === 'firstLetter') {
      // requisição filtro primeira letra
    }
    if (inputValue.length > 1 && radioValue === 'firstLetter') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

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
        />
      </label>
      <label htmlFor="first-letter">
        Primeira Letra
        <input
          type="radio"
          id="first-letter"
          data-testid="first-letter-search-radio"
          value="firstLetter"
          onChange={ handleRadioChange }
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
