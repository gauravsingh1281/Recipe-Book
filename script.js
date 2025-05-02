"use strict";
const API_KEY = "3e9b6e369d174655b92db73a3a937e76";
const recipeCardEl = document.getElementById("recipe-card-el");
function displayRecipes(recipes) {
  recipes.forEach((recipe) => {
    const recipeCardItemEl = document.createElement("li");
    recipeCardItemEl.classList.add("recipe-card-items");
    const ingredients = recipe.extendedIngredients
      .map((ingredient) => ingredient.original)
      .join(", ");
    recipeCardItemEl.innerHTML = `
                    <img src="${recipe.image}" alt="recipe-image">
                    <h2>${recipe.title}</h2>
                    <p> <strong>Ingredients :</strong> 
                    ${ingredients}
                    </p>
                    <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>`;

    recipeCardEl.append(recipeCardItemEl);
  });
}

async function getRecipes() {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
  );
  const data = await response.json();
  return data.recipes;
}

async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
  console.log(recipes[0]);
}

init();
