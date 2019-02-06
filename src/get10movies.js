const fetch = require('node-fetch');
const fs = require('fs');

const api_key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

function getTopMovieOfYears(fromYear, toYear) {
    const discoverPromises = []
    const page = 1;
	for (var year = fromYear; year <= toYear; year++) {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&year=${year}&with_runtime.gte=40`
		discoverPromises.push(fetch(url)
			.then(res => res.json())
			.then(json => json.results)
			.catch(err => console.log(err)))
	}
	
	return Promise.all(discoverPromises) 
		.then(async pagesResults => {
			const movieIDs = [];
			var movieMap = {}
			// const creditPromises = []
			for (var i = 0; i <= toYear-fromYear; i++) {
				var topMovieID = pagesResults[i][0].id
				var topMovieTitle = pagesResults[i][0].title
				// creditPromises.push(getMovieCrew(topMovieID))
				var year = fromYear+i
				await Promise.resolve(getMovieCrew(topMovieID))
					.then(crew => {
						// var breakdown = getBreakdown(crew)
						movieMap[year.toString()] = {tmdb_id: topMovieID, title:topMovieTitle, year: year, crew: crew}; 
						// console.log(crew)
					});
				movieIDs.push(topMovieID)
			}
			return movieMap;
		})
		.catch(err => console.error(err));
}

function getMovieCrew(id) {

	return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`)
		.then(res => res.json())
		.then(json => json.crew)
		.then(crew => {
			const crewNames = [];
			for (let i = 0; crew != undefined && i < crew.length; i++) {
				crewNames.push({credit_id: crew[i].credit_id ,name: crew[i].name});
			}
			return crewNames;
		})
		.catch(err => console.error(err));
}

function getBreakdown(crew) {

	console.log(crew[0])
}

function writeToJson(yearMovieIDs) {

	fs.writeFile(`${__dirname}/../tmp/topMovieIDs.json`, JSON.stringify(yearMovieIDs), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topMovieIDs.json !`);
	});
}

// getTopMovieOfYears(2008, 2018).then(movieMap => writeToJson(movieMap))
var data = fs.readFileSync(`${__dirname}/../tmp/crew_2008-2017.json`, 'utf8');
var credits = JSON.parse(data);
var creditMap = {};
for (var sequenceIndex = 0; sequenceIndex < credits.length; sequenceIndex++) {
	var sequence = credits[sequenceIndex]
	for (var crewmemberIndex = 0; crewmemberIndex < credits[sequenceIndex].length; crewmemberIndex++) {
		let year = 2008 + sequenceIndex;
		let name = sequence[crewmemberIndex].name
		let credit_id = sequence[crewmemberIndex].credit_id
		let job = sequence[crewmemberIndex].job
		if (creditMap[year.toString()] != undefined) {
			if (creditMap[year.toString()][job] != undefined) {
				creditMap[year.toString()][job] += 1
			} else {
				creditMap[year.toString()][job] = 1
			}
		} else {
			creditMap[year.toString()] = {};
		}
	}
}
console.log(creditMap)
