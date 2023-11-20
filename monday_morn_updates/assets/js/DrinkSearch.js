// JavaScript fetch to The Cocktail DB for random cocktail

async function getDrinkData() {
	// Code snippet provided from RapidAPI to execute call function on the Cocktail DB API
	const url = 'https://the-cocktail-db.p.rapidapi.com/random.php';
	const options = {
		method: 'GET',
		headers: {
		'X-RapidAPI-Key': '1a3f1da017msh10ee58dcc087ce5p15d541jsnae4add8bd141',
		'X-RapidAPI-Host': 'the-cocktail-db.p.rapidapi.com'
	}
};

const display = document.querySelector("#display-drinkData");

const response = await fetch(url, options);
const result = await response.json();
return result;
}

const displayDrink = async () => {
	// Acquiring the API payload from The Cocktail DB on a random drink selection
	const payload = await getDrinkData();
	// console.log(payload);

	// Accessing the first nested array from the payload
	const {drinks} = payload;
	// console.log(drinks);

	// Accessing the second nested array within the same payload
	let drinkData = drinks[0];

	document.getElementById("drinkName").innerHTML = drinkData.strDrink;
	console.log(drinkData.strDrink);
	
	document.getElementById("drinkImage").src = drinkData.strDrinkThumb;
	document.getElementById("drinkImage").alt = "Sample image of " + drinkData.strDrink;
	console.log(drinkData.strDrinkThumb);

	document.getElementById("drinkType").innerHTML = drinkData.strAlcoholic;
	console.log(drinkData.strAlcoholic);

	document.getElementById("drinkGlassWare").innerHTML = drinkData.strGlass;
	console.log(drinkData.strGlass);

	document.getElementById("drinkInstructions").innerHTML = drinkData.strInstructions;
	console.log(drinkData.strInstructions);

	// Shows capture of all available data being returned from triggered API call to the Cocktail DB
	console.log(drinkData);
	return;
};