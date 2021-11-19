import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import fetchRecipeID from '../services/fetchRecipeID';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecommendedDetail from './RecommendedDetail';
import './Footer.css';
import RecipeContext from '../context/RecipeContext';
import CopyToClipboardFunc from './CopyToClipboard';
// https://www.npmjs.com/package/react-copy-to-clipboard

export default function RecipeDetails() {
  const { pathname } = useLocation();
  const urlID = pathname.split('/')[2];
  const urlName = pathname.split('/')[1];

  const [pathKey, setPathKey] = useState('');
  // const [recipeStatus] = useState(false);
  const [urlRecipe, setUrlRecipe] = useState([]);
  const filteredIngredient = [];
  const filteredQuantity = [];
  const [clipBoard] = useState({ id: 0, type: '' });
  const { linkCopied } = useContext(RecipeContext);

  if (urlRecipe[pathKey]) {
    const recipeArray = Object.entries(urlRecipe[pathKey][0]);

    const fetchIngredient = () => {
      const ingredientsArray = recipeArray
        .filter((item) => item[0]
          .includes('strIngredient'));
      ingredientsArray.filter((item) => filteredIngredient.push(item[1]));

      const quantityArray = recipeArray
        .filter((item) => item[0]
          .includes('strMeasure'));
      quantityArray.filter((item) => filteredQuantity.push(item[1]));
    };
    fetchIngredient();
  }

  useEffect(() => {
    setPathKey(pathname.includes('/comidas') === true ? 'meals' : 'drinks');
    const fetchId = async () => {
      await fetchRecipeID(urlID, setUrlRecipe);
    };
    fetchId();
  }, []);

  return (
    <div>
      { urlRecipe[pathKey] && urlRecipe[pathKey].map((item, index) => (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            alt="imagem da receita"
            src={ urlName === 'comidas' ? item.strMealThumb : item.strDrinkThumb }
            style={ { width: '10%',
              margin: '20px 5px',
              display: 'flex',
              justifyContent: 'space-around' } }
          />
          <h1
            data-testid="recipe-title"
          >
            { urlName === 'comidas' ? item.strMeal : item.strDrink }
          </h1>

          <h5 data-testid="recipe-category">
            { urlName === 'bebidas' ? `${item.strAlcoholic}` : item.strCategory}
          </h5>

          {/* falta corrigir lógica, não está copiando link correto */}
          <div data-testid="share-btn">
            { linkCopied ? 'Link Copiado!' : null }
            <CopyToClipboardFunc recipe={ clipBoard } index={ index } />
          </div>

          <button
            data-testid="favorite-btn"
            type="button"
          >
            <img src={ whiteHeartIcon } alt="favoritas" />
          </button>

          <div>
            <h5 data-testid="recipe-category">{ item.strCategory }</h5>
            <h4>Ingredients</h4>
            <ul>
              {
                filteredIngredient
                  .map((ingredient, i) => (
                    ingredient !== '' ? (
                      <li
                        key={ i }
                        data-testid={ `${i}-ingredient-name-and-measure` }
                      >
                        { ingredient }
                        { filteredQuantity[i] }
                      </li>) : ''))
              }
            </ul>
          </div>

          <div>
            <h5>Instructions</h5>
            <p data-testid="instructions">{ item.strInstructions }</p>

            <div>
              <a data-testid="video" href={ item.strYoutube }>VÍDEO</a>
            </div>

            <h5>Recommended</h5>
            <RecommendedDetail urlID={ urlID } urlName={ urlName } />
          </div>
        </div>
      ))}
      <Link to={ `/${urlName}/${urlID}/in-progress` }>
        <button
          className="button-recipe"
          type="button"
          data-testid="start-recipe-btn"
        >
          Iniciar Receita
        </button>
      </Link>
    </div>
  );
}
