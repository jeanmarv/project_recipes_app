import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  const path = location.pathname.split('/')[1];
  const title = path[0].toUpperCase() + path.substr(1);

  return (
    <header>
      <input
        type="image"
        onClick={ () => history.push('/perfil') }
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt="profile-icon"
      />
      <h1 data-testid="page-title">{ title }</h1>
      { (title === 'Comidas' || title === 'Bebidas' || title === 'Explorar Origem')
        ? (
          <input
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
