import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';

const FOOD_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const NUMERO_BUTTONS = 5;

export default function CategoryButtons() {
  const { pathname } = useLocation();
  const url = pathname.split('/')[1];
  const [category, setCategory] = useState([]); /* botão de categorias, 5 botões */
  const [dataApi, setDataApi] = useState([]); /* botão All */
  // const [toggle, setToggle] = useState(false);
  // const [nameCategory, setNameCategory] = useState(''); /* armazenar nome da categoria escolhida através do click do botão */

  const requestCategoryButton = async () => {
    if (url === 'comidas') {
      const response = await fetch(FOOD_URL);
      const resolve = await response.json();
      // console.log(resolve.meals);
      setCategory(resolve.meals.slice(0, NUMERO_BUTTONS));
    } else {
      const response = await fetch(DRINKS_URL);
      const resolve = await response.json();
      // console.log(resolve.drinks);
      setCategory(resolve.drinks.slice(0, NUMERO_BUTTONS));
    }
  };

  useEffect(() => {
    requestCategoryButton();
  });

  async function setButtonAllApi() {
    if (url === 'comidas') {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=');
      const resolve = await response.json();
      setDataApi(resolve.meals);
    } else {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=');
      const resolve = await response.json();
      setDataApi(resolve.drinks);
    }
  }

  // async function handleClickCategory({ target }) {
  //   setToggle(true);
  //   if (nameCategory === target.id && toggle) {
  //     setResultApi();
  //   } else {
  //     setApiByCategory(target);
  //   }
  //   setNameCategory(target.id);
  // }
  console.log(dataApi);
  return (
    <div>
      <button
        type="button"
        onClick={ setButtonAllApi }
        data-testid="All-category-filter"
        style={ { width: '25%', margin: '5px 0.5px' } }
      >
        All
      </button>
      {category.map(({ strCategory }) => (
        <button
          type="button"
          key={ strCategory }
          data-testid={ `${strCategory}-category-filter` }
          style={ { width: '25%', margin: '5px 0.5px' } }
        // onClick={ (target) => handleClickCategory(target) } Selecionar categoria do botão
        >
          {strCategory}
        </button>
      ))}
    </div>
  );
}
