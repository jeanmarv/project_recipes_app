// Recomendação de receitas se for comida ou se for bebida.
// 36
export default function fetchRecipeRecomendation(urlID, setRececomendation) {
  switch (window.location.pathname) {
  case `/comidas/${urlID}`:
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((response) => setRececomendation(response));
    break;
  case `/bebidas/${urlID}`:
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((resp) => setRececomendation(resp));
    break;

  default:
    break;
  }
}
