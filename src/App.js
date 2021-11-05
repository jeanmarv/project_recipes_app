import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipeProvider from './context/RecipeProvider';
import MainPage from './pages/MainPage';

function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas" component={ MainPage } />
      </RecipeProvider>
    </BrowserRouter>
  );
}

export default App;
