$(document).on("ready", function () {

	$(".js-search-artist").on("click", function (event) {
		event.preventDefault();

		$('.js-artist-list').empty();

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
				console.log(data)
				// console.log(data.artists.items[0].name);
				// console.log(data.artists.items[0].images);
				displayInfo(data.artists.items);
				// console.log(data.artists.items[0].images[0].url);

			},
			error: function(error) {
				console.log("Error");
				console.log(error.responseJSON);
			}
		});
	});

	//selector of url                 "img class"
	$(".js-artist-list").on("click", ".js-albums", function (event) {
		event.preventDefault();

		alert("Album click");
		$('#myModal').modal('show') 
		var searchedArtist = $(event.currentTarget).data("artist-id");

		console.log(searchedArtist);

		$.ajax({
			type: "get",
			url: `https://api.spotify.com/v1/artists/${searchedArtist}/albums`,
			// data: {
			// 	q: searchedArtist.replace(" ","+"),
			// 	type: 'album'
			// },

			success: function(data) {
				console.log("Success");
				console.log(data);
				showAlbums(data.items);
				// showAlbums(data.albums.items[0].name);
				// console.log(data.artists.items[0].name);
				// shohwAlbum(data.artists.items);
			},
			error: function(error) {
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
        <img src="${oneArtist.images[0].url}" class="js-albums" data-artist-id="${oneArtist.id}">
      </li>`;
    $(".js-artist-list").append(html);
  });
}

function showAlbums (albums) {
	albums.forEach(function (oneAlbum) {
		var html = `
		<li>Album: ${oneAlbum.name}</li>
		`;
		$(".js-albums-list").append(html);
	});
}