const searchBox = document.getElementById("searchBox");

const recipeContainer = document.getElementById("recipeContainer");


// SEARCH FUNCTION
searchBox.addEventListener("keyup", function () {

    let searchValue = searchBox.value.toLowerCase();

    let recipeCards = document.querySelectorAll(".recipe-card");

    recipeCards.forEach(function(card) {

        let recipeName = card.querySelector("h2").innerText.toLowerCase();

        if (recipeName.includes(searchValue)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});


// CATEGORY FILTER
function filterRecipes(category) {

    const recipeCards = document.querySelectorAll(".recipe-card");

    recipeCards.forEach(function(card){

        if(category === "all") {
            card.style.display = "block";
        }

        else if(card.dataset.category === category) {
            card.style.display = "block";
        }

        else {
            card.style.display = "none";
        }

    });

}


// ADD RECIPE
const addRecipeBtn = document.getElementById("addRecipeBtn");

addRecipeBtn.addEventListener("click", function(){

    const name = document.getElementById("recipeName").value;

    const category = document.getElementById("recipeCategory").value;

    const ingredients = document.getElementById("recipeIngredients").value;

    const steps = document.getElementById("recipeSteps").value;

    const imageFile = document.getElementById("recipeImage").files[0];

    if(!name || !category || !ingredients || !steps || !imageFile){
        alert("Please fill all fields");
        return;
    }

    const imageURL = URL.createObjectURL(imageFile);

    createRecipeCard(name, category, ingredients, steps, imageURL);

    saveRecipe(name, category, ingredients, steps, imageURL);

});


// CREATE RECIPE CARD
function createRecipeCard(name, category, ingredients, steps, image){

    const recipeCard = document.createElement("div");

    recipeCard.classList.add("recipe-card");

    recipeCard.setAttribute("data-category", category);

    recipeCard.innerHTML = `

        <img src="${image}" alt="${name}">

        <h2>${name}</h2>

        <p><strong>Category:</strong> ${category}</p>

        <p><strong>Ingredients:</strong> ${ingredients}</p>

        <p><strong>Steps:</strong> ${steps}</p>

    `;

    recipeContainer.appendChild(recipeCard);

    addPopupFunctionality(recipeCard);

}


// SAVE TO LOCAL STORAGE
function saveRecipe(name, category, ingredients, steps, image){

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.push({
        name,
        category,
        ingredients,
        steps,
        image
    });

    localStorage.setItem("recipes", JSON.stringify(recipes));

}


// LOAD SAVED RECIPES
window.addEventListener("load", function(){

    let recipes = JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.forEach(function(recipe){

        createRecipeCard(
            recipe.name,
            recipe.category,
            recipe.ingredients,
            recipe.steps,
            recipe.image
        );

    });

});


// POPUP SYSTEM
const popup = document.getElementById("recipePopup");

const popupImage = document.getElementById("popupImage");

const popupTitle = document.getElementById("popupTitle");

const popupCategory = document.getElementById("popupCategory");

const popupIngredients = document.getElementById("popupIngredients");

const popupSteps = document.getElementById("popupSteps");

const closePopup = document.getElementById("closePopup");


// ADD POPUP FUNCTION
function addPopupFunctionality(card){

    card.addEventListener("click", function(){

        popup.style.display = "block";

        popupImage.src = card.querySelector("img").src;

        popupTitle.innerText =
            card.querySelector("h2").innerText;

        popupCategory.innerText =
            card.querySelectorAll("p")[0].innerText;

        popupIngredients.innerText =
            card.querySelectorAll("p")[1].innerText;

        popupSteps.innerText =
            card.querySelectorAll("p")[2].innerText;

    });

}


// APPLY POPUP TO EXISTING CARDS
document.querySelectorAll(".recipe-card").forEach(function(card){

    addPopupFunctionality(card);

});


// CLOSE POPUP
closePopup.addEventListener("click", function(){

    popup.style.display = "none";

});