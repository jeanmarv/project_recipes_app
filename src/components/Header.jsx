import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../css/header.css';

const exploreIngredients = 'Explorar Ingredientes';
const title = (path) => {
  if (path === '/perfil') return 'Perfil';
  if (path === '/comidas') return 'Comidas';
  if (path === '/bebidas') return 'Bebidas';
  if (path === '/receitas-feitas') return 'Receitas Feitas';
  if (path === '/receitas-favoritas') return 'Receitas Favoritas';
  if (path === '/explorar') return 'Explorar';
  if (path === '/explorar/comidas') return 'Explorar Comidas';
  if (path === '/explorar/bebidas') return 'Explorar Bebidas';
  if (path === '/explorar/comidas/area') return 'Explorar Origem';
  if (path === '/explorar/comidas/ingredientes') return exploreIngredients;
  if (path === '/explorar/bebidas/ingredientes') return exploreIngredients;
};
export default function Header() {
  const { pathname } = useLocation();
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);

  return (
    <header id="header">
      <input
        type="image"
        onClick={ () => history.push('/perfil') }
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="profile-icon"
        className="perfil-img"
      />
      <h1 data-testid="page-title" className="pathname">{ title(pathname) }</h1>
      { (title(pathname) === 'Comidas'
        || title(pathname) === 'Bebidas'
        || title(pathname) === 'Explorar Origem')
        ? (
          <input
            className="search-btn"
            type="image"
            data-testid="search-top-btn"
            src={ SearchIcon }
            alt="search-icon"
            onClick={ () => setShowInput(!showInput) }
          />) : null }
      { showInput && <SearchBar /> }
    </header>
  );
}
// pra corrigir Commit
