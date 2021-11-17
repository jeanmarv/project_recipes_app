export async function apiFoodsEndDrinks(url, food) {
  const response = await fetch(url);
  const resolve = await response.json();
  if (food) {
    return resolve.meals;
  }
  return resolve.drinks;
}

export default function fetchIngredient(
  urlRecipes,
  typeObj,
  setListIngredients,
  setQuantity,
) {
  const listIngredients = [];
  const listQuantity = [];

  if (urlRecipes[typeObj]) {
    const arrayObj = Object.entries(urlRecipes[typeObj][0]);

    const ingredients = arrayObj.filter((item) => item[0].includes('strIngredient'));
    ingredients.forEach((item) => {
      if (item[1] !== '' && item[1] !== null) {
        setListIngredients(listIngredients.push(item[1]));
      }
    });

    const quantity = arrayObj.filter((item) => item[0].includes('strMeasure'));
    quantity.forEach((item) => {
      if (item[1] !== '' && item[1] !== null) setQuantity(listQuantity.push(item[1]));
    });

    setListIngredients(listIngredients);
    setQuantity(listQuantity);
  }
}
