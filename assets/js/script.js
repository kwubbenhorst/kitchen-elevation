// Karla's apiKey stored in a variable, and a variable dishName created to capture user input from the input box on the search page. It is just set to "Maple Glazed Salmon" as a default for now so I can test this code. Button element created in search.html and stored in a variable here so I can listen for clicks on it
var apiKeySpnclr = "0d496145a03e4cdfb825d930b3633556";
var dishName = "chili con carne";
var searchBtnEl = document.getElementById("search-btn");
const recipeCardContainer = document.getElementById('recipe-container');

//Nick takes over coding from here.  I have done the pseudocode
function renderRecipeCards(recipes) {
const apiUrl = `https://api.spoonacular.com/recipes/${recipes.id}/information?apiKey=${apiKeySpnclr}`;
fetch(apiUrl)
.then(response => response.json())
.then(data =>
  {
    if (data) {
      const recipeCardHTML = `
      <div class="recipe-card">
          <h2>${data.title}</h2>
          <ul>
              ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
          </ul>
          <p>${data.instructions || 'No instructions available.'}</p>
      </div>
  `
  recipeCardContainer.innerHTML = recipeCardHTML;
    
    }
    else{
      recipeCardContainer.textContent = 'Recipe not found.';
    }

  })
  .catch(error =>{
    console.error('Error fetching recipe details',error);
  });

//Iterate through the recipes array of objects so that recipes[i] lets you access each recipe individually
//Construct the cardRequestURL (see spoonacular's documentation for the Get Recipe Card end point). It requires a recipe id which you can express in terms of a variable ${recipes[i].id}. End the query string with &apiKey=${apiKeySpnclr}. 
//Do the fetch request, passing in cardRequestURL as a parameter
//In the second .then block log the response (should be an http URL which can be used as a src for rendering)
//Use createElement and appendChild to dynamically create the card elements and push data.url to them as the image src. You will want to do a document.location.replace so that results.html is now your document
//Do a catch method for handling any errors in the fetch request
}

//Function to get recipes
function getRecipes() {
  //A fetch URL to get recipes from spoonacular api. Query parameters are hardcoded to limit recipes returned to 5, to sort by most popular and display them in descending order. Data will include full recipe instructions and nutritional info
  var recipesURL = `https://api.spoonacular.com/recipes/complexSearch?query=${dishName}&addRecipeNutrition=true&instructionsRequired=true&sort=popularity&sortDirection=desc&number=5&apiKey=${apiKeySpnclr}`;

  //Send a fetch request to get recipes.
  fetch(recipesURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.results && data.results.length > 0) {
        console.log(data.results); //Console log the data returned

        //Declare a recipes variable and set it initially to an empty string. I want it eventually to be an array of objects where each object has id and title as properties and their corresponding values extracted from the returned data. The idea is to pass recipes as a parameter to the function renderRecipeCards which will use the id to construct a queryURL for the get Recipe Cards end point)
        var recipes = [];

        //Iterate through each recipe in data.results. There may be as few as 1 result or as many as 5.
        for (var i = 0; i < data.results.length; i++) {
          //Extract the id and title of each recipe from the data.results returned
          var recipeId = data.results[i].id;
          var recipeTitle = data.results[i].title;

          //Create an object with id and title properties
          var recipeObject = {
            id: recipeId,
            title: recipeTitle
          };

          //Push the recipe object into the recipes array
          recipes.push(recipeObject);
        }

        //Check that recipes array now contains objects with id and title for each recipe
        console.log(recipes);

        //Call the function with the second chained asynchronous fetch request to get the recipe rendered on a card for us.
        renderRecipeCards(recipes);
      

      }
    })
    .catch(function (error) {
      // Handle errors in the fetch request
      console.error('Error fetching recipes:', error);
    });
}

//Added an event listener to the searchBtnEl (an simple bootstrap button element I created in search.html) so that I can call the getRecipes function on click
searchBtnEl.addEventListener("click", getRecipes);







