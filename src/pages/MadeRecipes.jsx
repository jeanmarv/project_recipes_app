import React, { useState, useEffect } from 'react';
import Header2 from '../components/Header2';
import MadeRecipeCard from '../components/MadeRecipeCard';

export default function MadeRecipes() {
  const [madeRecipeData, setMadeRecipes] = useState([]);

  useEffect(() => {
    const getDoneStorage = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    setMadeRecipes(getDoneStorage);
  }, []);
  return (
    <main className="done-recipes">
      <Header2 />
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
