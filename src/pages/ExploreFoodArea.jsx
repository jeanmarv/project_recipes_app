import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import React from 'react';
import Header from '../components/Header';

export default function ExploreFoodArea() {
  const TWELVE = 12;
  const [areas, setAreas] = useState([]);
  const [mealsList, setMealsList] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getAreas = async () => {
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => response.json());
      setAreas(meals);
    };
    getAreas();
  }, []);

  useEffect(() => {
    const getMeals = async () => {
      if (filter === 'All') {
        const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((response) => response.json());
        setMealsList(meals);
      } else {
        const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`)
          .then((response) => response.json());
        setMealsList(meals);
      }
    };
    getMeals();
  }, [filter]);

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const renderAreaSelector = (areasList) => (
    <select
      data-testid="explore-by-area-dropdown"
      value={ filter }
      onChange={ ({ target }) => changeFilter(target.value) }
    >
      <option
        value="All"
        data-testid="All-option"
      >
        All
      </option>
      {
        areasList.map((area) => {
          const areaName = area.strArea;
          return (
            <option
              data-testid={ `${areaName}-option` }
              key={ areaName }
              value={ areaName }
            >
              { areaName }
            </option>
          );
        })
      }
    </select>
  );

  const renderFoods = (meals, index) => (
    <Link
      to={ `/comidas/${meals.idMeal}` }
      key={ meals.idMeal }
    >
      <li
        data-testid={ `${index}-recipe-card` }
      >
        <img
          alt={ meals.strMeal }
          src={ meals.strMealThumb }
          data-testid={ `${index}-card-img` }
          width="200px"
        />
        <span
          data-testid={ `${index}-card-name` }
        >
          { meals.strMeal }
        </span>
      </li>
    </Link>
  );

  const renderMeals = (foodsList, quantity = TWELVE) => (
    <ul>
      {
        foodsList.map((meals, index) => {
          if (index < quantity) return renderFoods(meals, index);
          return '';
        })
      }
    </ul>
  );

  return (
    <div>
      <Header />
      { renderAreaSelector(areas) }
      { renderMeals(mealsList) }
      <Footer />
    </div>
  );
}
