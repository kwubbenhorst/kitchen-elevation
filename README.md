# Kitchen-Elevation
A web app where foodies and home cooks can recreate restaurant dishes at home by searching for inspiration on restaurant menus and finding recipes by ingredient or dish name.  

## Description

Everybody eats. In terms of apps that speak to user-volume and user-value, food apps are always relevant to the largest pool of users. But how people eat is changing. Resources that can elevate the home-kitchen are of high value as the price of restaurant dining soars out of reach for many and as  specialty ingredients for globally inspired cuisines are much more known and available. In the silent generation (the homes we grew up in) the spice cupboard often consisted of salt and pepper, but in the millennials generation, many want to be chefs at home, plying the riches of the grocery store's exotic ingredients aisle, and making the most out of their Property Brothers redesigned "chef's kitchen" and their viewing of Gordon Ramsay's "Masterchef". 

The welcome page of our three page application reads as follows: "Wondering what to do with that can of artichokes you've had since forever? Found lamb on sale this week, but need some inspiration for how to prepare it? Want to recreate the amazing fish tacos you had at that trendy new gastro-pub? Feel like you should eat more kale but don't know how to make it tasty? Search by ingredient keyword eg. "artichoke", "lamb", "kale" etc. or by dish name eg. "fish tacos" to see what's on the menu in some of North America's top restaurants. If you've been here before and have some favourites saved, you may wish to head straight to your personal recipe archive." So a simple interface greets the user, inviting them to enter an ingredient or dish name in the input field, and hit "search". On the back end this application leverages the data-rich Spoonacular API to gather a list of restaurant menu items and a list of recipes with nutritional and other specs. These lists are presented on the second page of the application. Interactive interest and a clean look is given to the UI courtesy of the Bootstrap component library. Bootstrap IOHO is a wonderful resource except for its colours which scream "I used Bootstrap!" when not customized. All our custom colours were drawn from the beautiful food photography on the application's first and last page, the yellow from the lemons and olive oil, the green from the basil. Custom fonts for the application were also sourced from Google Fonts, and the choices represent a little "in joke" among the developers. Two of their names are "Patrick" and "Karla", so we chose the "Patrick Hand" font for the titles and the "Karla" font for the text. Happily they work together well, and combine the homeliness of a hand-written font with the sleekness of the sans serif Karla typeface. This is thematically what we want to combine in this application: home kitchens and elegant meal outcomes. Figma also helped us create a handsome logo for the project which can appear in browser tabs and help with search engine optimization.

