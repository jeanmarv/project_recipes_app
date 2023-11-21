import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';
import "../css/favorite.css";

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
          name="comida"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClick }
        >
          Food
        </button>
        <button
          className="btn btn-outline-dark"
          name="bebida"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClick }
        >
          Drink
        </button>
      <p>este é localstr{localStorageFavorite.length}</p>
      </div>

      {localStorageFavorite.length > 0 && favoriteRecipe
        .filter((recipe) => recipe.type === filterFavorites || filterFavorites === '')
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                width="100px"
                src={ recipe.image }
                alt=""
                data-testid={ `${index}-horizontal-image` }
              />
              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                {`${recipe.area || 'Alcoholic'} - ${recipe.category}`}
              </h3>
              <h2 data-testid={ `${index}-horizontal-name` }>
                {recipe.name}
              </h2>
            </Link>

          </div>
          
        ))}
        <Footer />
    </div>
  );
}
