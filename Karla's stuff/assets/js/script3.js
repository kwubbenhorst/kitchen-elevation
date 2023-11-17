//Dan's apiKey stored in a variable, and a variable dishName created to capture user input from the input box on the search page.  It is just set to "Maple Glazed Salmon" as a default for now so I can test this code. Button element created in search.html and stored in a variable here so I can listen for clicks on it 
var apiKeySpnclr = "203eda98b18c453094040f9aa702faf6";
var ingredientOrDishName;
var searchBtnEl = document.getElementById("button-addon2");
var input = document.querySelector(".input-1");

//const recipeCardContainer = document.getElementById('recipe-container');  Added by Patrick for getRecipeCard


function renderRecipeDetails(allRecipeDetails) {
    console.log("Rendering recipe details");
    //wrapping this function in a promise so its asynchronous activity has a chance to complete before the program moves on
    return new Promise(function (resolve, reject) { 
        setTimeout(function () {
            console.log('renderingRecipeData');

    // Iterate through each accordion section
    for (var i = 0; i < accordionHeaderEls.length; i++) {
      var accordionHeaderEl = accordionHeaderEls[i];
      var accordionBodyEl = accordionBodyEls[i];
  
      // Check if there is a corresponding recipe detail
      if (i < allRecipeDetails.length) {
        var recipeDetail = allRecipeDetails[i];
  
        // Populate accordion header with the title
        accordionHeaderEl.querySelector('button').textContent = 'Recipe Result #' + (i + 1) + ': ' + recipeDetail.title;
  
        // Generate content for accordion body
        var content = '<strong>Likes:</strong> ' + recipeDetail.aggregateLikes;
        content += '<br><strong>Economical:</strong> ';

        if (recipeDetail.cheap) {
        content += '<span style="color: green;">&#10003;</span>';
        } else {
        content += 'No';
        }

        content += '<br><strong>Healthy:</strong> ';

        if (recipeDetail.veryHealthy) {
        content += '<span style="color: green;">&#10003;</span>';
        } else {
        content += 'Not so much';
        }
  
        // Add cuisine information if available
        if (recipeDetail.cuisines.length > 0) {
          content += '<br><strong>Cuisine:</strong> ' + recipeDetail.cuisines.join(', ');
        }
  
        // Add portion-size information if available
        if (recipeDetail.weightPerServing.length > 0) {
          content += '<br><strong>Portion-size:</strong> ' + recipeDetail.weightPerServing;
        }

        // Add nutritional info
        content += '<br><strong>Nutritional info per portion:</strong> ' + recipeDetail.nutritionalInfo;
  
        // Add diets information
        content += '<br><strong>Suitable for:</strong> ' + recipeDetail.diets.join(', ');
  
  
        // Set the innerHTML of the accordion body with the generated content
        accordionBodyEl.innerHTML = '<pre>' + content + '</pre>';
      } else {
        // If there's no corresponding recipe detail, clear the accordion title and body
        accordionHeaderEl.querySelector('button').textContent = '';
        accordionBodyEl.innerHTML = '';
  
        // Set button visibility to hidden
        accordionBodyEl.querySelector('.get').style.visibility = 'hidden';
      }
    }
  
    // Set button visibility to visible for all accordion sections
    var buttons = document.querySelectorAll('.get');
    for (var n = 0; n < buttons.length; n++) {
      buttons[n].style.visibility = 'visible';
    }

    // Resolve the promise when rendering is complete
    resolve();
    }, 100); // Adjust the delay as needed
    console.log("Recipe details rendered successfully");
    window.location.href = '../library/results2.html';  //Switches the html
    });

}

/*
//Patrick takes over coding from here.  I have done the pseudocode
function renderRecipeCards(allReturnedRecipes) {

    //Iterate through the recipes array of objects so that recipes[i] lets you access each recipe individually
    //Construct the cardRequestURL (see spoonacular's documentation for the Get Recipe Card end point). It requires a recipe id which you can express in terms of a variable ${recipes[i].id}. End the query string with &apiKey=${apiKeySpnclr}. 
    //Do the fetch request, passing in cardRequestURL as a parameter
    //In the second .then block log the response (should be an http URL which can be used as a src for rendering)
    //Use createElement and appendChild to dynamically create the card elements and push data.url to them as the image src. You will want to do a document.location.replace so that results.html is now your document
    //Do a catch method for handling any errors in the fetch request

    //Patrick's Code
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




    }

    //function to do the fetch request to Spoonacular for menu items (Dan's code)
function getMenuItems() {









}
*/






    //Function to getRecipes that will be called as an event handler function when submit button is hit on search page
