import Logo from "./assets/Logo.png";
import fetchAndDisplayFood from "./GetData.jsx";
import { useState, useRef } from "react";

export default function Interface() {
  const inputFood = useRef();
  const [foodName, setFoodName] = useState();
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState();
  const [isVisible, setIsVisible] = useState(false);

  // Function to fetch and update data
  const searchFood = async () => {
    const foodNameValue = inputFood.current.value;

    if (!foodNameValue) return;

    try {
      const foodData = await fetchAndDisplayFood(foodNameValue);

      if (foodData) {
        setFoodName(foodNameValue);
        setIngredients(foodData.ingredients);
        setImage(foodData.image);
        setIsVisible(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="logo-title">
        <img src={Logo} alt="Logo" className="Logo" />
        <h2 className="siteName">ResiSearch</h2>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter food name"
          className="input"
          ref={inputFood}
        />
        <button className="searchBTN" onClick={searchFood}>
          <img src={Logo} alt="" />
          Search
        </button>
      </div>

      {isVisible && (
        <div className="main">
          <img src={image} className="foodImage" />
          <h2 className="foodName">{foodName}</h2>

          <p className="ingredients">📌 Ingredients:</p>

          <div className="ingredients-container">
            <ul className="ingredients-list">
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
