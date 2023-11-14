//var apiKey = "FA3E81E19F3B42B7A643E24061FE3F75";
//var tripAdvisorApiUrl = "https://api.content.tripadvisor.com/api/v1/location/{locationId}/details";


//pull up foodiefetch api search engine for menus based on restaurant name then log in console.
const settings = {
	async: true,
	crossDomain: true,
	url: 'https://foodiefetch.p.rapidapi.com/swiggy?query=grandamas%20cafe%20pune',
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4c70b19a2cmshf9ab844cd954040p1b87edjsncdb9e4b8e3df',
		'X-RapidAPI-Host': 'foodiefetch.p.rapidapi.com'
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
