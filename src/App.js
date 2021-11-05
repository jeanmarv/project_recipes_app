import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import RecipeProvider from './context/RecipeProvider';

function App() {
  return (
    <BrowserRouter>
      <RecipeProvider>
        <Route exact path="/" component={ Login } />
      </RecipeProvider>
    </BrowserRouter>
  );
}

export default App;
