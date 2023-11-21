import React, { useContext, useState, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';
import whiteHeartIcon from '../images/whiteHeartIcon.png';
import blackHeartIcon from '../images/blackHeartIcon.png';
import { useLocation } from 'react-router';
import '../css/recipeDetails.css';
import fetchRecipeID from '../services/fetchRecipeID';

export default function FavoriteHeart() {
  const { pathname } = useLocation();
  const url = pathname;
  const URL_PAGE_NAME = url.split('/')[1];
  const URL_RECIPE_ID = url.split('/')[2];

  const { favoriteHeart, setFavoriteHeart } = useContext(RecipeContext);
  const { fetchComidas } = useContext(RecipeContext);
  const [urlRecipes, setUrlRecipes] = useState([]);
  const [clipBoard, setClipBoard] = useState({ id: 0, type: '' });
  const [typeObj, setTypeObj] = useState('');
  const { recipeFavorite, setrecipeFavorite } = useContext(RecipeContext);

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
    const setInProgress = () => {
      let recipeDone = '';
      if (localStorage.getItem('favoriteRecipes')) {
        recipeDone = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
            strArea }) => setrecipeFavorite([...recipeDone,
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
  }, [urlRecipes, setrecipeFavorite]);
  
  async function handleClickFavorite() {
    if (favoriteHeart === true) {
      setFavoriteHeart(false);
      localStorage.setItem( 'favoriteRecipes', JSON.stringify(recipeFavorite))
      console.log(`upando isso para o localstorage${recipeFavorite}`)
    } else {
      setFavoriteHeart(true);
      localStorage.setItem( 'favoriteRecipes', JSON.stringify(recipeFavorite))
      console.log(`upando isso para o localstorage${recipeFavorite}`)
    }
    console.log(`este é o que estou recebendo ${fetchComidas}`)
    // console.log(`este é o que estou recebendo em fav heart${favoriteHeart}`)
  }

  return (
    <button
      data-testid="favorite-btn"
      className="favorite-btn"
      type="button"
      onClick={ () => handleClickFavorite() }
    >
      <img
        src={ favoriteHeart === true ? blackHeartIcon : whiteHeartIcon }
        alt="favoritas"
      />
    </button>
  );
}

// import React, { useContext, useEffect } from 'react';
// import RecipeContext from '../context/RecipeContext';
// import whiteHeartIcon from '../images/whiteHeartIcon.png';
// import blackHeartIcon from '../images/blackHeartIcon.png';
// import '../css/recipeDetails.css';

// export default function FavoriteHeart() {
//   const { favoriteHeart, setFavoriteHeart, favoriteRecipe, setFavoriteRecipe } = useContext(RecipeContext);

//   // UseEffect para verificar se o id da receita está presente no local storage ao renderizar o componente
//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
//     setFavoriteRecipe(storedFavorites);
//   }, [setFavoriteRecipe]);

//   // Função para manipular o clique no botão
//   function handleClickFavorite() {
//     const updatedFavorites = [...favoriteRecipe];

//     if (favoriteHeart === true) {
//       // Remover a receita do local storage e do estado
//       const indexToRemove = updatedFavorites.findIndex((recipe) => recipe.id === 'ID_DA_RECEITA');
//       updatedFavorites.splice(indexToRemove, 1);
//     } else {
//       // Adicionar a receita ao local storage e ao estado
//       updatedFavorites.push({ id: 'ID_DA_RECEITA', otherData: 'OUTRAS_INFORMACOES' });
//     }

//     localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
//     setFavoriteRecipe(updatedFavorites);
//     setFavoriteHeart(!favoriteHeart);
//   }

//   return (
//     <button
//       data-testid="favorite-btn"
//       className="favorite-btn"
//       type="button"
//       onClick={() => handleClickFavorite()}
//     >
//       <img
//         src={favoriteHeart === true ? blackHeartIcon : whiteHeartIcon}
//         alt="favoritas"
//       />
//     </button>
//   );
// }

// import React, { useContext } from 'react';
// import RecipeContext from '../context/RecipeContext';
// import whiteHeartIcon from '../images/whiteHeartIcon.png';
// import blackHeartIcon from '../images/blackHeartIcon.png';
// import '../css/recipeDetails.css';

// export default function FavoriteHeart() {
//   const { favoriteHeart, setFavoriteHeart } = useContext(RecipeContext);
//   const { fetchComidas } = useContext(RecipeContext);

//   async function handleClickFavorite() {
//     if (favoriteHeart === true) {
//       setFavoriteHeart(false);
//       // localStorage.setItem( 'favoriteRecipes', JSON.stringify());
//     } else {
//       setFavoriteHeart(true);
//     }
//     console.log(`este é o que estou recebendo ${fetchComidas}`)
//     // console.log(`este é o que estou recebendo em fav heart${favoriteHeart}`)
//   }
  
//   return (
//     <button
//       data-testid="favorite-btn"
//       className="favorite-btn"
//       type="button"
//       onClick={ () => handleClickFavorite() }
//     >
//       <img
//         src={ favoriteHeart === true ? blackHeartIcon : whiteHeartIcon }
//         alt="favoritas"
//       />
//     </button>
//   );
// }