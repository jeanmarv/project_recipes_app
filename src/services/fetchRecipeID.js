export default function fetchRecipeID(ID, setUrlRecipes) {
  switch (window.location.pathname) {
  case `/bebidas/${ID}`:
  case `/bebidas/${ID}/in-progress`:
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${ID}`)
      .then((response) => response.json())
      .then((res) => setUrlRecipes(res));
    break;

  case `/comidas/${ID}`:
  case `/comidas/${ID}/in-progress`:
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${ID}`)
      .then((response) => response.json())
      .then((response) => setUrlRecipes(response));
    break;

  default:
    break;
  }
}
