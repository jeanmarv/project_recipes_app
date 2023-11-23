import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import fetchIngredient from '../services/fetchIngredient';
import FavoriteHeart from './FavoriteHeart';
import RecipeContext from '../context/RecipeContext';
import CopyToClipboardFunc from './CopyToClipboard';
// https://www.npmjs.com/package/react-copy-to-clipboard
import fetchRecipeID from '../services/fetchRecipeID';
import '../css/continuarReceita.css'
import youtube from "../images/youtube.png";

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
        console.log(urlRecipes[typeObj])
        urlRecipes[typeObj]
          .map(({ strMealThumb,
            strDrinkThumb,
            strCategory,
            strMeal, strDrink,
            strAlcoholic,
            idDrink,
            idMeal,
            strTags,
            strArea }) => setRecipeInProgress([...recipeDone,
            {
              idDrink,
              idMeal,
              strMealThumb,
              strDrinkThumb,
              strCategory,
              strMeal,
              strDrink,
              strAlcoholic,
              strTags,
              strArea,
              date: '23/06/2020',
              type: clipBoard.type,

            },
          ]));
      }
    };

    setInProgress();
  }, [urlRecipes, setRecipeInProgress]);

  const [countChecked, setCountChecked] = useState(0);
  function counterChecked({ target }) {
    return target.checked
      ? setCountChecked(countChecked + 1) : setCountChecked(countChecked - 1);
  }

  return (
    <div className="main-progress">
      {
        urlRecipes[typeObj]
          && urlRecipes[typeObj].map((item, index) => (
            <div>
              <div className="card-n-share">
                <div className="pic-name">
                  <img
                    data-testid="recipe-photo"
                    src={ URL_PAGE_NAME === 'comidas'
                      ? item.strMealThumb : item.strDrinkThumb }
                    alt="foto da receita"
                  />
                  <h2 data-testid="recipe-title">
                    { URL_PAGE_NAME === 'comidas' ? item.strMeal : item.strDrink }
                  </h2>
                  <p data-testid="recipe-category">
                    { URL_PAGE_NAME === 'comidas'
                      ? item.strCategory
                      : `${item.strCategory} - ${item.strAlcoholic}`}
                  </p>
                </div>
                <div className="socials-finish">
                  <div className="share-favorite">
                    { linkCopied ? 'Link Copiado!' : null }
                    <CopyToClipboardFunc
                      recipe={ clipBoard }
                      index={ index }
                      inProgress="/in-progress"
                    />

                    <FavoriteHeart />

                    <a data-testid="videoo" className="youtube-button" href={ item.strYoutube }>
                      <img src={ youtube } alt="Youtubeicon" />
                    </a>
                  </div>

                  <Link to="/receitas-feitas">
                    <button
                      className="finish-buttom"
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
              </div>

              <div>
                <h3>Ingredients</h3>
                <ul>
                  {
                    listIngredients.map((ingredient, i) => (
                      <li data-testid={ `${i}-ingredient-step` }>
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
            </div>
          ))
      }
    </div>
  );
}
