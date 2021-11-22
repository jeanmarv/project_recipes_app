import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteHeart() {
  const { favoriteHeart, setFavoriteHeart } = useContext(RecipeContext);
  async function handleClickFavorite() {
    if (favoriteHeart === true) {
      setFavoriteHeart(false);
    } else {
      setFavoriteHeart(true);
    }
  }
  return (
    <button
      data-testid="favorite-btn"
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
