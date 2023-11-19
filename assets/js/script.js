//Karla's apiKey stored in a variable, and a variable dishName created to capture user input from the input box on the search page.  It is just set to "Maple Glazed Salmon" as a default for now so I can test this code. Button element created in search.html and stored in a variable here so I can listen for clicks on it 
var apiKeySpnclr = "203eda98b18c453094040f9aa702faf6";
var apiKeyYelpFusn = "KFt9d65AEUW43oYGLpjKF8-Es3373cifbRG8ihm2cxtd5NtzffOoVrW0977HpELtSHQXIx2O5X5wTDuc1Z-QINlrJ5oVC0Okif7YEiYEvPNgJgY4FoQvYRb6aelNZXYx";
var dishName = "cheeseburger";
var searchBtnEl = document.getElementById("search-btn");
var recipeBtnEl = document.getElementById("recipe-btn");
var menuItemsURL = `https://api.spoonacular.com/food/menuItems/search?query=${dishName}&apiKey=${apiKeySpnclr}`;
    var recipesURL = `https://api.spoonacular.com/recipes/complexSearch?query=${dishName}&addRecipeNutrition=true&instructionsRequired=true&sort=popularity&sortDirection=desc&number=5&apiKey=${apiKeySpnclr}`;
    var returnedResults = "";
    var returnedRecipeResults = "";
    var iterateCounter = 0;
function renderSearchResults(allRecipeDetails) {
}
//Nick takes over coding from here.  I have done the pseudocode
function renderRecipeCards(allReturnedRecipes) {

  //Iterate through the recipes array of objects so that recipes[i] lets you access each recipe individually
  //Construct the cardRequestURL (see spoonacular's documentation for the Get Recipe Card end point). It requires a recipe id which you can express in terms of a variable ${recipes[i].id}. End the query string with &apiKey=${apiKeySpnclr}. 
  //Do the fetch request, passing in cardRequestURL as a parameter
  //In the second .then block log the response (should be an http URL which can be used as a src for rendering)
  //Use createElement and appendChild to dynamically create the card elements and push data.url to them as the image src. You will want to do a document.location.replace so that results.html is now your document
  //Do a catch method for handling any errors in the fetch request
}

