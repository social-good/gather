const fetch = require('node-fetch');
const fs = require('fs');

const api_key = ""

var yearCredits = {};
for (let year = 1900; year <= 2018; year++) {
	yearCredits[`${year}`] = {};
}

// Promise
function getCreditsOfTopMoviesOfYear(year, page, runtime) {
	// if (year % 10 === 0) 
		console.log(`\tRetrieving movies from year ${year}, page ${page}, with runtime ${runtime} minutes...`)
	const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&year=${year}&with_runtime.gte=${runtime}`
	return fetch(url).then(res => res.json())
			.then(async (json) => 
			// response[]
			{
				let pageResults = json.results;
				let pages = json.total_pages;
				if (page === 1)
					console.log(`\n${year} --- Found ${json.total_results} total results and ${pages} pages.`);
				// If there was no movie returned in the page
				if (!pageResults || pageResults.length === 0) {
					console.log(`REDO YEAR: No movies for year ${year} when runtime minimum is set to ${runtime}.`)
					await sleep(6000);
					return []; // triggers error ASDF below
				}
				return await getCreditsFromResults(pageResults, year);
			})
			// void
			.then(async (responsesWithCounts) => {
				let total_counts = 0, total_repeats = 0;
				if (!responsesWithCounts) {
					console.log(`-- You got rate limited. --`)
					await sleep(6000);
					return;
				} else if (responsesWithCounts.length === 0) {
					// ASDF
					console.log(`-  Nothing to gather from page ${page}.  -`)
					await sleep(6000);
					return;
				}
				for (let i = 0; responsesWithCounts && i < responsesWithCounts.length; i++) {
					total_counts += responsesWithCounts[i][0];
					total_repeats += responsesWithCounts[i][1];
				}
				console.log(`Gathered (${total_counts} unique people, ${total_repeats} repeats) for page ${page} during year ${year} when runtime minimum is set to ${runtime}. `)
				console.log(`${year} - ${Object.keys(yearCredits[year.toString()]).length}`);
				if (continueGatheringNames(year)) {
					await sleep(6000);
					return await getCreditsOfTopMoviesOfYear(year, page + 1, runtime);
				} else {
					console.log(`${year} satisfied.`)
					await sleep(6000);
					return;
				}
			})
			.catch(err => console.log(err))
}

// Promise
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// boolean
function continueGatheringNames(year) {
	// if (1900 === year) {
	// 	return Object.keys(yearCredits[year.toString()]).length < 95; //
	// } else 
	if (1900 <= year && year <= 1915) {
		return Object.keys(yearCredits[year.toString()]).length < 100;
	} else if (1916 <= year && year <= 2018) {
		return Object.keys(yearCredits[year.toString()]).length < 1000;
	}
	console.log(`Unanticipated case.`);
	return false;
}

// Here, I'm making the following model:
/*

{
	'1900': {
		'183950': {
			'cast': {
				'582i2nmdwsmi394u83un': {
					... credit details ...
				},
				...
			},
			'crew': {
				'372j399222b434885s28': {
					... credit details ...
				},
				...
			}
		},
		...
	}, ...

}
*/

// void
function enterMovie(member, year, movieId, isCast) {
	if (!movieCredits[year.toString()]) {
		movieCredits[year.toString()] = {};
	} else {
		if (!movieCredits[year.toString()][movieId.toString()]) {
			movieCredits[year.toString()][movieId.toString()] = {
				cast: {},
				crew: {}
			};
		} else {
			if (isCast) {
				movieCredits[year.toString()][movieId.toString()].cast[member.credit_id] = member;
			} else {
				movieCredits[year.toString()][movieId.toString()].crew[member.credit_id] = member;
			}
		}
	}
}


// Need `year` for checking uniqueness.
// response[]
function getCreditsFromResults(pageResults, year) {
	console.log(`Gathering the credits for ${pageResults.length} movies from ${year}...`)
	const creditFetchPromises = [];
	// typically, length = 20
	for (var i = 0; i < pageResults.length; i++) {
		const movieId = pageResults[i].id;
		creditFetchPromises.push(fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}`)
			.then(res => res.json())
			.then(json => 
			// [int, int] (count, repeat)
			{
				// If there was no credits or crew under the top movie.
				if (!json.cast || !json.crew ||  json.cast.length === 0 && json.crew.length === 0) {
					// console.log(`No cast nor crew found for tmdb_id: '${movieId}'.`)
					return [0,0];
				} else {
					// console.log(`${json.cast.length} cast and ${json.crew.length} crew found for tmdb_id: '${movieId}'!`)
					let count = 0, repeat = 0;
					for (let j = 0; j < json.cast.length && continueGatheringNames(year); j++) {
						let credit_id = json.cast[j].credit_id
						if (!yearCredits[year.toString()][credit_id]) {
							yearCredits[year.toString()][credit_id] = true;
							enterMovie(json.cast[j], year, movieId, true);
							count++;
						} else {
							repeat++;
						}
					}
					for (let j = 0; j < json.crew.length && continueGatheringNames(year); j++) {
						let credit_id = json.crew[j].credit_id
						if (!yearCredits[year.toString()][credit_id]) {
							yearCredits[year.toString()][credit_id] = true;
							enterMovie(json.crew[j], year, movieId, false);
							count++;
						} else {
							repeat++;
						}
					}
					// console.log(`Gathered ${count} credits from ${movieId} during ${year}.`);
					return [count,repeat];
				}
			})
			.catch(err => console.log(err)));

	}
	return Promise.all(creditFetchPromises)
}

// void
async function getAllCredits(fromYear, toYear) {
	// if (fromYear > toYear) {
	// 	setTimeout(writeToJSON, 2000, movieCredits);
	// } else {
	// 	if (fromYear <= 1915)
	// 		getCreditsOfTopMoviesOfYear(fromYear, 1, 0);
	// 	else
	// 		getCreditsOfTopMoviesOfYear(fromYear, 1, 40);
	// 	// setTimeout(getAllCredits, 20000, fromYear+1, toYear);
	// }


	for (var year = fromYear; year <= toYear; year++) {
		if (fromYear <= 1915)
			await getCreditsOfTopMoviesOfYear(year, 1, 0);
		else
			await getCreditsOfTopMoviesOfYear(year, 1, 40);
	}
	setTimeout(writeToJSON, 2000, movieCredits);
}

// void
function writeToJSON(movieCredits) {
	fs.writeFile(`${__dirname}/../tmp/centuryTopMovieNames.json`, JSON.stringify(movieCredits), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/centuryTopMovieNames.json !`);
	});
}

var movieCredits = {
}
getAllCredits(1900, 2018)
