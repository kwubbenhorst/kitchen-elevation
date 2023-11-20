var favouritesListEl1 = document.querySelector('favourites-list-1');
var favouritesListEl2 = document.querySelector('favourites-list-2');
var heartBtnEl = document.querySelector(".heart-btn");
var recipesBlurb = document.getElementById('recipes-blurb');
var titleRecipesHalfPage = document.getElementById('title-recipes-half-page');
var backNavButton = document.getElementById("back-nav-1");
var backToSearchButton1 = document.getElementById("back-to-search-1");
var seeFavesButton2 = document.getElementById("see-faves-2");
var accordionContainer = document.querySelector('.accordion');
var accordionHeaderEls = document.querySelectorAll(".accordion-header");
var accordionBodyEls = document.querySelectorAll('.accordion-body');
var accordionBodyEl;
var accordionHeaderEl;
var allRecipeDetails = JSON.parse(localStorage.getItem("recipeinfo"));
var allReturnedRecipes = JSON.parse(localStorage.getItem("recipes"));
var ingredientOrDishName = localStorage.getItem('ingredientOrDishName');
//var recipeCardContainer = document.querySelector('.recipe-card-container');

function renderRecipeCard (recipeObject) {
  var selectedRecipe = allReturnedRecipes.find(function (recipe) {
    return recipe.id === recipeObject.id || recipe.title === recipeObject.title; 
  });
  // Check if the recipe is found
if (selectedRecipe) {
  // Access the elements in the recipe card within the context of the recipe card container
  var recipeCardContainer = document.querySelector('.recipe-card-container');
  var recipeTitleEl = recipeCardContainer.querySelector('.recipe-title');
  var servesAndTimeEl = recipeCardContainer.querySelector('.serves-and-time');
  var dishImageEl = recipeCardContainer.querySelector('.dish-image');
  var ingredientsListElLeft = recipeCardContainer.querySelector('.ingredients-list-col-left');
  var ingredientsListElRight = recipeCardContainer.querySelector('.ingredients-list-col-right');
  var methodStepsListEl = recipeCardContainer.querySelector('.recipe-card-method-row .method-steps-list');
  var sourceLinkEl = recipeCardContainer.querySelector('.recipe-card-source-url .source-link');
  var heartButton = recipeCardContainer.querySelector('.heart-btn');

  // Update the content of the recipe card
  recipeTitleEl.innerHTML = '<strong>' + selectedRecipe.title + '</strong>';
  servesAndTimeEl.textContent = 'Serves: ' + selectedRecipe.servings + ' | Ready in: ' + selectedRecipe.readyInMinutes + ' minutes';
  dishImageEl.src = selectedRecipe.image;

  // Update Ingredients List
  ingredientsListElLeft.innerHTML = ''; // Clear existing content
  ingredientsListElRight.innerHTML = ''; // Clear existing content

  selectedRecipe.ingredients.forEach(function (ingredient, index) {
    var ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;

    // Distribute ingredients between left and right columns
    if (index % 2 === 0) {
      ingredientsListElLeft.appendChild(ingredientItem);
    } else {
      ingredientsListElRight.appendChild(ingredientItem);
    }
  });

  console.log('Method Steps:', selectedRecipe.steps);

  // Update Method Steps List
  methodStepsListEl.innerHTML = ''; // Clear existing content
  if (selectedRecipe.steps && selectedRecipe.steps.length > 0) {
    // If there are steps, append them to the list
    selectedRecipe.steps.forEach(function (step) {
      var stepItem = document.createElement('li');
      stepItem.textContent = step;
      methodStepsListEl.appendChild(stepItem);
    });
  } else {
    // If there are no steps, display a message
    var noStepsMessage = document.createElement('li');
    noStepsMessage.textContent = "Not all recipes in our collection list their steps. In this case, check out the recipe at its source (the link below), where the instructions may be given.";
    methodStepsListEl.appendChild(noStepsMessage)
  }

  // Update Source Link
  sourceLinkEl.href = selectedRecipe.sourceUrl;
  sourceLinkEl.textContent = 'Source: ' + selectedRecipe.sourceUrl;

  // Show the recipe card container
  recipeCardContainer.style.display = 'block';
}
}

