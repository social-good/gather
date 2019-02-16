const fetch = require('node-fetch');
const fs = require('fs');

const namsor_api_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXXX';

const races = {};
const weightedRaces = {};

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};

function getCleanName(fullName) {
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
			writeToJSON(reformatNamSor(json));
		})
		.catch(err => console.error(err));
}
function augmentCreditsDiaspora() {
	var year = 1900;
	for (; year <= 2018 && unaugmentedNames.count < 248; year++) {
		var credits = creditsMap.byyear[`${year}`]
		if (credits === undefined || credits === null || credits.cast === null || credits.crew === null) {

		} else {
			for (let i = 0; i < credits.cast.length && unaugmentedNames.count < 248; i++) {
				if (neverSeenBefore(getCleanName(credits.cast[i].name))) // only check this map because haven't seen names before because this is the first batch 
				{	unaugmentedNames[getCleanName(credits.cast[i].name)] = true;
					unaugmentedNames.count += 1;
				}
			}
			for (let i = 0; i < credits.crew.length && unaugmentedNames.count < 248; i++) {
				if (neverSeenBefore(getCleanName(credits.crew[i].name))) {
					unaugmentedNames[getCleanName(credits.crew[i].name)] = true;
					unaugmentedNames.count += 1;
				}
			}
		}
	}
	if (unaugmentedNames.count > 0) {
		delete(unaugmentedNames.count)
		getDiaspora(Object.keys(unaugmentedNames))
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
				diasporaMap[suffixKey] = JSON.parse(diasporaJSON);
			}
		}
	}

	// then check against all resources/maps to make sure there's nothing left. 
	for (var i = 0; i < suffixes.length; i++) {
		if (diasporaMap[suffixes[i]][fullName]) {
			return false;
		}
	}
	if (unaugmentedNames[fullName])
		return false;
	return true;
}
function writeToJSON(obj) {
	var date = new Date();
	fs.writeFile(`${__dirname}/../tmp/namsor_output/namsor_diaspora_${date.getTime()}.json`, JSON.stringify(obj), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/namsor_output/namsor_diaspora_${date.getTime()}.json !`);
	});
}

var creditsJSON = fs.readFileSync(`${__dirname}/../tmp/topCenturyMovies.json`);
var creditsMap = JSON.parse(creditsJSON);

var diasporaMap = {}
var unaugmentedNames = {
	count: 0
};

augmentCreditsDiaspora()