So suppose our user has purchased a marked-down piece of halibut at the grocery store and is looking for inspiration as to how they can prepare it. This is where the list of menu items is useful. There they can read about halibut poached in vanilla with tarragon (an offering at Niagara's Peller Estates winery restaurant), and about Schank's Sports Grill's halibut with citrus and ginger. "Mmmm, citrus and ginger!" And as luck would have it, they find that "Soy Ginger Glazed Halibut with Ginger Peach Relish" is one of the two returns for their "halibut" search on the recipes side of the page. Opening the recipe details "drawer" they find that the soy ginger glazed halibut has beat out the steamed halibut by 57 likes. Steamed Halibut gets a check for "healthy" with only .44g of sugar and 233 calories a portion, but our user decides that the 16.74g of carbs in the one with the ginger peach relish is worth it. It's still suitable for gluten free, dairy free and pescatarian diets. 

Having made their choice the user clicks on the "get" button for the ginger glazed halibut and a recipe card appears, including a picture of the dish and a live link to the full recipe which come with blog notes (don't you hate how you always have to search through tons of blog notes before you get to the actual recipe on most sites? Our site presents the recipe first and gives you the link to the source if you want to know more). If the user really likes the recipe they can add it to their "favourites" by clicking on the heart button on the recipe card. A validation notice will pop up in a dialog box that their recipe has been saved.

Another cool feature of this page is that the user can click a button below the recipe details list or recipe card to get a suggestion for a cocktail that could be paired with their dish. The suggested cocktail feature uses the cocktail DB API and Bootstrap's dialog box component to provide both the name of the cocktail and how to make it (who doesn't like a G&T while creating restaurant-worthy dishes in their home kitchen? You have to do SOMETHING with the carcasses of those freshly squeezed limes)! If the user doesn't find what they need on this page they can use the "Back to Start" button at the top left of the screen to enter another ingredient or dish for their search, or using the "See Favourites" button on the top right, they can go to the application's third page which stores their personal archive of tried and proven recipe winners.

The application makes use of the local storage feature on the user's device to save recipes they have ear-marked. This minimal viable product (MVP) version of the application has room for 10 saved recipes, after which the first added are eliminated to make room for more to be saved. The user can also curate their "favourites" at any time by clicking on the X to remove the recipe individually, or they can click on "clear all" to clear all their stored content at once. If they do that they will be presented with a few food images revolving on a (bootstrap) carousel, and the names of the five developers.

The most frustrating challenge in development (besides resolving merge conflicts and navigating a thorny debugging issue where the solution had to do with the failure of different primitive data types to evaluate as exactly equal -- DOH!) was not being able to get data on restaurant menu items which we had originally hoped to source from another API than Spoonacular. The gold standard resource is MealMe but it comes with a $1500/month subscription price-tag. Spoonacular derives its menu item information which we ended up using from MealMe as well, but the data it provides is not nearly so complete. Another good option would have been the Open Menu API or the Fork the Spoon API, but the menu items search end point is deprecated with The Fork The Spoon and Open Menu API is also a paid service (reasonably priced at 2 cents per request) but only available to restaurant owners. As a result our page 2 menu items list is barer bones than we would have liked it to be. Exploring various APIs was educational. Some are very stingy with the data they allow you to access.  Tripadvisor was our first go-to for a menu item source because its website is the first go-to when in a new city looking for well-reviewed eateries nearby. But the filters you can apply at the front end on Trip Advisor don't translate into a generous store of information obtainable at the back end. YelpFusion has the same limitations -- no menu items available at all. 

A future direction in which we would like to take the next iteration of this project is to encorporate grocery store flyers in the user's local area, so that home chefs can virtually "visit the market" and shop like Europeans do -- not from their pre-determined recipe idea, but by what looks fresh and plentiful (and is on sale) at the market. The Flipp app is a wonderful resource for bringing together a shopper's local area flyers but they don't offer an API. Perhaps we will approach them with a proposal that we build them one!

Another opportunity for future development would be to allow a user to plan out a whole table d'hote menu for entertaining at home. There could even be a social networking feature to connect people hosting dinner parties in your area. Millennials are into good food, but they are more socially isolated while eating than people were in their parents' day. One of the purposes of food is to bring people together around a table. Once the skill-set is in place for creating great meals in the home, our guess is that our users will want to reach out and share their creations.

The third area for future development would be the amplification of the application's favourites functionality. In a past day every kitchen had shelves of recipe cookbooks and boxes of recipe cards indexed by dish-category (breads, soups, mains, desserts etc.) Now that we are more often accessing recipes through online sources it is often the experience that one finds a good recipe, makes a good dish, remembers it but can't find it again. It would be great to have ONE place to store all one's recipes. We would need to offer the user the ability to import recipes from other sources and to sort them. And we would need to expand the limit to many more than 10.

The application is response in design, mostly thanks to the use of Bootstrap's Grid for layout. Working with this on the development side has its challenges.  SO MANY closing div tags!  

Part of the learning involved in this undertaking was collaborating on a project with other developers. A shout-out must go to Allan in our group who was our designated git-hub trouble-shooter and our most avid project-board manager. All the team worked hard and engaged in the project with lots of good will. As we learn more about branching and the timing of our pushes and pulls the collaboration aspect will doubtless become less frustrating.  

## Installation
N/A

## Usage
This web application is deployed and ready for use on the World Wide Web. Please visit https://kwubbenhorst.github.io/kitchen-elevation 

The following screenshots provide a visual guide through the various features:







When you use the site please reach out to kwubbenhorst@yahoo.ca to share your user experience. As those committed to the values of the Agile Manifesto, the development team would love to hear user feedback to inform our next iteration.

## Credits

This application was created by Nicholas Lee, Patrick Li, Dan Nadler, Karla Wubbenhorst and Allan Yuen (alphabetical order), MVP presented in November of 2023. Besides the technologies and APIs referenced above, our application depends for much of its beauty on these images, sourced through Freepik.
Landing Page 
<a href="https://www.freepik.com/free-photo/salmon-with-ingredients-table_7486728.htm#page=2&query=food&position=23&from_view=keyword&track=sph">Image by valeria_aksakova</a> on Freepik 
Favourites Page and zoom on p2 background
<a href="https://www.freepik.com/free-photo/top-view-condiments-aromatic-herbs_972315.htm#query=food%20background%20basil%20olive%20oil&position=0&from_view=search&track=ais&uuid=a9efdd6a-96cb-4196-ba1d-072708c10209">Image by valeria_aksakova</a> on Freepik
Carousel Images:
Image by <a href="https://www.freepik.com/free-photo/top-view-table-full-food_21088367.htm#query=food&position=31&from_view=keyword&track=sph">Freepik</a>
<a href="https://www.freepik.com/free-photo/noodles-spicy-frying-pans-with-ingredients-black-cement-surface-top-view_6445389.htm?query=food#from_view=detail_alsolike">Image by jcomp</a> on Freepik
<a href="https://www.freepik.com/free-photo/whipped-cream-decadence-atop-fresh-berry-cheesecake-generated-by-ai_40968823.htm#page=6&query=dessert%20table&position=36&from_view=search&track=ais">Image by vecstock</a> on Freepik

## License 

Licensed under the MIT license









