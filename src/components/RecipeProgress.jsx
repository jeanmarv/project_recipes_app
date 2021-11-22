import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import fetchIngredient from '../services/fetchIngredient';
import FavoriteHeart from './FavoriteHeart';
import RecipeContext from '../context/RecipeContext';
import CopyToClipboardFunc from './CopyToClipboard';
// https://www.npmjs.com/package/react-copy-to-clipboard
import fetchRecipeID from '../services/fetchRecipeID';

export default function RecipeProgress() {
  const { pathname } = useLocation();
  const url = pathname;
  const URL_PAGE_NAME = url.split('/')[1];
  const URL_RECIPE_ID = url.split('/')[2];

  const [typeObj, setTypeObj] = useState(''); // tipo de receita, comida ou bebida
  const [urlRecipes, setUrlRecipes] = useState([]);
  // console.log(urlRecipes);
  const [clipBoard, setClipBoard] = useState({ id: 0, type: '' }); // copia id e type do item na page
  // console.log(clipBoard);
  const [listIngredients, setListIngredients] = useState([]); // trás os ingredientes
  const [quantity, setQuantity] = useState([]); // trás a quantidade de cada ingrediente
  const { recipeInProgress, setRecipeInProgress, linkCopied } = useContext(RecipeContext);

  useEffect(() => {
    setTypeObj(url.includes('/comidas') === true ? 'meals' : 'drinks');
    setClipBoard(url.includes('/comidas') === true
      ? { id: URL_RECIPE_ID, type: 'Meal' }
      : { id: URL_RECIPE_ID, type: 'Drink' });

    const fetchId = async () => {
      await fetchRecipeID(URL_RECIPE_ID, setUrlRecipes);
    };
    fetchId();
  }, []);

  useEffect(() => {
    fetchIngredient(urlRecipes, typeObj, setListIngredients, setQuantity);
    setRecipeInProgress(urlRecipes[typeObj]);
  }, [typeObj, urlRecipes]);

  useEffect(() => {
    const setInProgress = () => {
      let recipeDone = '';
      if (localStorage.getItem('doneRecipes')) {
        recipeDone = JSON.parse(localStorage.getItem('doneRecipes'));
      }

      if (urlRecipes[typeObj]) {
        urlRecipes[typeObj]
          .map(({ idMeal }) => setRecipeInProgress([...recipeDone,
            // Modificar obj e chaves pra salvar no local storage
              {
                id: idMeal,
            }
          ]));
      }
    };

    setInProgress();
  }, [urlRecipes, setRecipeInProgress]);

  const [countChecked, setCountChecked] = useState(0);
  function counterChecked({target}) {
    return target.checked ? setCountChecked(countChecked + 1) : setCountChecked(countChecked - 1);
  }

  return (
    <div>
      {
        urlRecipes[typeObj]
          && urlRecipes[typeObj].map((item, index) => (
            <div key={ index }>
              <img
                data-testid="recipe-photo"
                src={ URL_PAGE_NAME === 'comidas' ? item.strMealThumb : item.strDrinkThumb }
                alt="foto da receita"
              />
              <h2 data-testid="recipe-title">
                { URL_PAGE_NAME === 'comidas' ? item.strMeal : item.strDrink }
              </h2>
              <p data-testid="recipe-category">
                { URL_PAGE_NAME === 'comidas' ? item.strCategory : `${item.strCategory} - ${item.strAlcoholic}`}
              </p>

              <div data-testid="share-btn">
                { linkCopied ? 'Link Copiado!' : null }
                <CopyToClipboardFunc
                  recipe={ clipBoard }
                  index={ index }
                  inProgress="/in-progress"
                />
              </div>
              
              <FavoriteHeart />

              <div>
                <h3>Ingredients</h3>
                <ul>
                  {
                    listIngredients.map((ingredient, i) => (
                      <li data-testid={ `${i}-ingredient-step` } key={ i }>
                        <input
                          onClick={ counterChecked }

                          value={ ingredient }
                          type="checkbox"
                        />
                        <span>
                          { ingredient }
                          { ' - ' }
                          { quantity[i] }
                        </span>
                      </li>
                    ))
                  }
                </ul>
              </div>

              <h3>Instructions</h3>
              <p data-testid="instructions">{ item.strInstructions }</p>
              <Link to="/receitas-feitas">

                <button
                  disabled={ countChecked !== listIngredients.length }
                  type="button"
                  data-testid="finish-recipe-btn"
                  onClick={ () => {
                    localStorage.setItem(
                      'doneRecipes',
                      JSON.stringify(recipeInProgress),
                    );
                  } }
                >
                  Finalizar receita
                </button>
              </Link>
            </div>
          ))
      }
    </div>
  );
}
