
var images = [
	"Ape",
	"Bison",
	"Cat",
	"Cheetah",
	"Chicken",
	"Chimpanzee",
	"Coyote",
	"Dog",
	"Dolphin",
	"Eagle",
	"Elephant",
	"Fish",
	"Fox",
	"Giraffe",
	"Gorilla",
	"Hawk",
	"Jaguar",
	"Kangaroo",
	"Lion",
	"Monkey",
	"Penguin",
	"Pig",
	"Quetzal",
	"Rhinoceros",
	"Scorpion",
	"Tiger",
	"Turkey",
	"Turtle",
	"Vulture",
	"Weasel",
	"Whale",
	"Wolf",
	"Zebra"
];

renderButtons();

function imageClick() {
	
	console.log("image click");
	$(".thumbnail-image").on("click", function () {

		// Creating and storing an image tag
		//var imageSrc = $("thumbnail-image");
		var state = $(this).attr("src_state");

		// Setting the src attribute of the image to a property pulled off the result item
		console.log("state: "+state);
		if (state == "still") {
			src = $(this).attr("src_animate");
			state = "animate";
		}
		else {
			src = $(this).attr("src_still");
			state = "still";
		}
		$(this).attr("src_state", state);
		$(this).attr("src", src);

	});
}

// Function for displaying movie data
function renderButtons() {

	console.log("rendering buttons")
	$("#buttons-view").empty();

	// Looping through the array of movies
	for (var i = 0; i < images.length; i++) {

		var a = $("<button>");
		// Adding a class
		a.addClass("images");
		// Adding a data-attribute with a value of the movie at index i
		a.attr("data-name", images[i]);
		// Providing the button's text with a value of the movie at index i
		a.text(images[i]);
		// Adding the button to the HTML
		$("#buttons-view").append(a);
	}
	clickBtn();
}


// This function handles events where one button is clicked
$("#add-image").on("click", function (event) {
	// event.preventDefault() prevents the form from trying to submit itself.
	// We're using a form so that the user can hit enter instead of clicking the button if they want
	event.preventDefault();
	console.log("entering add image event");

	// This line will grab the text from the input box
	var animal = $("#image-input").val().trim();
	console.log("animal: " + animal);

	// The movie from the textbox is then added to our array
	images.push(animal);

	// calling renderButtons which handles the processing of our movie array
	renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of movies

function clickBtn() {

	$("button").on("click", function () {

		$("#images-view").empty();
		// Grabbing and storing the data-animal property value from the button
		var animal = $(this).attr("data-name");
		console.log("clicked on image: " + animal);

		// Constructing a queryURL using the animal name
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
			animal + "&api_key=" + api_key + "&limit=10";

		// Performing an AJAX request with the queryURL
		$.ajax({
			url: queryURL,
			method: "GET"
		})
			// After data comes back from the request
			.then(function (response) {
				console.log(queryURL);
				console.log(response);
				// storing the data from the AJAX request in the results variable
				var results = response.data;

				var rowDiv = $("<div>");
				rowDiv.attr("id", "row1");
				rowDiv.attr("class", "thumbnail-row");
				$("#images-view").append(rowDiv);

				row = 0;
				// Looping through each result item
				console.log("results.length: "+results.length)
				for (var i = 0; i < results.length; i++) {
					if (i % 3 == 0) {
						row++;
						if (i != 0) {
							var rowDiv = $("<div>");
							rowDiv.attr("id", "row" + row);
							rowDiv.attr("class", "thumbnail-row");
							$("#images-view").append(rowDiv);
						}
					}
					// Creating and storing a div tag
					var animalDiv = $("<div>");

					// Creating a paragraph tag with the result item's rating
					//var p = $("<p>").text("Rating: " + results[i].rating);

					// Creating and storing an image tag
					var animalImage = $("<img>");
					// Setting the src attribute of the image to a property pulled off the result item
					animalImage.attr("src", results[i].images.fixed_height_still.url);
					animalImage.attr("src_still", results[i].images.fixed_height_still.url);
					animalImage.attr("src_animate", results[i].images.fixed_height.url);
					animalImage.attr("src_state", "still");
					animalImage.attr("class", "thumbnail-image");

					// Appending the paragraph and image tag to the animalDiv
					//animalDiv.append(p);
					animalDiv.append(animalImage);

					// Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
					$("#row" + row).append(animalDiv);
					// put click image function call here
				}
				imageClick();
			});
		renderButtons();
		console.log("exiting click button");
	});
}