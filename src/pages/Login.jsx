import PropTypes from 'prop-types';
import React, { useState } from 'react';
import '../css/login.css';

export default function Login({ history }) {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [btnDisabled, setBtnDisabled] = useState(true);

  function emailAndPasswordValidation() {
    const regex = /.+@.+\.[A-Za-z]+$/;
    const minLength = 5;
    if (user.password.length > minLength && regex.test(user.email)) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }

  function handleChange({ target: { name, value } }) {
    setUser({
      ...user,
      [name]: value,
    });
    emailAndPasswordValidation();
  }

  function handleClick() {
    const { email } = user;
    history.push('./comidas');
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  }

  return (
    <div id="login-img">
      <form id="form-login">
        <h1 id="app-name">
          Recipes-app
        </h1>
        <input
          onChange={ handleChange }
          type="email"
          placeholder="Email"
          name="email"
          data-testid="email-input"
          id="email-ipt"
        />

        <input
          type="password"
          placeholder="Senha"
          name="password"
          onChange={ handleChange }
          data-testid="password-input"
          id="pass-ipt"
        />

        <button
          onClick={ handleClick }
          disabled={ btnDisabled }
          type="button"
          data-testid="login-submit-btn"
          id="login-btn"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
