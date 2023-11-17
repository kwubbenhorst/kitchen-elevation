// JavaScript fetch to The Cocktail DB for random cocktail
async function cocktailSearch() {
	// code snippet from RapidAPI to retrieve data
	const url = 'https://the-cocktail-db.p.rapidapi.com/random.php';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '1a3f1da017msh10ee58dcc087ce5p15d541jsnae4add8bd141',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

const response = await fetch(url, options);
// Storing the response from API call into result
const result = await response.text();
console.log(result);
}


// ***********************************************
	// .then (function (response) {
	// 	console.log(response);
	// 	return console.log(response.json());
	// })
	// // return response.json();
	// .then(function (data) {
	// 	var drinkDataDetails = data;
	// 	console.log(drinks[1]);
	// 	console.log(drinkDataDetails);

	// })

// ************************************************
	
// 	// Storing the data in a form of JSON
// 	var drinkData = result();
// 	console.log(drinkData);
// 	if (result) {
// 		hideloader();
// 	}
// 	show (data);
// }

// // Call for Cocktail DB API
// cocktailSearch();

// // Function to hide the loader
// function hideloader() {
// 	document.getElementById('loading').style.display = 'none';
// }

// // Function top define innerHTML for HTML table
// function show(data) {
// 	let tab =
// 	`<tr>
// 		<th>idDrink</th>
// 		<th>Drink</th>
// 		<th>Tags</th>
// 		<th>Video</th>
// 		<th>Category</th>
// 		<th>IBA</th>
// 		<th>Alcoholic</th>
// 		<th>Instructions</th>
// 		<th>InstructionsES</th>
// 		<th>InstructionsDE</th>
// 		<th>InstructionsFR</th>
// 		<th>InstructionsIT</th>
// 		<th>InstructionsZH-HANS</th>
// 		<th>InstructionsZH-HANT</th>
// 		<th>DrinkThumb</th>
// 		<th>Ingredient1</th>
// 		<th>Ingredient2</th>
// 		<th>Ingredient3</th>
// 		<th>Ingredient4</th>
// 		<th>Ingredient5</th>
// 		<th>Ingredient6</th>
// 		<th>Ingredient7</th>
// 		<th>Ingredient8</th>
// 		<th>Ingredient9</th>
// 		<th>Ingredient10</th>
// 		<th>Ingredient11</th>
// 		<th>Ingredient12</th>
// 		<th>Ingredient13</th>
// 		<th>Ingredient14</th>
// 		<th>Ingredient15</th>
// 		<th>Measure1</th>
// 		<th>Measure2</th>
// 		<th>Measure3</th>
// 		<th>Measure4</th>
// 		<th>Measure5</th>
// 		<th>Measure6</th>
// 		<th>Measure7</th>
// 		<th>Measure8</th>
// 		<th>Measure9</th>
// 		<th>Measure10</th>
// 		<th>Measure11</th>
// 		<th>Measure12</th>
// 		<th>Measure13</th>
// 		<th>Measure14</th>
// 		<th>Measure15</th>
// 		<th>ImageSource</th>
// 		<th>ImageAttribution</th>
// 		<th>CreativeCommonsConfirmed</th>
// 		<th>dateModified</th>
// 	</tr>`;

// 	// Loop to access all rows
// 	for (let r of data.list) {
// 		tab += `<tr>
// 		<td>${r.idDrink} </td>
// 		<td>${r.strDrink} </td>
// 		<td>${r.strTags} </td>
// 		<td>${r.strVideo} </td>
// 		<td>${r.strCategory} </td>
// 		<td>${r.strIBA} </td>
// 		<td>${r.strAlcoholic} </td>
// 		<td>${r.strInstructions} </td>
// 		<td>${r.strInstructionsES} </td>
// 		<td>${r.strInstructionsDE} </td>
// 		<td>${r.strInstructionsFR} </td>
// 		<td>${r.strInstructionsIT} </td>
// 		<td>${r.strInstructionsZH-HANS} </td>
// 		<td>${r.strInstructionsZH-HANT} </td>
// 		<td>${r.strDrinkThumb} </td>
// 		<td>${r.strIngredient1} </td>
// 		<td>${r.strIngredient2} </td>
// 		<td>${r.strIngredient3} </td>
// 		<td>${r.strIngredient4} </td>
// 		<td>${r.strIngredient5} </td>
// 		<td>${r.strIngredient6} </td>
// 		<td>${r.strIngredient7} </td>
// 		<td>${r.strIngredient8} </td>
// 		<td>${r.strIngredient9} </td>
// 		<td>${r.strIngredient10} </td>
// 		<td>${r.strIngredient11} </td>
// 		<td>${r.strIngredient12} </td>
// 		<td>${r.strIngredient13} </td>
// 		<td>${r.strIngredient14} </td>
// 		<td>${r.strIngredient15} </td>
// 		<td>${r.strMeasure1} </td>
// 		<td>${r.strMeasure2} </td>
// 		<td>${r.strMeasure3} </td>
// 		<td>${r.strMeasure4} </td>
// 		<td>${r.strMeasure5} </td>
// 		<td>${r.strMeasure6} </td>
// 		<td>${r.strMeasure7} </td>
// 		<td>${r.strMeasure8} </td>
// 		<td>${r.strMeasure9} </td>
// 		<td>${r.strMeasure10} </td>
// 		<td>${r.strMeasure11} </td>
// 		<td>${r.strMeasure12} </td>
// 		<td>${r.strMeasure13} </td>
// 		<td>${r.strMeasure14} </td>
// 		<td>${r.strMeasure15} </td>
// 		<td>${r.strImageSource} </td>
// 		<td>${r.strImageAttribution} </td>
// 		<td>${r.strCreativeCommonsConfirmed} </td>
// 		<td>${r.dateModified} </td>
// 		</tr>`;
// 	}