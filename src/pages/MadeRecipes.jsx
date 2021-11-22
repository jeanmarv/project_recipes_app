import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import MadeRecipeCard from '../components/MadeRecipeCard';

export default function MadeRecipes() {
  const [madeRecipeData, setMadeRecipes] = useState([]);

  useEffect(() => {
    const getDoneStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setMadeRecipes(getDoneStorage);
  }, []);
  return (
    <main className="done-recipes">
      <Header>
        Receitas Feitas
      </Header>
      <section className="done-recipes-section">
        {madeRecipeData.length > 0 && madeRecipeData.map((recipe, index) => (
          <MadeRecipeCard
            key={ recipe.id }
            recipeData={ recipe }
            index={ index }
          />
        )) }
      </section>
    </main>
  );
}