function getRecipes() {
    //wrapping this function with asynchronous activity in a promise to give it a chance to complete its work before the program moves on 
    return new Promise(function (resolve, reject) {
    ingredientOrDishName = input.value;
    //Check that the input has been captured
    console.log('Ingredient or Dish Name:', ingredientOrDishName);
  // A fetch URL to get recipes from spoonacular api. Query parameters are hardcoded to limit recipes returned to 5, to sort by most popular and display them in descending order. Data will include full recipe instructions and nutritional info
  var recipesURL = `https://api.spoonacular.com/recipes/complexSearch?query=${ingredientOrDishName}&addRecipeNutrition=true&instructionsRequired=true&sort=popularity&sortDirection=desc&number=5&apiKey=${apiKeySpnclr}`;
 
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
        console.log('Data received successfully:', data); 
      if (data.results && data.results.length > 0) {
        console.log(data.results); //Checks that indeed some data has been returned and logs it all out in the console

       

//Declares the recipe and recipeDetails variables and sets them initially to an empty array. Eventually I will push as many iterations of the returnedRecipeObject and the recipeDetailsObject in here as are returned from the fetch request
        var allReturnedRecipes = [];
        var allRecipeDetails = [];
        for (var i = 0; i < data.results.length; i++) {
            console.log('Rendering details for recipe:', i);
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


//Compiles nutritional info by extracting and formatting select data from the data.results nutrients array.  I am making 2 arrays because I want to render them this way to the accordion
var nutritionalInfoVal1 = [];
var nutritionalInfoVal2 = [];
//Accesses the nutrientsArray from the data.results and filters it to include only select nutrients
var nutrientsArray = recipeData.nutrition.nutrients;
//Defines arrays for different groups of nutrients
var group1Nutrients = ['Calories', 'Fat'];
var group2Nutrients = ['Carbohydrates', 'Sugar', 'Protein'];
//Filters nutrients based on groups
var selectNutrients1 = nutrientsArray.filter(function(nutrient) {
  return group1Nutrients.includes(nutrient.name);
});
var selectNutrients2 = nutrientsArray.filter(function(nutrient) {
  return group2Nutrients.includes(nutrient.name);
});
//Iterates through the selectNutrients1 array to extract and format the nutritional information values for group 1
for (var m = 0; m < selectNutrients1.length; m++) {
  var nutrient = selectNutrients1[m];
  var formattedNutritionalInfo = ' ' + nutrient.name + ': ' + nutrient.amount + ' ' + nutrient.unit;
  nutritionalInfoVal1.push(formattedNutritionalInfo);
}
//Iterates through the selectNutrients2 array to extract and format the nutritional information values for group 2
for (var n = 0; n < selectNutrients2.length; n++) {
  var nutrient = selectNutrients2[n];
  var formattedNutritionalInfo = ' ' + nutrient.name + ': ' + nutrient.amount + ' ' + nutrient.unit;
  nutritionalInfoVal2.push(formattedNutritionalInfo);
}
//Checks that the select nutritional info values have been extracted and formatted correctly for group 1
console.log('Nutritional Info Group 1:', nutritionalInfoVal1);
//Checks that the select nutritional info values have been extracted and formatted correctly for group 2
console.log('Nutritional Info Group 2:', nutritionalInfoVal2);



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
    nutritionalInfo1: nutritionalInfoVal1,
    nutritionalInfo2: nutritionalInfoVal2  
  }

//Pushes the returnedRecipeObject into the allReturnedRecipes array and checks in the console that its property/value pairs look as expected. Saves the array to localStorage so it can be passed to the script controlling the new html page
allReturnedRecipes.push(returnedRecipeObject);
console.log('Recipe added:', allReturnedRecipes);
localStorage.setItem("recipes", JSON.stringify(allReturnedRecipes));

//Pushes the recipeDetailsObject into the allRecipeDetails array and checks in the console that its property/value pairs look as expected. Saves the array to localStorage so it can be passed to the script controlling the new html page.
allRecipeDetails.push(recipeDetailsObject);
console.log('Recipe details added:', allRecipeDetails);
localStorage.setItem("recipeinfo", JSON.stringify(allRecipeDetails));
}



//Call the function which will render the recipeDetails into the accordion on page 2 (results2.html) 
    renderRecipeDetails(allRecipeDetails)
    /*
    .then(function () {
        console.log('renderRecipeDetails completed successfully.');
        resolve(allRecipeDetails); // Resolve with recipe details
      })
      .catch(function (error) {
        console.error('Error in renderRecipeDetails', error);
        reject(error);
      });
      */
  } else {
  
  // Show the modal
  //var modalTriggerButton = document.getElementById('modalTriggerButton');
  var modal = new bootstrap.Modal(document.getElementById('exampleModal'));

  // Trigger the modal
  modal.show();
}
})
.catch(function (error) {
  reject(error);
});
});
};

