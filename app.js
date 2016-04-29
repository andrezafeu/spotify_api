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
				displayInfo(data.artists.items);
			},
			error: function(error) {
				console.log("Error");
				console.log(error.responseJSON);
			}
		});
	});

$(".js-search-track").on("click", function (event) {
		event.preventDefault();

		$('.js-track-list').empty();

		var searchedTrack = $('#query_track').val();
		console.log(searchedTrack);

		$.ajax({
			type: "get",
			url: "https://api.spotify.com/v1/search",
			data: {
				q: searchedTrack,
				type: 'track'
			},

			success: function(data) {
				console.log("Success");
				console.log(data)
				displayTrack(data.tracks.items);
				// displayTrackArtist(data.tracks.items);
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

function displayTrack (tracks) {
	tracks.forEach(function (oneTrack) {
		console.log(tracks)
		// console.log(oneTrack.name)
		// console.log(oneTrack.artists[0].name);
		var html_track = `
			<li>
        		<p>Name: ${oneTrack.name}</p>
      		</li>`;
      	$(".js-track-list").append(html_track);
      displayTrackArtist(oneTrack);
    })
}

function displayTrackArtist (track_artists) {
	track_artists.artists.forEach(function (oneTrackArtist) {
		var html_track_artist = `
			<li>
        		<p>Name: ${oneTrackArtist.name}</p>
      		</li>`;
      	$(".js-track-list").append(html_track_artist);
	})
}

function showAlbums (albums) {
	albums.forEach(function (oneAlbum) {
		var html = `
		<li>Album: ${oneAlbum.name}</li>
		`;
		$(".js-albums-list").append(html);
	});
}