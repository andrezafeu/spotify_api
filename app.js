
$(document).on("ready", function () {

	$(".js-search").on("click", function (event) {
		event.preventDefault();

		var searchedArtist = $('#query').val();
		console.log(searchedArtist);

		$.ajax({
			type: "get",
			url: "https://api.spotify.com/v1/search",
			data: {
				q: searchedArtist,
				type: 'artist'
			},

			success: function() {
				console.log("Success")
			},
			error: function() {
				console.log("Error")
				console.log(error.responseJSON)
			}
		});
	});
});
