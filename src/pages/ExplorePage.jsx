import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';

export default function ExplorePage() {
  const history = useHistory();
  return (
    <div className="main-explore">
      <Header />
      <div className="explore-main-div">
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
      </div>
      <Footer />
    </div>
  );
}
