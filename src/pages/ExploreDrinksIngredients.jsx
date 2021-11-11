import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import IngredientsCard from '../components/IngredientsCard';
import Header from '../components/Header';

export default function ExploreDrinksIngredients() {
  const [data, setData] = useState([]);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

  useEffect(() => {
    const fetchData = async () => {
      const { drinks } = await fetch(url).then((response) => response.json());
      setData(drinks);
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
          name={ name.strIngredient1 }
        />
      ))}
      <Footer />
    </>
  );
}
