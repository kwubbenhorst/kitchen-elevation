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

	let drinkName = drinkData.strDrink;
	console.log(drinkName);
	let drinkImage = drinkData.strDrinkThumb;
	console.log(drinkImage);
	let drinkType = drinkData.strAlcoholic;
	console.log(drinkType);
	let drinkGlassWare = drinkData.strGlass;
	console.log(drinkGlassWare);
	let drinkInstructions = drinkData.strInstructions;
	console.log(drinkInstructions);

	
	return `
            <div class="container">
              <p>${drinkName}</p>
              <p>${drinkName}></p>
              <p>${drinkType}</p>
              <p>${drinkGlassWare}</p>
              <p>${drinkInstructions}</p>
            </div>
            `
	display.innerHTML = drinkData;
	
	console.log(drinkData);
	return;
};

displayDrink();