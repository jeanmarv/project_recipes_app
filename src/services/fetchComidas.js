const API_COMIDA_INGREDIENT_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const API_COMIDA_NAME_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_COMIDA_PRIMEIRA_LETRA_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const apiMealsIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${API_COMIDA_INGREDIENT_URL}${ingredient}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    return console.log(error);
  }
};

export const apiMealsName = async (name) => {
  try {
    const response = await fetch(`${API_COMIDA_NAME_URL}${name}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    return console.log(error);
  }
};

export const apiMealsFirstLetter = async (firstLetter) => {
  try {
    const response = await fetch(`${API_COMIDA_PRIMEIRA_LETRA_URL}${firstLetter}`);
    const { meals } = await response.json();
    return meals;
  } catch (error) {
    return console.log(error);
  }
};
