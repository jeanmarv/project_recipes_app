import PropTypes from 'prop-types';
import React from 'react';
import RecipeContext from './RecipeContext';

export default function RecipeProvider({ children }) {
  // const [searchFood, setSearchFood] = useState('');

  // const URL = `https://www.themealdb.com/api/json/v1/1/${searchFood}`;
  // async function fetchComidas() {
  //   try {
  //     const response = await fetch(URL);
  //     const fetchedComidas = response.json();
  //     return fetchedComidas;
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // useEffect(() => {
  //   fetchComidas();
  // }, []);

  return (
    <main>
      <RecipeContext.Provider>
        { children }
      </RecipeContext.Provider>
    </main>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
