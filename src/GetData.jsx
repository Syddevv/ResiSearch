async function GetData(food) {
  try {
    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${food}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.results.length === 0) {
      throw new Error("No recipes found for this food!");
    }

    // recipe ID
    const recipeId = data.results[0].id;

    // recipe image
    const imageUrl = data.results[0].image;

    // fetch recipe
    const recipeResponse = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${apiKey}`
    );

    const recipeData = await recipeResponse.json();

    // get the ingredients list
    const ingredientsList = recipeData.extendedIngredients.map(
      (ingredient) => ingredient.name
    );

    return { image: imageUrl, ingredients: ingredientsList }; // Return array of ingredient names and image
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export default async function fetchAndDisplayFood(foodName) {
  if (!foodName) {
    console.error("Food name is required!");
    return [];
  }

  return await GetData(foodName);
}
