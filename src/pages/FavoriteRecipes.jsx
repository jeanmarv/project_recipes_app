import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import '../css/favorite.css';

export default function FavoriteRecipe() {
  const localStorageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || '';
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  const [filterFavorites, setFilterFavorites] = useState('');

  useEffect(() => {
    setFavoriteRecipe(localStorageFavorite);
  }, []);

  function handleClick({ target }) {
    setFilterFavorites(target.name);
  }

  return (
    <div className="favorite-main">
      <Header2 />
      <div className="buttons-box">
        <button
          className="btn btn-outline-dark"
          name=""
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
        >
          All
        </button>
        <button
          className="btn btn-outline-dark"
          name="Meal"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClick }
        >
          Comidas
        </button>
        <button
          className="btn btn-outline-dark"
          name="Drink"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClick }
        >
          Bebidas
        </button>
      </div>
      <div className="main-cards">
        {localStorageFavorite.length > 0 && favoriteRecipe
          .filter((recipe) => recipe.type === filterFavorites || filterFavorites === '')
          .map((recipe, index) => (
            <div className="indiv-cards" key={ index }>
              <Link
                to={ recipe.type === 'Meal'
                  ? `/comidas/${recipe.id}` : `/bebidas/${recipe.id}` }
              >
                <img
                  width="100px"
                  src={ recipe.strThumb }
                  alt=""
                  data-testid={ `${index}-horizontal-image` }
                />
                <h2 data-testid={ `${index}-horizontal-name` }>
                  {recipe.str}
                </h2>
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipe.strCategory ? `${recipe.strCategory}` : ''}
                </h3>
              </Link>

            </div>

          ))}
      </div>
      <Footer />
    </div>
  );
}
