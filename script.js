const searchBtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar");
let items = [];
searchBtn.addEventListener("click", function () {
  const searchInput = searchBar.value.trim();
  if (searchInput !== "") {
    resetRecipeModal();
    showRecipes(searchInput);
  }
});

async function showRecipes(searchInput) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`
    );
    const data = await response.json();
    items = data.meals || [];

    fetchRecipes(items);
  } catch (e) {
    console.error("Error", e);
  }
}
function resetRecipeModal() {
  recipeModal.innerHTML = "";
}

const mealFind = document.querySelector(".meal-find");
function fetchRecipes(items) {
  mealFind.innerHTML = "";
  if (items.length > 0) {
    items.forEach((meal) => {
      const cardFood = `
            <div class="meal-item" data-meal-id="${meal.idMeal}">
                
                <div class="recipe-image">
                    <img src="${meal.strMealThumb}" >
                </div>
                <div class="recipe">
                    <p>${meal.strMeal}</p>
                    <a href="#" class="recipe-button">View Recipe</a>
                </div>
            </div>
            `;
      mealFind.innerHTML += cardFood;
    });
  }
}

mealFind.addEventListener("click", (event) => {
  const cardFood = event.target.closest(".meal-item");
  if (cardFood) {
    const mealId = cardFood.dataset.mealId;
    const meal = items.find((meal) => meal.idMeal === mealId);

    detailedRecipe(meal);
  }
});

const recipeModal = document.getElementById("recipeModal");
const recipeButton = document.querySelector(".recipe-button");
const theCard = document.getElementById("thecard");
function detailedRecipe(meal) {
  let ingredientsHtml = "";
  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}`;
    const measureKey = `strMeasure${i}`;
    if (meal[ingredientKey] && meal[measureKey]) {
      ingredientsHtml += `<p>${meal[ingredientKey]} : ${meal[measureKey]}</p>`;
    }
  }
  const recipebtnHtml = `
                            <h2 class="recipe-name">${meal.strMeal}</h2>
                            <div class="recipe-img">
                                <img src="${meal.strMealThumb}" >
                            </div>
                            <div class="ingredients">
                                <h3>Ingredients</h3>
                                ${ingredientsHtml}
                            </div>
                            <div class="recipe-steps">
                                <h3>Steps</h3>
                                <p>${meal.strInstructions}</p>
                            </div>   
                    `;
  recipeModal.innerHTML = recipebtnHtml;
}

recipeButton.addEventListener("click", () => {
  const mealRecipes = meals[0];
  detailedRecipe(mealRecipes);
  theCard.style.transform = "translateX(-100%)";
});