function renderRecipeDetails(allRecipeDetails) {
    console.log("Rendering recipe details");
    //wrapping this function in a promise so its asynchronous activity has a chance to complete before the program moves on
    //return new Promise(function (resolve, reject) { 
        //setTimeout(function () {
            console.log('renderingRecipeData');

    // Iterate through each accordion section
    for (var i = 0; i < accordionHeaderEls.length; i++) {
        (function() {
            var recipeDetail = allRecipeDetails[i]; 
        
          accordionHeaderEl = accordionHeaderEls[i];
          accordionBodyEl = accordionBodyEls[i];
  
      // Check if there is a corresponding recipe detail
      if (i < allRecipeDetails.length) {
        // Populate accordion header with the title
        accordionHeaderEl.querySelector('button').textContent = recipeDetail.title;
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
        content += '<br><strong>Nutrition per portion:</strong> ' + recipeDetail.nutritionalInfo1 + '<br>&emsp;' + recipeDetail.nutritionalInfo2;

        // Add diets information
        if (recipeDetail.diets.length > 0) {
          content += '<br><strong>Suitable for:</strong> ' + recipeDetail.diets.join(', ');
        }
        // Set the innerHTML of the accordion body with the generated content
        accordionBodyEl.innerHTML = '<pre>' + content + '</pre>';
        
        // Create and append the "Get" button dynamically
        var getButton = document.createElement('button');
        getButton.type = 'button';
        getButton.className = 'btn btn-primary get';
        getButton.textContent = 'Get';
        // Capture the recipe id
        var recipeId = getButton.dataset.recipeId;
        getButton.dataset.recipeId = recipeDetail.id;
                    //var recipeId;
        // Add click listener to the "Get" button
        getButton.addEventListener('click', function() {
        // Access the recipe id using the dataset property
        recipeId = this.dataset.recipeId;
        console.log('Recipe ID:', recipeId);

        // Find the selected recipe by ID in the allReturnedRecipes array
        var selectedRecipe = allReturnedRecipes.find(function(recipe) {
        return recipe.id === Number(recipeId);
//THIS BIT OF CODE IS NOT WORKING
        // Create a new column
        var navColumn = document.createElement('div');
        navColumn.className = 'col-md-1';
        navColumn.id = 'recipe-nav-column';

        // Change the span of the p element to 11 columns
        var resultsPageBlurb = document.getElementById('results-page-blurb');
        resultsPageBlurb.classList.remove('col-md-12');
        resultsPageBlurb.classList.add('col-md-11');
        
        // Change the display property on the nav element to inline
        navColumn.style.display = 'inline';
        // Display the backNavButton which is hardcoded but set to display none by default
        backNavButton.style.display = 'inline';

        // Append the new column to the row
        var blurbAndNavRow = document.querySelector('.blurb-and-nav-row');
        blurbAndNavRow.appendChild(navColumn);
//END OF NON WORKING BIT OF CODE
      });

        // Pass the selected recipe to the renderRecipeCard function
        renderRecipeCard(selectedRecipe);
      

     /*
        // Add click listener to the "Get" button
        getButton.addEventListener('click', function() {
        // Access the recipe id using the dataset property
        recipeId = this.dataset.id;
        console.log('Recipe ID:', recipeId);
        console.log('Recipe Detail:', recipeDetail);
        // Find the selected recipe by ID in the allReturnedRecipes array
        var selectedRecipe = allReturnedRecipes.find(function(recipe) {
        return recipe.id === recipeId;
      }); 
      

  // Pass the selected recipe to the renderRecipeCard function
  renderRecipeCard(selectedRecipe);
  */            

    // Hide the accordion
    accordionContainer.style.display = 'none';
  });

  // Append the "Get" button after the pre element
  accordionBodyEl.appendChild(getButton);
  
  // Update the h1 element with id "title-recipes-half-page"
  titleRecipesHalfPage.textContent = 'Get Cookin\'!';
  // Update the p element with id "recipes-blurb"
  recipesBlurb.textContent = 'Hopefully this recipe is perfect. If you love it, you can save it to “Favourites” by clicking the heart. If it’s not to your liking, use the back button to return to the list of your search results, and get another. Meanwhile, why not mix a cocktail?';
} else {
    // If there's no corresponding recipe detail, clear the accordion title and body
    accordionHeaderEl.querySelector('button').textContent = '';
    accordionBodyEl.innerHTML = '';

    // Set button visibility to hidden
    //accordionBodyEl.querySelector('.get').style.visibility = 'hidden';
  }
})();
}

    // Resolve the promise with the recipeId
    //resolve(recipeId);
 
       console.log("Recipe details rendered successfully");
    //}, 100);    
  //});
}

renderRecipeDetails(allRecipeDetails);

//EVENT LISTENERS FOR BACK-NAV BUTTON, BACK-TO-SEARCH AND SEE-FAVOURITES

backNavButton.addEventListener('click', function () {
    renderRecipeDetails(allRecipeDetails);
    recipeNavColumn.style.display = 'none';
  });


backToSearchButton1.addEventListener('click', function() {
    window.location.href = '../library/search.html';
  });

seeFavesButton2.addEventListener("click", function () {
  window.location.href = '../library/favourites.html';
  });

//I also want to add some modal functionality to this script when the user adds an item to local storage.  The modal is from jQuery

  $( function() {
    $( "#dialog-message" ).dialog({
      modal: true,
      buttons: {
        Ok: function() {
          $( this ).dialog( "close" );
        }
      }
    });
  } );