const API_BEBIDAS_INGREDIENT_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const API_BEBIDAS_NAME_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_BEBIDAS_PRIMEIRA_LETRA_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

export const apiDrinksIngredient = async (ingredient) => {
  try {
    const response = await fetch(`${API_BEBIDAS_INGREDIENT_URL}${ingredient}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return console.log(error);
  }
};

export const apiDrinkName = async (name) => {
  try {
    const response = await fetch(`${API_BEBIDAS_NAME_URL}${name}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    console.log(error);
  }
};

export const apiDrinkFirstLetter = async (firstLetter) => {
  try {
    const response = await fetch(`${API_BEBIDAS_PRIMEIRA_LETRA_URL}${firstLetter}`);
    const { drinks } = await response.json();
    return drinks;
  } catch (error) {
    return console.log(error);
  }
};
