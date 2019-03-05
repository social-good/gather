const fetch = require('node-fetch');
const fs = require('fs');

const namsor_api_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

var currentKeyIndex = 0;

const races = {};
const weightedRaces = {};

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

function getCleanName(fullName) {
	let names = fullName.split(' ');
	return `${names[0].toLowerCase().replaceAll('[.´·-]*', '')} ${names[names.length-1].toLowerCase().replaceAll('[.´·-]*', '')}`
}
function oldGetCleanName(fullName) {
	let names = fullName.split(' ');
	return `${names[0].toLowerCase().replaceAll('[^A-Za-z]', '')} ${names[names.length-1].toLowerCase().replaceAll('[^A-Za-z]', '')}`
}
function convertName(index, fullName) {
	let names = fullName.split(' ')
	let obj = {
		'id': `${index}`,
		'firstName': names[0],
		'lastName': names[names.length-1],
		'countryIso2': 'US'
	}
	// console.log(obj)
	return obj;
}
function getDiaspora(names) {
	let data = {'personalNames': []};
	for (let i = 0; i < names.length; i++) {
		data.personalNames.push(convertName(i, names[i]));
	}
	console.log()
	return fetch('https://v2.namsor.com/NamSorAPIv2/api2/json/diasporaBatch', {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'Content-Type': 'application/json',
			'X-API-KEY': `${namsor_api_key}`
		},
		body: JSON.stringify(data)
	})
		.then(res => res.json())
		.then(async (json) => {
			// for (let j = 0; j < json.personalNames.length; j++) {
			// 	raceCode = json.personalNames[j].raceEthnicity;
			// 	if (races[raceCode] == undefined) {
			// 		races[raceCode] = 0;
			// 		weightedRaces[raceCode] = 0;
			// 	}
			// 	races[raceCode] += 1;
			// 	weightedRaces[raceCode] += json.personalNames[j].score;
			// }
			writeNamSorToJSON(reformatNamSor(json));
			await (sleep(5000));
			beginDiasporaRetrieval();
		})
		.catch(async (err) => {
			if (err.message === 'invalid json response body at https://v2.namsor.com/NamSorAPIv2/api2/json/diasporaBatch reason: Unexpected token A in JSON at position 0'){
				console.log('RECEIVED ERROR (API KEY PROBABLY USED UP)');
				// Not to worry, onto the next API key!
				currentKeyIndex++;
				var wait = parseInt(Math.random() * 60000);
				console.log(`Waiting for ${wait} ms until trying next API key: ${namsor_api_key}`);
				await(sleep(wait));
				beginDiasporaRetrieval();
			} else {
				console.error(err); 
			}
		});
}
// Promise
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
function beginDiasporaRetrieval() {
	// const batchSize = 50000000;
	// var year = 1900;
	unaugmentedNames = {
		count: 0
	};
	// for (; year <= 2018 && unaugmentedNames.count < batchSize; year++) { // TODO: Change this back if all 500 don't come back. 
	// 	if (year % 10 === 0) console.log(year)
	// 	var yearCredits = creditsMap[`${year}`]
	// 	if (yearCredits === undefined || yearCredits === null || Object.keys(yearCredits).length === 0) {
	// 		console.log('Error')
	// 	} else {
	// 		var yearMovieIds = Object.keys(yearCredits);
	// 		for (var j = 0; j < yearMovieIds.length; j++) {
	// 			var yearMovieCredits = yearCredits[yearMovieIds[j]];
	// 			var yearMovieCreditsCastIds = Object.keys(yearMovieCredits.cast)
	// 			var yearMovieCreditsCrewIds = Object.keys(yearMovieCredits.crew)
	// 			for (var k = 0; k < yearMovieCreditsCastIds.length && unaugmentedNames.count < batchSize; k++) {
	// 				var name = yearMovieCredits.cast[yearMovieCreditsCastIds[k]].name;
	// 				if (neverSeenBefore(getCleanName(name)) && legitName(getCleanName(name)))
	// 				{	unaugmentedNames[getCleanName(name)] = true;
	// 					unaugmentedNames.count += 1;
	// 				}
	// 			}
	// 			for (var k = 0; k < yearMovieCreditsCrewIds.length && unaugmentedNames.count < batchSize; k++) {
	// 				var name = yearMovieCredits.crew[yearMovieCreditsCrewIds[k]].name;
	// 				if (neverSeenBefore(getCleanName(name)) && legitName(getCleanName(name)))
	// 				{	unaugmentedNames[getCleanName(name)] = true;
	// 					unaugmentedNames.count += 1;
	// 				}
	// 			}
	// 		}
	// 	}
	// }

	const tmdb_ids = Object.keys(changed_birth_names);
	for (var i = 0; i < tmdb_ids.length; i++) {
		if (neverSeenBefore(getCleanName(changed_birth_names[tmdb_ids[i]]))) {
			unaugmentedNames[getCleanName(changed_birth_names[tmdb_ids[i]])] = true;
			unaugmentedNames.count += 1;
		}
	}

	if (unaugmentedNames.count > 0) {
		console.log(unaugmentedNames.count);
		console.log('Seen before: ' + seenBefore);
		seenBefore = 0;
		delete(unaugmentedNames.count);
		getDiaspora(Object.keys(unaugmentedNames));
		// https://sjfox.github.io/post/world_map_flights/
	} else {
		console.log(`unaugmentedNames is empty. Don't risk a call!`)
	}
}

