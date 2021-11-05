import PropTypes from 'prop-types';
import React from 'react';
import RecipeContext from './RecipeContext';

export default function RecipeProvider({ children }) {
  return (
    <main>
      <RecipeContext.Provider value="">
        { children }
      </RecipeContext.Provider>

    </main>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
