import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import RecipeContext from '../context/RecipeContext';
import fetchRecipeRecomendation from '../services/fetchRecipeRecomendation';

export default function RecommendedDetail({ urlID, urlName }) {
  // console.log(urlName);
  const {
    recomendation,
    setRecomendation,
    key,
    setKey } = useContext(RecipeContext);

  const NUM_MAX_CARDS = 6;

  useEffect(() => {
    fetchRecipeRecomendation(urlID, setRecomendation);
    setKey(urlName === 'comidas' ? 'drinks' : 'meals');
  }, []);

  // console.log(key);
  // console.log(recomendation[key]);
  return (
    <div>
      { recomendation[key] !== undefined ? recomendation[key].slice(0, NUM_MAX_CARDS)
        .map((item, index) => (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <div>
              <img
                data-testid="recipe-photo"
                alt="foto"
                src={ urlName === 'bebidas' ? item.strMealThumb : item.strDrinkThumb }
                style={ { width: '20%',
                  margin: '20px 5px',
                  display: 'flex',
                  justifyContent: 'space-around' } }
              />
              <p>
                { urlName === 'comidas'
                  ? `${item.strCategory} ${item.strAlcoholic}` : item.strCategory }
              </p>

              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                { urlName === 'bebidas' ? item.strMeal : item.strDrink }
              </h5>
            </div>
          </div>
        )) : null }
    </div>
  );
}

RecommendedDetail.propTypes = ({
  urlID: PropTypes.number,
  urlName: PropTypes.string,
}).isRequired;
