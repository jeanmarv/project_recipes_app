import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function CardFoodDrinks({ path, name, src, indexID, id }) {
  return (

    <Link to={ `${path}/${id}` }>
      <div data-testid={ `${indexID}-recipe-card` }>
        <img
          data-testid={ `${indexID}-card-img` }
          alt={ name }
          src={ src }
        />
        <h4 data-testid={ `${indexID}-card-name` }>{ name }</h4>
      </div>
    </Link>
  );
}

CardFoodDrinks.propTypes = ({
  indexID: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string,
  path: PropTypes.string,
  src: PropTypes.string,
}).isRequired;
