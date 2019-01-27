const fetch = require('node-fetch');

const races = {};
const weightedRaces = {};

function getMovieIDs() {
    const apiPromises = [];
	for (let i = 1; i <= 5; i++) {
	    apiPromises.push(fetch(`https://api.themoviedb.org/3/discover/movie?api_key=4ba39d95ffe0232643f0ad3d6b824b30&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&year=2018&with_runtime.gte=40`)
	    	.then(res => res.json())
	    	.then(json => json.results));
	}

	return Promise.all(apiPromises)
	.then(reponses => {
	    const movieIDs = [];
	    reponses.map((pageResults) => {
	    	for (let i = 0; i < pageResults.length; i++) {
		        movieIDs.push(pageResults[i].id);
	    	}
	    });
	    return movieIDs;
	});
}

function getAllMovieCrews(index, ids) {
	if (index >= 100) {
		console.log(races);
		console.log(weightedRaces);
		return false;
	} else {
		getMovieCrew(ids[index]).then(names => getRacialEthnicity(names));
    	setTimeout(getAllMovieCrews, 2000, index+1, ids);
	}
}

function getMovieCrew(id) {
	return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=4ba39d95ffe0232643f0ad3d6b824b30`)
		.then(res => res.json())
		.then(json => json.crew)
		.then(crew => {
			const crewNames = [];
			for (let i = 0; crew != undefined && i < crew.length; i++) {
				crewNames.push(crew[i].name);
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
			'X-API-KEY': 'd3c112a33138a3ffe8e167bd91ab16fb'
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

getMovieIDs().then((ids) => {
	getAllMovieCrews(99, ids)
});




