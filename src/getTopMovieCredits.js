const fetch = require('node-fetch');
const fs = require('fs');

const api_key = "4ba39d95ffe0232643f0ad3d6b824b30"

var redoMovieYears = new Array(4);
for (let i = 0; i < 4; i ++) {
	redoMovieYears[i] = [];
}

function getCreditsOfTopMovieOfYear(year, runtime) {
	if (year % 10 === 0)
		console.log(`retrieving movies from year ${year}...`)
	const page = 1;
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&year=${year}&with_runtime.gte=${runtime}`
	fetch(url).then(res => res.json())
			.then(json => {/* console.log(json); */return json.results;})
			.then(pageResults => {
				// If there was no movie returned in the page
				if (!pageResults || pageResults.length === 0) {
					movieCredits['byyear'][year] = null;
					console.log(`Entering null for year ${year} when runtime is set to ${runtime}`)
					redoMovieYears[(40-runtime)/10].push(year);
					return;
				}
				var topMovieID = pageResults[0].id
				fetch(`https://api.themoviedb.org/3/movie/${topMovieID}/credits?api_key=${api_key}`)
					.then(res => res.json())
					.then(json => {
						// If there was no credits or crew under the top movie.
						if (json.cast.length === 0 && json.crew.length === 0) {
							movieCredits['byyear'][year] = null;
							console.log(`Entering null for year ${year} when runtime is set to ${runtime}`)
							redoMovieYears[(40-runtime)/10].push(year);
							return;
						}
						movieCredits['byyear'][year] = json;
						movieCredits['byTMDbId'][topMovieID] = json;
					})
					.catch(err => console.error(err));
			})
			.catch(err => console.log(err))
}


function getCredits(fromYear, toYear) {
	if (fromYear > toYear) {
		console.log(redoMovieYears)
		var found = false;
		for (var i = 0; i < redoMovieYears.length; i++) {
			if (redoMovieYears[i].length !== 0) {
				found = true;
			}
		}
		if (!found) {
			// Give it time to retrieve and store the last response. 
			setTimeout(writeToJSON, 2000, movieCredits);
		} else {
			for (var i = 0; i < redoMovieYears.length; i++) {
				for (var j = 0; j < redoMovieYears[i].length; j++) {
					var year = redoMovieYears[i].pop()
					console.log(`Reattempting credits retrieval for ${year}...`);
					getCreditsOfTopMovieOfYear(year, 40-(i+1)*10);
					setTimeout(getCredits, 500, fromYear, toYear);
					return;
				}
			}
			console.log(`Something broke.`);
		}
	} else {
		getCreditsOfTopMovieOfYear(fromYear, 40);
		setTimeout(getCredits, 500, fromYear+1, toYear);
	}
}

function writeToJSON(movieCredits) {
	fs.writeFile(`${__dirname}/../tmp/topCenturyMovies.json`, JSON.stringify(movieCredits), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyMovies.json !`);
	});
}

var movieCredits = {
	byyear: {},
	byTMDbId: {}
}
getCredits(1900, 2018)