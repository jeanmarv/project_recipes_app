import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/explore.css';

export default function Profile() {
  const history = useHistory();
  const emailStorage = JSON.parse(localStorage.getItem('user'))
  || { email: 'email@teste.com.br' };
  return (
    <div>
      <Header />
      <div className="explore-main-div">
        <p data-testid="profile-email">{ emailStorage.email }</p>
        <button
          onClick={ () => history.push('/receitas-feitas') }
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
        <button
          onClick={ () => history.push('/receitas-favoritas') }
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
        <button
          onClick={ () => {
            localStorage.clear();
            history.push('/');
          } }
          type="button"
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </div>
      <Footer />
    </div>
  );
}
