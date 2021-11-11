import React from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';

export default function ExplorePage() {
  const history = useHistory();
  return (
    <>
      <Header />
      <button
        onClick={ () => history.push('/explorar/comidas') }
        type="button"
        data-testid="explore-food"
      >
        Explorar Comidas
      </button>
      <button
        onClick={ () => history.push('/explorar/bebidas') }
        type="button"
        data-testid="explore-drinks"
      >
        Explorar Bebidas
      </button>
    </>
  );
}
