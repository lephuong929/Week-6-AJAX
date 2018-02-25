//Initial array of basketball players

var basketballPlayers = ["Lebron James", "Kevin Durant", "Kobe Bryant", "Stephen Curry", "Draymond Green", "Russell Westbrook", "James Harden", "Chris Paul", "Michael Jordan", "Kyrie Irving"];

// Function for creating basketball player buttons
renderButtons = function() {

	// Deleting the basketball player buttons prior to adding new basketball player buttons

	$("#buttonsLocation").empty();

	// Looping through the array of basektball players
	for (var i = 0; i < basketballPlayers.length; i++) {

	  // Then dynamicaly generating buttons for each basketball player in the array.

	  var basketballButton = $("<button>");
	  // Adding a class
	  basketballButton.addClass("basketball-button");
	  // Adding a data-attribute with a value of the basketball player at index i
	  basketballButton.attr("data-person", basketballPlayers[i]);
	  // Providing the button's text with a value of the basektball player at index i
	  basketballButton.text(basketballPlayers[i]);
	  // Adding the button to the HTML
	  $("#buttonsLocation").append(basketballButton);
	}
}

// Event listener for all button elements
$(".basketball-button").on("click", function() {
	// In this case, the "this" keyword refers to the button that was clicked
	var player = $(this).attr("data-person");

	// Constructing a URL to search Giphy for the name of the person who said the quote
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
	player + "&api_key=9Xq5z1nR5TL59F78aK2M5LlcXfCTrxgc&limit=10";

	// Performing our AJAX GET request
	$.ajax({
	url: queryURL,
	method: "GET"
	})
	// After the data comes back from the API
	.then(function(response) {
		// Storing an array of results in the results variable
		var results = response.data;
		console.log(response);

		// Looping over every result item
		for (var i = 0; i < results.length; i++) {

			// Only taking action if the photo has an appropriate rating
			if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
				// Creating a div with the class "item"
				var gifDiv = $("<div class='item'>");

				// Storing the result item's rating
				var rating = results[i].rating;

				// Creating a paragraph tag with the result item's rating
				var p = $("<p>").text("Rating: " + rating);

	        	// Creating an image tag
	        	var playerImage = $("<img>");

	        	// Giving the image tag an src attribute of a proprty pulled off the result item
	        	playerImage.attr("src", results[i].images.fixed_height.url);

				// Appending the paragraph to the "gifDiv" div
				gifDiv.append(p);
				gifDiv.append(playerImage);

				// Prepending the gifDiv to the "#gifLocation" div in the HTML
				$("#gifs-appear-here").prepend(gifDiv);
			}
		}
	});
});

renderButtons();