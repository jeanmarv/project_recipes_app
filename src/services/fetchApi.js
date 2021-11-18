export const teste = async () => {
  try {
    // const response = await fetch(`${API_BEBIDAS_PRIMEIRA_LETRA_URL}${firstLetter}`);
    // const { drinks } = await response.json();
    // return drinks;
  } catch (error) {
    // return console.log(error);
  }
};
export async function apiFoodsEndDrinks(url, food) {
  const response = await fetch(url);
  const resolve = await response.json();
  if (food) {
    return resolve.meals;
  }
  return resolve.drinks;
}
