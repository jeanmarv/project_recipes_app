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
import ExplorePage from './pages/ExplorePage';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFood from './pages/ExploreFood';
import ExploreDrinksIngredients from './pages/ExploreDrinksIngredients';
import ExploreFoodArea from './pages/ExploreFoodArea';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import NotFound from './components/NotFound';
import RecipeInProgressPage from './pages/RecipeInProgressPage';
import RecipeDetailss from './pages/RecipeDetailss';

function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <DrinkProvider>
          <Route exact path="/project_recipes_app" component={ Login } />
          <Route exact path="/comidas" component={ MainPage } />
          <Route exact path="/perfil" component={ Profile } />
          <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
          <Route exact path="/receitas-feitas" component={ MadeRecipes } />
          <Route exact path="/bebidas" component={ DrinksPage } />
          <Route exact path="/explorar" component={ ExplorePage } />
          <Route exact path="/explorar/comidas" component={ ExploreFood } />
          <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
          <Route exact path="/comidas/:idRecipe" component={ RecipeDetailss } />
          <Route exact path="/bebidas/:idRecipe" component={ RecipeDetailss } />

          <Route
            exact
            path="/comidas/:id/in-progress"
            component={ RecipeInProgressPage }
          />

          <Route
            exact
            path="/bebidas/:id/in-progress"
            component={ RecipeInProgressPage }
          />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreFoodIngredients }
          />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreDrinksIngredients }
          />
          <Route exact path="/explorar/comidas/area" component={ ExploreFoodArea } />
          <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        </DrinkProvider>
      </RecipeProvider>
    </BrowserRouter>
  );
}

export default App;