function reformatNamSor(json) {
	var tempDiasporaMap = {}
	for (var i = 0; i < json.personalNames.length; i++) {
		tempDiasporaMap[`${json.personalNames[i].firstName} ${json.personalNames[i].lastName}`] = json.personalNames[i]
	}
	return tempDiasporaMap;
}

function neverSeenBefore(fullName) {
	// first import/load anything that hasn't been loaded before
	
	var suffixes = [];
	var diritems = fs.readdirSync(`${__dirname}/../tmp/namsor_output`)
	for (var i = 0; i < diritems.length; i++) {
		if (diritems[i].substring(0, 16) === 'namsor_diaspora_') {
			var suffixKey = diritems[i].substring(16);
			suffixes.push(suffixKey);
			if (!diasporaMap[suffixKey]) {
				var diasporaJSON = fs.readFileSync(`${__dirname}/../tmp/namsor_output/${diritems[i]}`);
				try {
					diasporaMap[suffixKey] = JSON.parse(diasporaJSON);
				} catch (err) {
					console.log(`Suffix index = ${i} = '${suffixKey}'`)
					console.log(err)
				}
			}
		}
	}
	// then check against all resources/maps to make sure there's nothing left. 
	for (var i = 0; i < suffixes.length; i++) {
		if (diasporaMap[suffixes[i]][fullName]) {
			seenBefore++;
			return false;
		}
	}
	if (unaugmentedNames[fullName]) {
		seenBefore++;
		return false;
	}
	return true;
}
function legitName(fullName) {
	let names = fullName.split(' ');
	if (names[0].length <= 1 ||
		names[1].length <= 1 ||
		names[0] === 'miss' ||
		names[0] === 'mrs' ||
		names[0] === 'ms' ||
		names[0] === 'mr' ||
		names[0] === 'hh' ||
		names[0] === 'dj' ||
		names[0] === 'rj' ||
		names[1] === 'ii' ||
		false) return false;
	return true;
}

