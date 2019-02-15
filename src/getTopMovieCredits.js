const fetch = require('node-fetch');
const fs = require('fs');

const api_key = "XXXXXXX"

function getCreditsOfTopMovieOfYear(year) {
	if (year % 10 === 0)
		console.log(`retrieving movies from year ${year}...`)
	const page = 1;
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&year=${year}&with_runtime.gte=40`
	fetch(url).then(res => res.json())
			.then(json => {/* console.log(json); */return json.results;})
			.then(pageResults => {
				if (!pageResults || pageResults.length === 0) {
					movieCredits['byyear'][year] = null;
					return;
				}
				var topMovieID = pageResults[0].id
				fetch(`https://api.themoviedb.org/3/movie/${topMovieID}/credits?api_key=${api_key}`)
					.then(res => res.json())
					// .then(json => console.log({castMember: json.cast[0], crewMember: json.crew[0]}))
					.then(json => {
						movieCredits['byyear'][year] = json;
						movieCredits['byTMDbId'][topMovieID] = json;
					})
					.catch(err => console.error(err));
			})
			.catch(err => console.log(err))
}

function getCredits(fromYear, toYear) {
	if (fromYear > toYear) {
		fs.writeFile(`${__dirname}/../tmp/topCenturyMovies.json`, JSON.stringify(movieCredits), function(err) {
			if(err) {
				return console.log(err);
			}
			console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyBreakdowns.json !`);
		});
	} else {
		getCreditsOfTopMovieOfYear(fromYear);
		setTimeout(getCredits, 500, fromYear+1, toYear);
	}
}

var movieCredits = {
	byyear: {},
	byTMDbId: {}
}
getCredits(1900, 2018)