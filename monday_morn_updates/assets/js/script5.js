// Calculate the index for the colour in the gradientColours array
  document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM is ready.");

  // Call seeFaves after the DOM is loaded
  seeFaves();

// Function to reset the faves array in local storage to an empty array
function clearAllFaves() {
  localStorage.setItem("faves", JSON.stringify([]));
    // Hide the favourites lists
    document.querySelector(".favourites-list-1").style.display = "none";
    document.querySelector(".favourites-list-2").style.display = "none";
    // Show the carousel and credits
    document.querySelector(".carousel-container").style.display = "block";
    document.querySelector(".credits").style.display = "block";
    console.log('Faves in local storage after clear-all:', JSON.parse(localStorage.getItem('faves')));
  }

function handleItemClick(itemElement, title) {
  // Remove the item from the UI
  itemElement.remove();
  
  // Remove the item from the array of favorites in local storage
  var faves = JSON.parse(localStorage.getItem("faves")) || [];
  var updatedFaves = faves.filter(function (item) {
    return item.title !== title;
  });
  
  localStorage.setItem("faves", JSON.stringify(updatedFaves));

  // Log the updated faves array
  console.log('Updated faves array:', updatedFaves);
}
  

//FUNCTION SEE FAVES --------------------------------------------------------------
  // called either from a click on see-faves-1 or see-faves-2.  This function is responsible for dynamically generating the 
  // favourites list items, which content it retrieves from localStorage.
  function seeFaves() {
    var faves = JSON.parse(localStorage.getItem("faves")) || []; // Retrieve favourites from local storage or the empty array if they have only just been initialized
    var length = faves.length;
    var lengthOfFavouritesListEl1 = Math.floor(length / 2); // Round down to the nearest whole number
    var lengthOfFavouritesListEl2 = lengthOfFavouritesListEl1 + (length % 2); // If length is odd, add 1 to the second list

    var favouritesListEl1 = document.querySelector(".favourites-list-1");
    var favouritesListEl2 = document.querySelector(".favourites-list-2");

    console.log("Length of faves:", faves.length);
    console.log("Length of favouritesListEl1:", lengthOfFavouritesListEl1);
    console.log("Length of favouritesListEl2:", lengthOfFavouritesListEl2);
  
    // In case this function gets called when there is content from a previous rendering of the favourites List, the function begins by clearing this out so that there is room for a new dynamic generation of the list group.
    favouritesListEl1.innerHTML = "";
    favouritesListEl2.innerHTML = "";
    
    // Array of colors for the gradient (I want to give my individual list items these bg colors)
    var gradientColours = ["#336C41", "#407D26", "#4C8E2B", "#589F30", "#5F8C17"];

    function createListItem(title, container, index, totalItems) {
      var listItem = document.createElement("li");
    
      // Create a div for the custom symbol
      var customSymbol = document.createElement("div");
      customSymbol.className = "custom-symbol";
      customSymbol.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="20" height="20">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="15" y2="15"></line>
          <line x1="15" y1="9" x2="9" y2="15"></line>
        </svg>
        <span>${title}</span>
      `;
    
      // Calculate the index for the color in the gradientColours array
      var colourIndex = Math.floor((index / (totalItems - 1)) * (gradientColours.length - 1));
    
      // Apply styling to the list item
      listItem.style.backgroundColor = gradientColours[colourIndex];
    
      // Attach a click event listener to the custom symbol and use it to call the handleItemClick function
      customSymbol.addEventListener("click", function () {
        handleItemClick(listItem, title);
      });
      
    
      listItem.appendChild(customSymbol);
      container.appendChild(listItem);
    }
    
    // Clear the previous content of the lists
    favouritesListEl1.innerHTML = "";
    favouritesListEl2.innerHTML = "";
    
    for (var p = 0; p < lengthOfFavouritesListEl1; p++) {
      var aGroupOneFavourite = faves[p];
      createListItem(aGroupOneFavourite.title, favouritesListEl1, p, lengthOfFavouritesListEl1);
    }
    
    for (var q = lengthOfFavouritesListEl1; q < length; q++) {
      var aGroupTwoFavourite = faves[q];
      createListItem(aGroupTwoFavourite.title, favouritesListEl2, q - lengthOfFavouritesListEl1, length - lengthOfFavouritesListEl1);
    }

    // Event listeners
  document.getElementById("back-to-search-2").addEventListener("click", function () {
    window.location.href = "../index.html";
  });

  //Clear-all button click handler, replaces the lists with the carousel and credits.
  document.getElementById("clear-all-faves-btn").addEventListener("click", clearAllFaves);
}});

   