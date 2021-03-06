const fetch = require('node-fetch');

const races = {};
const weightedRaces = {};
var yearCrewCount = 0;
var totalCrewCount = 0;

const api_key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
const namsor_api_key = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

function getAllMovieIds(year) {
	if (year <= 1900) {
		console.log(totalCrewCount);
		return false;
	} else {
		totalCrewCount += yearCrewCount;
		yearCrewCount = 0;
		getYearMovies(year).then((ids) => {
			getAllMovieCrews(0, ids)
		});
    	setTimeout(getAllMovieIds, 1000000, year-1);
	}
}

function getYearMovies(year) {
    const apiPromises = [];
	for (let i = 1; i <= 5; i++) {
	    apiPromises.push(fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&year=${year}&with_runtime.gte=40`)
	    	.then(res => res.json())
	    	.then(json => json.results));
	}

	return Promise.all(apiPromises)
	.then(reponses => {
	    const movieIDs = [];
	    reponses.map((pageResults) => {
	    	for (let i = 0; pageResults != undefined && i < pageResults.length; i++) {
		        movieIDs.push(pageResults[i].id);
	    	}
	    });
	    return movieIDs;
	})
	.catch(err => console.error(err));
}

function getAllMovieCrews(index, ids) {
	if (index >= 100) {
		// console.log(races);
		// console.log(weightedRaces);
		console.log(yearCrewCount);
		return false;
	} else {
		getMovieCrew(ids[index]);
    	setTimeout(getAllMovieCrews, 1000, index+1, ids);
	}
}

function getMovieCrew(id) {
	return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`)
		.then(res => res.json())
		.then(json => json.crew)
		.then(crew => {
			const crewNames = [];
			for (let i = 0; crew != undefined && i < crew.length; i++) {
				crewNames.push(crew[i].name);
				yearCrewCount++;
			}
			return crewNames;
		})
		.catch(err => console.error(err));
}

function convertName(index, name) {
	let names = name.split(' ');
	let obj = {
		'id': `${index}`,
		'firstName': names[0],
		'lastName': names[names.length-1],
		'countryIso2': 'US'
	}
	// console.log(obj)
	return obj;
}

function getRacialEthnicity(names) {
	let data = {'personalNames': []};
	for (let i = 0; i < names.length; i++) {
		data.personalNames.push(convertName(i, names[i]));
	}
	return fetch('https://v2.namsor.com/NamSorAPIv2/api2/json/usRaceEthnicityBatch', {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'Content-Type': 'application/json',
			'X-API-KEY': `${namsor_api_key}`
		},
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(json => {
			for (let j = 0; j < json.personalNames.length; j++) {
				raceCode = json.personalNames[j].raceEthnicity;
				if (races[raceCode] == undefined) {
					races[raceCode] = 0;
					weightedRaces[raceCode] = 0;
				}
				races[raceCode] += 1;
				weightedRaces[raceCode] += json.personalNames[j].score;
			}
		})
		.catch(err => console.error(err));
}

getAllMovieIds(2018)




