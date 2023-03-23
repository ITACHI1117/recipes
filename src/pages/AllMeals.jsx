import React, { useEffect } from "react";
import { useLoaderData } from "react-router-dom";

function AllMeals() {
  const dishId = useLoaderData();

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${dishId}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return <div>{dishId}</div>;
}

export default AllMeals;
