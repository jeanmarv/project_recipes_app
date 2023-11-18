import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header2 from '../components/Header2';
import '../css/explore.css';

export default function ExplorePage() {
  const history = useHistory();
  return (
    <div>
      <Header2 />
      <div className="main-explore">
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
      </div>
    <Footer />
    </div>
  );
}
