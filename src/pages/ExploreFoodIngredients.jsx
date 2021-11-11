import React, { useEffect, useState } from 'react';
import IngredientsCard from '../components/IngredientsCard';
import Header from '../components/Header';

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
      <Header />
      {dataSliced.map((name, index) => (
        <IngredientsCard
          key={ index }
          index={ index }
          name={ name.strIngredient }
        />
      ))}
    </>
  );
}
