import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header2 from '../components/Header2';
import IngredientsCard from '../components/IngredientsCard';
import '../css/ingredient.css';

export default function ExploreFoodIngredients() {
  const [data, setData] = useState([]);

  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

  useEffect(() => {
    const fetchData = async () => {
      const { meals } = await fetch(url).then((response) => response.json());
      setData(meals);
    };
    fetchData();
  }, []);

  const TWELVE = 12;
  const dataSliced = data.slice(0, TWELVE);
  console.log(dataSliced);

  if (data === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Header2 />
      <div className="ingredient-main-div">
        {dataSliced.map((name, index) => (
          <IngredientsCard
            key={ index }
            index={ index }
            name={ name.strIngredient }
          />
        ))}
      </div>
      <Footer />
    </>
  );
}
