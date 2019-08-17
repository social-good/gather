const fetch = require('node-fetch');
const fs = require('fs');

function beginDiasporaRetrieval() {
	unaugmentedNames = {
		count: 0
	};
	// console.log(starWarsCredits);
	for (var i = 0; i < starWarsCredits.cast.length; i++) {
		var cleanName = getCleanName(starWarsCredits.cast[i].name);
		if (neverSeenBefore(cleanName)) {
			unaugmentedNames[cleanName] = true;
			unaugmentedNames.count += 1;
		}
	}
	for (var i = 0; i < starWarsCredits.crew.length; i++) {
		var cleanName = getCleanName(starWarsCredits.crew[i].name);
		if (neverSeenBefore(cleanName)) {
			unaugmentedNames[cleanName] = true;
			unaugmentedNames.count += 1;
		}
	}

	console.log('Seen before: ' + seenBefore);
	if (unaugmentedNames.count > 0) {
		console.log(unaugmentedNames.count);
		seenBefore = 0;
		delete(unaugmentedNames.count);
		// getDiaspora(Object.keys(unaugmentedNames));
		// https://sjfox.github.io/post/world_map_flights/
	} else {
		seenBefore = 0;
		console.log(`unaugmentedNames is empty. Don't risk a call!`)
	}
}

String.prototype.replaceAll = function(search, replacement) {
	var target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};
function getCleanName(fullName) {
	let names = fullName.split(' ');
	return `${names[0].toLowerCase().replaceAll('[.´·-]*', '')} ${names[names.length-1].toLowerCase().replaceAll('[.´·-]*', '')}`
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

function augmentStarWars() {
	var suffixes = [];
	var diritems = fs.readdirSync(`${__dirname}/../tmp/namsor_output`)
	var added = 0;
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

	for (var i = 0; i < starWarsCredits.cast.length; i++) {
		var cleanName = getCleanName(starWarsCredits.cast[i].name);
		for (var l = 0; l < suffixes.length; l++) {
			if (diasporaMap[suffixes[l]][cleanName]) {
				starWarsCredits.cast[i].diaspora = diasporaMap[suffixes[l]][cleanName];
				added++;
			}
		}
	}
	for (var i = 0; i < starWarsCredits.crew.length; i++) {
		var cleanName = getCleanName(starWarsCredits.crew[i].name);
		for (var l = 0; l < suffixes.length; l++) {
			if (diasporaMap[suffixes[l]][cleanName]) {
				starWarsCredits.crew[i].diaspora = diasporaMap[suffixes[l]][cleanName];
				added++;
			}
		}
	}
	console.log(`Augmented ${added} names.`);
}

function refineStarWars() {
	var countryCodeMap = {
		British: 'GB',
		Portuguese: 'PT',
		German: 'DE',
		French: 'FR',
		Irish: 'IE',
		Jewish: 'IL',
		Italian: 'IT',
		Japanese: 'JP',
		Greek: 'GR',
		AfricanAmerican: 'CG',
		Austrian: 'AT',
		Chinese: 'CN',
		Dutch: 'NL',
		HispanoLatino: 'ES',
		Hispanic: 'ES',
		Danish: 'DK',
		Swedish: 'SE',
		Indian: 'IN',
		Russian: 'RU',
		Polish: 'PL',
		'South African': 'ZA',
		Korean: 'KR',
		Norwegian: 'NO',
		Ukrainian: 'UA',
		Ivoirien: 'CI',
		Finnish: 'FI',
		Moldova: 'MD',
		Ghanaian: 'GH',
		Swiss: 'CH',
		Hungarian: 'HU',
		Zimbabwean: 'ZW',
		Pakistanese: 'PK',
		Tunisian: 'TN',
		'Congolese (Kinshasa)': 'CG',
		Czech: 'CZ',
		Turkish: 'TR',
		Mauritanian: 'MU',
		Bulgarian: 'BG',
		NativeHawaiian: 'US-HW', //(Created this code because not on mainland US.)
		Croat: 'HR',
		Moroccan: 'MA',
		Armenian: 'AM',
		Egyptian: 'EG',
		Nigerian: 'NE',
		Serbian: 'RS',
		Iranian: 'IR',
		Icelander: 'IS',
		Syrian: 'SY',
		Iraqi: 'IQ',
		Slovanian: 'SI',
		Malays: 'MY',
		Slovenian: 'SI',
		Romanian: 'RO',
		Tanzanian: 'TZ',
		Indonesian: 'ID',
		Latvian: 'LV',
		Vietnamese: 'VN',
		Azerbaijani: 'AZ',
		Thai: 'TH',
		Mali: 'ML',
		Senegalese: 'SN',
		Niger: 'NG',
		Algerian: 'DZ',
		Georgian: 'GE',
		Kenyan: 'KE',
		Angola: 'AO',
		'Burkina Faso': 'BF',
		Beninese: 'BJ',
		Ethiopian: 'ET',
		Liberia: 'LR',
		Saudi: 'SA',
		Lebanese: 'LB',
		Albanian: 'AL',
		Jordanian: 'JO',
		Guinean: 'GN',
		Lithuanian: 'LT',
		Bangladeshi: 'BD',
		Slovakian: 'SK',
		'Sri Lankan': 'LK',
		Mauritius: 'MU',
		Cameroonian: 'CM',
		Rwandese: 'RW',
		Lesotho: 'LS'
	};

	const refinedCredits = {
		cast: {},
		crew: {}
	};
	for (var i = 0; i < starWarsCredits.cast.length; i++) 
		refinedCredits.cast[starWarsCredits.cast[i].name] = countryCodeMap[starWarsCredits.cast[i].diaspora.ethnicity];
	for (var i = 0; i < starWarsCredits.crew.length; i++) 
		refinedCredits.crew[starWarsCredits.crew[i].name] = countryCodeMap[starWarsCredits.crew[i].diaspora.ethnicity];

	writeAugmentedStarWarsToJSON(refinedCredits);
}

function writeAugmentedStarWarsToJSON(refinedCredits) {
	var date = new Date();
	fs.writeFile(`${__dirname}/../tmp/diaspora/Star_Wars_IV_${date.getTime()}.json`, JSON.stringify(refinedCredits), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/diaspora/Star_Wars_IV_${date.getTime()}.json !`);
	});
}

var starWarsCreditsJSON = fs.readFileSync(`${__dirname}/../tmp/starwarsIV.json`);
var starWarsCredits = JSON.parse(starWarsCreditsJSON);

var diasporaMap = {};
var unaugmentedNames = {
	count: 0
};
var seenBefore = 0;
// beginDiasporaRetrieval();
// augmentStarWars();
// refineStarWars();
