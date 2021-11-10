import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipeProvider from './context/RecipeProvider';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MadeRecipes from './pages/MadeRecipes';
import DrinksPage from './pages/DrinksPage';
import DrinkProvider from './context/DrinkProvider';

function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <DrinkProvider>
          <Route exact path="/" component={ Login } />
          <Route path="/comidas" component={ MainPage } />
          <Route path="/perfil" component={ Profile } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route exact path="/receitas-feitas" component={ MadeRecipes } />
          <Route path="/bebidas" component={ DrinksPage } />
        </DrinkProvider>
      </RecipeProvider>
    </BrowserRouter>
  );
}

export default App;
