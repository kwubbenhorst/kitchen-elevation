var accordionHeaderEls = document.querySelectorAll(".accordion-header");
var accordionBodyEls = document.querySelectorAll('.accordion-body');
var accordionBodyEl;
var accordionHeaderEl;
var allRecipeDetails = JSON.parse(localStorage.getItem("recipeinfo"));
var allReturnedRecipes = JSON.parse(localStorage.getItem("recipes"));
//var recipeCardContainer = document.querySelector('.recipe-card-container');

function renderRecipeCard(recipeId) {
  var selectedRecipe = allReturnedRecipes.find(function (recipe) {
    return recipe.id === recipeId || recipe.title === recipeId; // Adjust based on your needs
  });
  // Check if the recipe is found
  if (selectedRecipe) {
    // Access the elements in the recipe card within the context of the recipe card container
    var recipeCardContainer = document.querySelector('.recipe-card-container');
    var recipeTitleEl = recipeCardContainer.querySelector('.recipe-title');
    var servesAndTimeEl = recipeCardContainer.querySelector('.serves-and-time');
    var dishImageEl = recipeCardContainer.querySelector('.dish-image');
    var ingredientsListEl = recipeCardContainer.querySelector('.ingredients-list');
    var methodStepsListEl = recipeCardContainer.querySelector('.method-steps-list');
    var sourceLinkEl = recipeCardContainer.querySelector('.source-link');
    // Update the content of the recipe card
    recipeTitleEl.innerHTML = '<strong>' + selectedRecipe.title + '</strong>';
    servesAndTimeEl.textContent = 'Serves: ' + selectedRecipe.servings + ' | Ready in: ' + selectedRecipe.readyInMinutes + ' minutes';
    dishImageEl.src = selectedRecipe.image;
    // Update Ingredients List
    ingredientsListEl.innerHTML = ''; // Clear existing content
    selectedRecipe.ingredients.forEach(function (ingredient) {
      var ingredientItem = document.createElement('li');
      ingredientItem.textContent = ingredient;
      ingredientsListEl.appendChild(ingredientItem);
    });
    // Update Method Steps List
    methodStepsListEl.innerHTML = ''; // Clear existing content
    selectedRecipe.steps.forEach(function (step) {
      var stepItem = document.createElement('li');
      stepItem.textContent = step;
      methodStepsListEl.appendChild(stepItem);
    });
    // Update Source Link
    sourceLinkEl.href = selectedRecipe.sourceUrl;
    sourceLinkEl.textContent = 'Source: ' + selectedRecipe.sourceUrl;
    // Show the recipe card container
    var recipeCardContainer = document.querySelector('.recipe-card-container');
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
        return recipe.id === recipeId;
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
    var accordionContainer = document.querySelector('.accordion');
    accordionContainer.style.display = 'none';
  });

  // Append the "Get" button after the pre element
  accordionBodyEl.appendChild(getButton);        
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