/* DAN'S CODE
// Function to getMenuItems
function getMenuItems() {
    var menuItemsURL = `https://api.spoonacular.com/food/menuItems/search?query=${dishName}&apiKey=${apiKeySpnclr}`;
    return new Promise(function(resolve, reject) {
      // Dan's code
      console.log("hello")
      fetch(menuItemsURL)
      .then(function (response) {
        return response.json();
      })
      
      .then(function (data) { 
        var returnedResults = data;
                console.log(returnedResults);
        console.log("Restaurant Chain:")
        for (let i = 0; i < returnedResults.menuItems.length; i++) {
          console.log(i, returnedResults.menuItems[i].restaurantChain)         
        }
  
        console.log("Menu Item Names:")
        for (let i = 0; i < returnedResults.menuItems.length; i++) {
          console.log(i, returnedResults.menuItems[i].title)
        }
  
        console.log("Images:")
        for (let i = 0; i < returnedResults.menuItems.length; i++) {
          console.log(i, returnedResults.menuItems[i].image)
        }
  
        // iterate over results and list serving sizes info with i as the array placement
        console.log("Serving size:")
        for (let i = 0; i < returnedResults.menuItems.length; i++) {
          console.log(i, returnedResults.menuItems[i].servings, returnedResults.menuItems[i].unit)
        }
      })
  
      // Assuming there's a promise here... (yes, Dan's fetch request)
      someAsyncOperation()
        .then(function(result) {
          resolve(result);
        })
        .catch(function(error) {
          console.error('Error getting menu items:', error);
          reject(error);
        });
    });
  }
  */
  
  // DOM ready function
  function domReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

// DOM ready function
domReady(function () {
    console.log('DOM is ready.');
    // Attach click event listener after the DOM is loaded
    document.addEventListener('click', function (event) {
        console.log('Click event triggered.');
        // Check if the clicked element is a common element on both pages
        var commonElement = event.target.closest('.common-element-class');

        if (commonElement) {
            event.preventDefault();
            if (commonElement.id === 'button-addon2') {
                // Handle the click as if it's the search button
                console.log('Search button clicked.');


                // Use Promise.all to wait for getRecipes to complete
                getRecipes()
                .then(function (allRecipeDetails) {
                    console.log('getRecipes completed successfully:', allRecipeDetails);

                    // Add a delay before swapping out search.html to results2.html
                    setTimeout(function () {
                        // Call renderRecipeDetails to render recipe details
                        renderRecipeDetails(allRecipeDetails)
                            /*.then(function () {
                                console.log('renderRecipeDetails completed successfully.');
                                // Now redirect to results2.html
                                window.location.href = '/library/results2.html';
                            })
                            .catch(function (error) {
                                console.error('Error in renderRecipeDetails', error);
                            });
                            */
                            window.location.href = '/library/results2.html';
                    }, 0); // No delay
                })
                .catch(function (error) {
                    console.error('Error in getRecipes:', error);
                });
        }
    }
});
});



/*  replace lines 272 to 295 (DOMready function) with this once Dan's code is integrated 
  
  // Use DOMContentLoaded event
  domReady(function() {
    // Attach click event listener after the DOM is loaded
    searchBtnEl.addEventListener('click', function(event) {
      event.preventDefault();
  
      // Use Promise.all to wait for both getRecipes and getMenuItems to complete
      Promise.all([getRecipes(), getMenuItems()])
        .then(function() {
          // Swap out search.html and load results2.html after both asynchronous operations are complete
          window.location.href = 'results2.html';
        })
        .catch(function(error) {
          console.error('Error:', error);
        });
    });
  });

  */


  /* code for what happens when there's a click on "See Favourites" button p. 1
var seeFavesButton2 = document.getElementById("see-faves-2");
  seeFavesButton1.addEventListener("click", function () {
            window.location.href = '/library/favourites2.html';
        }; 

  //code for what happens when there's a click on "See" Favourites button p. 2  
    var seeFavesButton1 = document.getElementById("see-faves-1");
        seeFavesButton1.addEventListener("click", function () {
            window.location.href = '/library/favourites2.html';
        });
    
*/
