import React, { useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import PropTypes from 'prop-types';
import RecipeContext from '../context/RecipeContext';
import shareIcon from '../images/shareIcon.png';

export default function ClipboardProgress({ recipe, index, inProgress }) {
  const { setLinkCopied } = useContext(RecipeContext);

  return (
    <CopyToClipboard
      text={
        recipe.type === 'Meal'
          ? `http://localhost:3000/comidas/${recipe.id}${inProgress}`
          : `http://localhost:3000/bebidas/${recipe.id}${inProgress}`
      }
    >
      <button
        type="button"
        src={ shareIcon }
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => setLinkCopied(true) }
      >
        <img src={ shareIcon } alt="shareIcon" />
      </button>
    </CopyToClipboard>
  );
}

ClipboardProgress.propTypes = ({
  recipe: PropTypes.shape({
    index: PropTypes.number,
    id: PropTypes.number,
    type: PropTypes.string,
  }),
}).isRequired;
