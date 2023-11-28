import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import RecipeContext from '../context/RecipeContext';
import { apiFoodsEndDrinks } from '../services/fetchApi';
import '../css/categoryButton.css';

const FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const NUMERO_BUTTONS = 5;

export default function CategoryButtons() {
  const { pathname } = useLocation();
  const url = pathname.split('/')[1];
  const [category, setCategory] = useState([]); /* botão de categorias, 5 botões */
  const [toggle, setToggle] = useState(false);
  const [nameCategory, setNameCategory] = useState(''); /* armazenar nome da categoria escolhida através do click do botão */
  const { setData } = useContext(RecipeContext);
  // const { setDataDrink } = useContext(DrinkContext);

  const categoryButton = async () => {
    if (url === 'comidas') {
      const api = await apiFoodsEndDrinks(FOOD_URL, true);
      setCategory(api.slice(0, NUMERO_BUTTONS));
    } else {
      const api = await apiFoodsEndDrinks(DRINKS_URL, false);
      setCategory(api.slice(0, NUMERO_BUTTONS, false));
    }
  };

  useEffect(() => {
    categoryButton();
  }, []); // deixar sem o array faz o código renderizar infinitamente

  async function handleAllApi() {
    let resultApi = [];
    if (url === 'comidas') {
      resultApi = await apiFoodsEndDrinks('https://www.themealdb.com/api/json/v1/1/filter.php?i', true);
    } else {
      resultApi = await apiFoodsEndDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', false);
    }
    setData(resultApi);
    setToggle(false);
  }

  async function handleCategoryApi(target) {
    const FOOD_CATEGORY = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.id}`;
    const DRINKS_CATEGORY = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.id}`;
    let API = '';

    if (url === 'comidas') {
      API = await apiFoodsEndDrinks(FOOD_CATEGORY, true);
    } else {
      API = await apiFoodsEndDrinks(DRINKS_CATEGORY, false);
    }
    setData(API);
  }

  async function handleClickCategory({ target }) {
    setToggle(true);
    if (nameCategory === target.id && toggle) {
      handleAllApi();
    } else {
      handleCategoryApi(target);
    }
    setNameCategory(target.id);
  }

  return (
    <div className="category-buttons">
      <button
        type="button"
        onClick={ handleAllApi }
        data-testid="All-category-filter"
        className="one-button"
      >
        All
      </button>
      {category.map(({ strCategory }) => (
        <button
          type="button"
          id={ strCategory }
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          onClick={ (target) => handleClickCategory(target) }
          className="two-button"
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}
