
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

			success: function(data) {
				console.log("Success");
				console.log(data.artists.items[0].name);
				console.log(data.artists.items[0].images);
				displayInfo(data.artists.items);
				console.log(data.artists.items[0].images[0].url);

			},
			error: function() {
				console.log("Error");
				console.log(error.responseJSON);
			}
		});
	});

});

function displayInfo (artists) {
  artists.forEach(function (oneArtist) {
    var html = `
      <li>
        <p>Name: ${oneArtist.name}</p>
        <img src="${oneArtist.images[0].url}">
      </li>`;
    $(".js-artist-list").append(html);
  });
}


