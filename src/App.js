import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipeProvider from './context/RecipeProvider';
import MainPage from './pages/MainPage';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ MainPage } />
        <Route path="/perfil" component={ Profile } />
      </RecipeProvider>
    </BrowserRouter>
  );
}

export default App;