//Function to getRecipes that will be called as an event handler function when submit button is hit on search page
function getRecipes() { 
  // A fetch URL to get recipes from spoonacular api. Query parameters are hardcoded to limit recipes returned to 5, to sort by most popular and display them in descending order. Data will include full recipe instructions and nutritional info
      fetch(menuItemsURL)
      .then(function (response) {
        return response.json();
      })
      
      .then(function (data) { 
        var returnedResults = data;
                console.log(returnedResults);
                        console.log("Restaurant Chain:")
                        var restaurantChainsArray = [];
        for (var i = 0; i < returnedResults.menuItems.length; i++) {
          console.log(i, returnedResults.menuItems[i].restaurantChain)

        }
  
        console.log("Menu Item Names:")
        for (var i = 0; i < returnedResults.menuItems.length; i++) {
          console.log(i, returnedResults.menuItems[i].title)
        }
  
        console.log("Images:")
        for (var i = 0; i < returnedResults.menuItems.length; i++) {
          console.log(i, returnedResults.menuItems[i].image)
        }
        
        // iterate over results and list serving sizes info with i as the array placement
        console.log("Serving size:")

        // adds list items to search results on search.html for each iteration
        //var searchResult = ""
                //var listItem = "";
                function getItemListed() {
          
                  //recipeData.title
      
                  var li = document.createElement("li");
                  li.textContent = returnedResults.menuItems[iterateCounter].title;
                  var listItem = document.getElementById("search-results").appendChild(li);
                  var li2 = document.createElement("li");
                  li2.textContent = returnedResults.menuItems[iterateCounter].title;
                  var listItem2 = document.getElementById("search-results-recipes").appendChild(li2);
                  iterateCounter++;
        }
              for (var i = 0; i < returnedResults.menuItems.length; i++) {
                getItemListed();
                
              }
      
              
            })
                  //Send a fetch request to get recipes.
      fetch(recipesURL)
    .then(function (response) {
      return response.json();
    })
//Here the then block is opened where we do all the manipulation we want to do of the returned data. 
//In the big picture we want to build two arrays from which data can easily be rendered. 
//The allReturnedRecipes array is an array of objects, one for each recipe.  We will use this to render the recipe cards on p3.  The returnedRecipeObject will be used to structure the data. When populated with actual data from the returned recipes these objects will be pushed into the allReturnedRecipes array one at a time
//The allRecipeDetails array is an array of objects, one for each recipe's detailed information. We will use this to render the recipe search result list on p.2. The recipeDetailsObject will be used to structure the data. When populated with actual data from the returned recipes these objects will be pushed into the allRecipeDetails array one at a time   
    .then(function (data) { 
      if (data.results && data.results.length > 0) {
        console.log(data.results); //Checks that indeed some data has been returned and logs it all out in the console
        //Declares the recipe and recipeDetails variables and sets them initially to an empty array. Eventually I will push as many iterations of the returnedRecipeObject and the recipeDetailsObject in here as are returned from the fetch request
        var allReturnedRecipes = [];
        var allRecipeDetails = [];
        for (var i = 0; i < data.results.length; i++) {
          var recipeData = data.results[i]; //lets me deal with each returned recipe's data separately
        

          // Extracts the ingredients values and formats them.
          var ingredientsVal = [];
  for (var j = 0; j < recipeData.nutrition.ingredients.length; j++) {
    var ingredient = recipeData.nutrition.ingredients[j];
    var formattedIngredient = '';
    //Ingredients are under the nutrients array in the data.results. Amounts are given here per serving so this multiplies by the servings value to get the right amount for the whole recipe.
    var adjustedAmount = ingredient.amount * recipeData.servings;
    // This logic evaluates whether the adjusted amount is a whole number. If so, it updates the value of the formattedIngredients string. If not, it rounds to one decimal place before updating the value of the formattedIngredients string.
    if (adjustedAmount % 1 === 0) {
      formattedIngredient += adjustedAmount;
    } else {
      formattedIngredient += adjustedAmount.toFixed(1);
    }
    formattedIngredient += ' ' + ingredient.unit + ' ' + ingredient.name;
    
    ingredientsVal.push(formattedIngredient);
  }
  // Checks that the ingredients value has been extracted and formatted correctly. Should be an array that looks like this: [["28 ounces canned tomatoes", "14 ounces canned tomatoes", "2 tablespoons chili powder," "1 tablespoon ground cumin", "2 teaspoons paprika", "1 tablespoon brown sugar", "1 tablespoon brown sugar", " "0.5 teaspoon salt", "3 " carrots", "4 stalks celery", "1 medium onion", "2 cloves garlic", "1 pound beef chuck", "15 ounces kidney beans"]
  console.log('Ingredients:', ingredientsVal);
  
  
  //Extracts the steps value and formats it
  var stepsVal = [];
  if (recipeData.analyzedInstructions[0] && recipeData.analyzedInstructions[0].steps) {
    var stepArray = recipeData.analyzedInstructions[0].steps;
    for (var k = 0; k < stepArray.length; k++) {
      stepsVal.push(stepArray[k].number + '. ' + stepArray[k].step);
  }
}
//Checks that the steps value has been extracted and is formatted correctly. Should be an array that looks like this: ["1. In a medium bowl, stir together the crushed tomato…cumin, paprika, brown sugar, and salt. Set aside.", "2. Place the carrots, celery, onions, garlic, beef, and kidney beans into the base of a slow cooker.", "3. Pour the tomato sauce mixture evenly over the top …d vegetables. Cover and cook on high for 6 hours.", "4. Taste and adjust seasoning as necessary- adding more chili powder if you'd prefer more spice."]
console.log('Steps:', stepsVal);


//Compiles nutritional info by extracting and formatting select data from the data.results nutrients array
var nutritionalInfoVal = [];
//Access the nutrientsArray from the data.results and filter it to include only select nutrients
var nutrientsArray = recipeData.nutrition.nutrients;
var selectNutrients = nutrientsArray.filter(function(nutrient) { // the filter method's callback function goes through each nutrient in the nutrients array to see if the relevantNutrients array includes it. If true that result is returned to the array of selectNutrients
  var relevantNutrients = ['Calories', 'Fat', 'Carbohydrates', 'Sodium', 'Protein'];
  return relevantNutrients.includes(nutrient.name);
});
// Iterates through the selectNutrients array to extract and format the nutritional information values
for (var m = 0; m < selectNutrients.length; m++) {
  var nutrient = selectNutrients[m];
  // Formats the nutritional information string and pushes it into the nutritionalInfoVal array
  var formattedNutritionalInfo = nutrient.name + ': ' + nutrient.amount + ' ' + nutrient.unit;
  nutritionalInfoVal.push(formattedNutritionalInfo);
}  
// Checks that the select nutritional info values have been extracted and formatted correctly.  Should be an array that looks like this: ["Calories: 333.47 kcal", "Fat: 6.51 g", "Carbohydrates: 44.14 g", "Sodium: 932.81 mg",  "Protein: 29.41 g"]
console.log('Nutritional Info:', nutritionalInfoVal);


//Creates an object to store easily renderable information for each recipe returned by the fetch request
var returnedRecipeObject = {
  id: recipeData.id,
  title: recipeData.title,
  servings: recipeData.servings,
  readyInMinutes: recipeData.readyInMinutes,
  image: recipeData.image, // value will be an http link to the spoonacular site with a jpg extension
  ingredients: ingredientsVal,
  steps: stepsVal, 
  sourceUrl: recipeData.sourceUrl,
};

//Creates an object to store more recipe details
var recipeDetailsObject = {
  id: recipeData.id,
  title: recipeData.title,
  image: recipeData.image,
  aggregateLikes: recipeData.aggregateLikes, //value will be a number
  cheap: recipeData.cheap, //value will be a boolean
  veryHealthy: recipeData.veryHealthy, //value will be a boolean
  cuisines: recipeData.cuisines || [], //sometimes cuisines and weightPerServing are undefined, so in this case they will default to an empty array
  weightPerServing: recipeData.weightPerServing || [], 
  diets: recipeData.diets, // value will be an array of strings
  nutritionalInfo: nutritionalInfoVal,  
}

//Pushes the returnedRecipeObject into the allReturnedRecipes array and checks in the console that its property/value pairs look as expected.
allReturnedRecipes.push(returnedRecipeObject);
console.log('Recipe added:', allReturnedRecipes);
//Pushes the recipeDetailsObject into the allRecipeDetails array and checks in the console that its property/value pairs look as expected.
allRecipeDetails.push(recipeDetailsObject);
console.log('Recipe details added:', allRecipeDetails);
}

//Call the function which will render the search results on page 2 (results.html) 
renderSearchResults(allRecipeDetails);


}
})
};

//Added an event listener to the search button on search.html to call the getRecipes function on click
searchBtnEl.addEventListener("click", getRecipes);

recipeBtnEl.addEventListener("click", renderRecipeCards);
