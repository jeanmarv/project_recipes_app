import React from 'react';
import RecipeProgress from '../components/RecipeProgress';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RecipeInProgressPage() {
  return (
    <>
      <Header />
      Receita em progresso
      <RecipeProgress />
      <Footer />
    </>
  );
}
