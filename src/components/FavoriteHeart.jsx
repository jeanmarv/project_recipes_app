import React, { useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import RecipeContext from '../context/RecipeContext';
import whiteHeartIcon from '../images/whiteHeartIcon.png';
import blackHeartIcon from '../images/blackHeartIcon.png';
import '../css/recipeDetails.css';
import fetchRecipeID from '../services/fetchRecipeID';

export default function FavoriteHeart() {
  const { pathname } = useLocation();
  const url = pathname;
  const URL_RECIPE_ID = url.split('/')[2];

  const [favoriteHeart, setFavoriteHeart] = useState([false]);
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
        setrecipeFavorite(recipeDone);
      }
    };

    setInProgress();
  }, [urlRecipes, setrecipeFavorite]);

  async function handleClickFavorite() {
    if (favoriteHeart === true) {
      const updatedRecipes = recipeFavorite.filter((recipe) => {
        if (recipe.id === clipBoard.id) {
          return false;
        }
        return true;
      });

      setFavoriteHeart(false);
      setrecipeFavorite(updatedRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
    } else {
      if (
        !(recipeFavorite.some((objeto) => (
          Object.values(objeto).includes(clipBoard.id)
        )))) {
        setrecipeFavorite((prevState) => [
          ...prevState,
          {
            id: clipBoard.type === 'Drink' || clipBoard.type === 'Meal'
              ? clipBoard.id : null,
            strThumb: urlRecipes[typeObj][0].strDrinkThumb
              || urlRecipes[typeObj][0].strMealThumb,
            strCategory: urlRecipes[typeObj][0].strCategory,
            str: urlRecipes[typeObj][0].strDrink || urlRecipes[typeObj][0].strMeal,
            date: '2/06/2020',
            type: clipBoard.type,
          },
        ]);
        localStorage.setItem('favoriteRecipes', JSON.stringify([...recipeFavorite, {
          id: clipBoard.type === 'Drink' || clipBoard.type === 'Meal'
            ? clipBoard.id : null,
          strThumb: urlRecipes[typeObj][0].strDrinkThumb
            || urlRecipes[typeObj][0].strMealThumb,
          strCategory: urlRecipes[typeObj][0].strArea,
          str: urlRecipes[typeObj][0].strDrink || urlRecipes[typeObj][0].strMeal,
          date: '2/06/2020',
          type: clipBoard.type,
        }]));
      }

      setFavoriteHeart(true);
    }
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