function writeNamSorToJSON(obj) {
	var date = new Date();
	fs.writeFile(`${__dirname}/../tmp/namsor_output/namsor_diaspora_${date.getTime()}.json`, JSON.stringify(obj), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/namsor_output/namsor_diaspora_${date.getTime()}.json !`);
	});
}
function augmentCreditsDiaspora() {
	var suffixes = [];
	var diritems = fs.readdirSync(`${__dirname}/../tmp/namsor_output`)
	for (var i = 0; i < diritems.length; i++) {
		if (diritems[i].substring(0, 16) === 'namsor_diaspora_') {
			var suffixKey = diritems[i].substring(16);
			suffixes.push(suffixKey);
			if (!diasporaMap[suffixKey]) {
				var diasporaJSON = fs.readFileSync(`${__dirname}/../tmp/namsor_output/${diritems[i]}`);
				diasporaMap[suffixKey] = JSON.parse(diasporaJSON);
			}
		}
	}

	// Q: Is the name that I found an old or a new name?
	// A: It's old if its

	var added = 0;
	for (var year = 1900; year <= 2018; year++) { // TODO: Change this back if all 500 don't come back. 
		if (year % 10 === 0) console.log(year)
		var yearCredits = creditsMap[`${year}`]
		if (yearCredits === undefined || yearCredits === null || Object.keys(yearCredits).length === 0) {
			console.log('Error')
		} else {
			let prevYearAdded = added;
			var yearMovieIds = Object.keys(yearCredits);
			for (var j = 0; j < yearMovieIds.length; j++) {
				var yearMovieCredits = yearCredits[yearMovieIds[j]];
				var yearMovieCreditsCastIds = Object.keys(yearMovieCredits.cast)
				var yearMovieCreditsCrewIds = Object.keys(yearMovieCredits.crew)
				for (var k = 0; k < yearMovieCreditsCastIds.length; k++) {
					var person = yearMovieCredits.cast[yearMovieCreditsCastIds[k]];
					for (var l = 0; l < suffixes.length; l++) {
						if (changed_birth_names[person.id]) {
							if (!person.previous_diaspora && 
								!person.birth_name &&
								!person.imdb_name &&
								diasporaMap[suffixes[l]][getCleanName(changed_birth_names[person.id])] || 
								diasporaMap[suffixes[l]][oldGetCleanName(changed_birth_names[person.id])]) {
							
								creditsMap[`${year}`][yearMovieIds[j]].cast[yearMovieCreditsCastIds[k]].birth_name = changed_birth_names[person.id];
								creditsMap[`${year}`][yearMovieIds[j]].cast[yearMovieCreditsCastIds[k]].imdb_name = changed_birth_names_changed[person.id];
								creditsMap[`${year}`][yearMovieIds[j]].cast[yearMovieCreditsCastIds[k]].previous_diaspora = diasporaMap[suffixes[l]][getCleanName(changed_birth_names[person.id])];
								creditsMap[`${year}`][yearMovieIds[j]].cast[yearMovieCreditsCastIds[k]].diaspora = diasporaMap[suffixes[l]][getCleanName(changed_birth_names_changed[person.id])];
								added++;
							}
						}
					}
				}
				for (var k = 0; k < yearMovieCreditsCrewIds.length; k++) {
					var person = yearMovieCredits.crew[yearMovieCreditsCrewIds[k]];
					for (var l = 0; l < suffixes.length; l++) {
						if (changed_birth_names[person.id]) {
							if (!person.previous_diaspora && 
								!person.birth_name &&
								!person.imdb_name &&
								diasporaMap[suffixes[l]][getCleanName(changed_birth_names[person.id])] || 
								diasporaMap[suffixes[l]][oldGetCleanName(changed_birth_names[person.id])]) {

								creditsMap[`${year}`][yearMovieIds[j]].crew[yearMovieCreditsCrewIds[k]].birth_name = changed_birth_names[person.id];
								creditsMap[`${year}`][yearMovieIds[j]].crew[yearMovieCreditsCrewIds[k]].imdb_name = changed_birth_names_changed[person.id];
								creditsMap[`${year}`][yearMovieIds[j]].crew[yearMovieCreditsCrewIds[k]].previous_diaspora = diasporaMap[suffixes[l]][getCleanName(changed_birth_names[person.id])];
								creditsMap[`${year}`][yearMovieIds[j]].crew[yearMovieCreditsCrewIds[k]].diaspora = diasporaMap[suffixes[l]][getCleanName(changed_birth_names_changed[person.id])];
								added++;
							}
						}
					}
				}
			}
		}
	}

	console.log(`Augmented ${added} names. Preparing to write file to JSON...`);
	writeAugmentedMapToJSON()
}
function augmentIDMap() {
	var suffixes = [];
	var diritems = fs.readdirSync(`${__dirname}/../tmp/namsor_output`)
	for (var i = 0; i < diritems.length; i++) {
		if (diritems[i].substring(0, 16) === 'namsor_diaspora_') {
			var suffixKey = diritems[i].substring(16);
			suffixes.push(suffixKey);
			if (!diasporaMap[suffixKey]) {
				var diasporaJSON = fs.readFileSync(`${__dirname}/../tmp/namsor_output/${diritems[i]}`);
				diasporaMap[suffixKey] = JSON.parse(diasporaJSON);
			}
		}
	}
}

function writeAugmentedMapToJSON() {
	var date = new Date();
	fs.writeFile(`${__dirname}/../tmp/diaspora/topCenturyMovies_(double_augmented)_${date.getTime()}.json`, JSON.stringify(creditsMap), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/diaspora/topCenturyMovies_(double_augmented)_${date.getTime()}.json !`);
	});
}

var creditsJSON = fs.readFileSync(`${__dirname}/../tmp/centuryTopMovieNames.json`);
var creditsMap = JSON.parse(creditsJSON);

var changed_birth_names_JSON = fs.readFileSync(`${__dirname}/../tmp/changed_birth_names.json`);
var changed_birth_names = JSON.parse(changed_birth_names_JSON);

var changed_birth_names_changed_JSON = fs.readFileSync(`${__dirname}/../tmp/changed_birth_names_changed.json`);
var changed_birth_names_changed = JSON.parse(changed_birth_names_changed_JSON);

var diasporaMap = {};
var unaugmentedNames = {
	count: 0
};
var seenBefore = 0;

// beginDiasporaRetrieval()
// augmentCreditsDiaspora()




