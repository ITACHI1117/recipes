import React from "react";
import { useLoaderData } from "react-router-dom";

function HomePage() {
  const userIdentify = useLoaderData();
  return <div>{userIdentify}</div>;
}

export default HomePage;
