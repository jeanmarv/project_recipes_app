import React, { useCallback, useContext, useState } from 'react';
import RecipeContext from '../context/RecipeContext';

export default function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const [radioValue, setRadioValue] = useState('ingredient');

  const {
    setSearchFood,
    fetchComidas,
    fetchedComidas,
    searchFood } = useContext(RecipeContext);

  function checkURL(radioValueTarget) {
    console.log('inputValue', inputValue);
    if (radioValueTarget === 'ingredient') {
      setSearchFood(`filter.php?i=${inputValue}`);
    }

    if (radioValueTarget === 'name') {
      setSearchFood(`search.php?s=${inputValue}`);
    }

    if (radioValueTarget === 'firstLetter') {
      setSearchFood(`search.php?f=${inputValue}`);
    }
    console.log('searchFood', searchFood);
  }

  function handleInputChange({ target }) {
    setInputValue(target.value);
    checkURL(target.value);
  }

  const handleRadioChange = useCallback(({ target }) => {
    setRadioValue(target.value);
  }, []);

  async function handleClickBuscar() {
    if (inputValue.length > 1 && radioValue === 'firstLetter') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    await fetchComidas();
    console.log(fetchedComidas);
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
