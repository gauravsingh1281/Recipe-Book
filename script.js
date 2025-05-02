"use strict";
const API_KEY = "275d58779ccf4e22af03e792e8819fff";
const cuisines = [
  "All",
  "African",
  "Asian",
  "American",
  "British",
  "Cajun",
  "Caribbean",
  "Chinese",
  "Eastern European",
  "European",
  "French",
  "German",
  "Greek",
  "Indian",
  "Irish",
  "Italian",
  "Japanese",
  "Jewish",
  "Korean",
  "Latin American",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "Southern",
  "Spanish",
  "Thai",
  "Vietnamese",
];
const diets = [
  "All",
  "Gluten Free",
  "Ketogenic",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
];

const mealTypes = [
  "All",
  "main course",
  "side dish",
  "dessert",
  "appetizer",
  "salad",
  "bread",
  "breakfast",
  "soup",
  "beverage",
  "sauce",
  "marinade",
  "fingerfood",
  "snack",
  "drink",
];

// Cuisine
const cuisineDropdownEl = document.getElementById("cuisine");
cuisines.forEach((cuisine) => {
  const cuisineDropdownOption = document.createElement("option");
  cuisineDropdownOption.value = cuisine;
  cuisineDropdownOption.textContent = cuisine;
  cuisineDropdownEl.appendChild(cuisineDropdownOption);
});

// Diet
const dietDropdownEl = document.getElementById("diet");
diets.forEach((diet) => {
  const dietDropdownOption = document.createElement("option");
  dietDropdownOption.value = diet;
  dietDropdownOption.textContent = diet;
  dietDropdownEl.appendChild(dietDropdownOption);
});

// Meal Types
const mealTypeDropdownEl = document.getElementById("meal-type");
mealTypes.forEach((mealType) => {
  const mealTypeDropdownOption = document.createElement("option");
  mealTypeDropdownOption.value = mealType;
  mealTypeDropdownOption.textContent = mealType;
  mealTypeDropdownEl.appendChild(mealTypeDropdownOption);
});

function clearRecipes() {
  recipeCardEl.innerHTML = "";
}

const recipeCardEl = document.getElementById("recipe-card-el");
const filterBtn = document.querySelector(".btn");
const resetBtn = document.querySelector(".reset-btn");
function displayRecipes(recipes) {
  clearRecipes();
  if (!recipes.length) {
    recipeCardEl.innerHTML = "<p>No recipes found for selected filters.</p>";
    return;
  }
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

    recipeCardEl.appendChild(recipeCardItemEl);
  });
}

async function getRecipes(cuisine = "", diet = "", mealType = "") {
  const tags = [mealType, diet, cuisine]
    .filter((tag) => tag && tag !== "All")
    .join(",");
  const url = tags
    ? `https://api.spoonacular.com/recipes/random?number=10&tags=${tags}&apiKey=${API_KEY}`
    : `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch recipes");
    const data = await response.json();
    return data.recipes;
  } catch (error) {
    console.error(error);
    recipeCardEl.innerHTML = `<p>Error loading recipes. Try again later.</p>`;
    return [];
  }
}
async function init() {
  const recipes = await getRecipes();
  displayRecipes(recipes);
  console.log(recipes);
}

filterBtn.addEventListener("click", async function () {
  const cuisineValue = cuisineDropdownEl.value;
  const dietValue = dietDropdownEl.value;
  const mealTypeValue = mealTypeDropdownEl.value;
  const recipes = await getRecipes(cuisineValue, dietValue, mealTypeValue); // Fetch filtered recipes
  displayRecipes(recipes);
});
resetBtn.addEventListener("click", async function () {
  cuisineDropdownEl.value = "All";
  dietDropdownEl.value = "All";
  mealTypeDropdownEl.value = "All";
  clearRecipes();
  const recipes = await getRecipes();
  displayRecipes(recipes);
});

init();
