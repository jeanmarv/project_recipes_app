import React from 'react';
import RecipeProgress from '../components/RecipeProgress';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';

export default function RecipeInProgressPage() {
  return (
    <>
      <Header2 />
      Receita em progresso
      <RecipeProgress />
      <Footer />
    </>
  );
}
