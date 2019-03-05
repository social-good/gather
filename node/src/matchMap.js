const fs = require('fs');
const NameFunctions = require('./NameFunctions.js')

function pairMappingWithNames() {
	var linksJSON = fs.readFileSync(`${__dirname}/../tmp/tmdb_imdb_mapping.json`);
	var links = JSON.parse(linksJSON);
	var namesJSON = fs.readFileSync(`${__dirname}/../tmp/primary_after_before_names.json`);
	var names = JSON.parse(namesJSON);
	var spousesJSON = fs.readFileSync(`${__dirname}/../tmp/spouse_list.json`);
	var spouses = JSON.parse(spousesJSON);
	console.log(Object.keys(links).length);
	console.log(spouses.length);
	console.log(names.length);
	var linkKeys = Object.keys(links);
	for (var i = 0; i < linkKeys.length; i++) {
		var person = {};
		person.imdb_name = names[i].StageName;
		person.birth_name = names[i].BirthName;
		person.imdb_id = links[linkKeys[i]];
		person.spouse_name = spouses[i].SpouseName;
		person.imdb_id_spouse = spouses[i].imdb_id_spouse;
		links[linkKeys[i]] = person;
	}
	writeToJSON(links);
}

// void
function writeToJSON(usablePeople) {
	fs.writeFile(`${__dirname}/../tmp/usablePeople.json`, JSON.stringify(usablePeople), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/usablePeople.json !`);
	});
}

// pairMappingWithNames();

var approved = [];
var nicksDictionary = {};

function fixNamesData() {
	var spousesJSON = fs.readFileSync(`${__dirname}/../tmp/spouse_list.json`);
	var spouses = JSON.parse(spousesJSON);
	var tmdb_imdb_map_JSON = fs.readFileSync(`${__dirname}/../tmp/tmdb_imdb_mapping.json`);
	var tmdb_imdb_map = JSON.parse(tmdb_imdb_map_JSON);
	var tmdb_ids = Object.keys(tmdb_imdb_map);
	var imdb_tmdb_map = {}
	
	// Reverse the map. 
	for (var i = 0; i < tmdb_ids.length; i++) {
		imdb_tmdb_map[tmdb_imdb_map[tmdb_ids[i]]] = tmdb_ids[i];
	}

	// First, fix the spouse data.
	var spouse_map = {};
	for (var i = 0; i < spouses.length; i++) {
		var imdb_page_info = spouses[i];
		if (imdb_page_info.imdb_id) {
			delete(imdb_page_info.tmdb_id);
		}
		spouse_map[imdb_tmdb_map[imdb_page_info.imdb_id]] = imdb_page_info;
	}
	// console.log(spouse_map);

	for (var i = 0; i < tmdb_ids.length; i++) {
		var person = {};
		// Because the spouse_map covers a subset of the tmdb_imdb_map
		if (spouse_map[tmdb_ids[i]]) {
			person.imdb_name = spouse_map[tmdb_ids[i]].StageName;
			person.birth_name = spouse_map[tmdb_ids[i]].BirthName;
			person.imdb_id = tmdb_imdb_map[tmdb_ids[i]];
			person.spouse_name = spouse_map[tmdb_ids[i]].SpouseName;
			person.imdb_id_spouse = spouse_map[tmdb_ids[i]].imdb_id_spouse;
			tmdb_imdb_map[tmdb_ids[i]] = person;
		}
	}
	writeToJSON(tmdb_imdb_map);
}

function extractNameChanges() {
	var personJSON = fs.readFileSync(`${__dirname}/../tmp/names_data.json`);
	var persons = JSON.parse(personJSON);
	var personIds = Object.keys(persons);
	var nickJSON = fs.readFileSync(`${__dirname}/../tmp/nickname_mapping_2.json`);
	var nicks = JSON.parse(nickJSON);
	for (var i = 0; i < nicks.length; i++) {
		var nickMapping = {};
		var countKeys = Object.keys(nicks[i]);
		for (var j = 1; j < countKeys.length; j++) {
			if (nicks[i][countKeys[j]] !== '') nickMapping[nicks[i][countKeys[j]]] = true;
		}
		nicksDictionary[nicks[i]['fullname']] = nickMapping;
	}
	// console.log(nicksDictionary);
	var usablePeople = {};
	var unusable = 0;
	for (var i = 0; i < personIds.length; i++) {
		try {
			if (!usable(persons[personIds[i]].birth_name, persons[personIds[i]].imdb_name, persons[personIds[i]])) 
				unusable++;
			else
				usablePeople[personIds[i]] = persons[personIds[i]];
		} catch (err) {
			console.error(err)
			console.log(i);
		}
		
	}

	var samples = {
		undefined: rejects.undefined,
		notfound: [],
		nicknames: [],
		married: [],
		initials: []
	};
	for (var i = 0; i < 20; i++) {
		samples.notfound.push(rejects.notfound[parseInt(Math.random() * rejects.notfound.length)]);
		samples.nicknames.push(rejects.nicknames[parseInt(Math.random() * rejects.nicknames.length)]);
		samples.married.push(rejects.married[parseInt(Math.random() * rejects.married.length)]);
		samples.initials.push(rejects.initials[parseInt(Math.random() * rejects.initials.length)]);
	}

	console.log("Rejects:")
	console.log(samples);
	console.log(`Approved: ${personIds.length - unusable} / ${personIds.length}`);
	console.log(1 - unusable / personIds.length);
	writeToJSON(usablePeople);
}

function cleanNameArray(nameList) {
	const newArray = [];
	for (var i = 0; i < nameList.length; i++) {
		nameList[i] = nameList[i].replaceAll('[.´·-]*','');
		if (!nameList[i].latinise().isHonorific() && !nameList[i].isPostscript()) {
			newArray.push(nameList[i].toLowerCase().latinise());
		}
	}
	return newArray;
}

// This function returns true if the name was legitimately changed! (Pick out all the cases where it shows up as changed, but it's actually just the same name.)
function usable(birth_name, imdb_name, person) {
	if (!birth_name || !imdb_name) {
		rejects.undefined++;
		return false;
	}

	var bNames = birth_name.split(' ');
	var cNames = imdb_name.split(' ');

	bNames = cleanNameArray(bNames);
	cNames = cleanNameArray(cNames);

	// It's the exact same!
	if (bNames[0] === cNames[0] && bNames[bNames.length-1] === cNames[cNames.length-1])
		return false;

	// Most rigid case where case where either name is not the same.
	if (bNames[0] !== cNames[0] || bNames[bNames.length-1] !== cNames[cNames.length-1]) {
		// Because then it's obvious
		if (birth_name.includes('Not Found')) { 
			rejects.notfound.push([birth_name,imdb_name]);
			return false;
		}

		// Married
		// (Her) first name is the same even after the name change. 
		if (bNames[0] === cNames[0]) {
			var spouse_names = cleanNameArray(person.spouse_name.split(' '));
			// She has the same last name as their spouse.
			if (cNames[cNames.length-1] === spouse_names[spouse_names.length-1]) {
				// Just circumventing problem in the data where sometimes the spouse has the exact same name as themself
				if (cNames[0] !== spouse_names[0]) {
					// She just changed her name because she got married.
					rejects.married.push([birth_name,imdb_name,person.spouse_name]);
					return false;
				}
			}
		}

		// Initials
		if ((bNames.length > 2) && (cNames[0] === `${bNames[0][0]}${bNames[1][0]}`)) {
			rejects.initials.push([birth_name,imdb_name]);
			return false;
		}

		// Nicknames (first names only)
		if (nicksDictionary[bNames[0]] && nicksDictionary[bNames[0]][cNames[0]]) {
			rejects.nicknames.push([birth_name,imdb_name]);
			return false;
		}

		// TODO: Count how many people just go by another given name.
		// Weird dropping of hyphen or something? Only if encounter it...
	}

	approved.push(person.tmdb_id);
	return true;
}

// console.log('Willïám'.latinize().toLowerCase())
// console.log(usable('Mrs. NoÎlle Noblecourt IV', 'Mrs. NoÎlle Noblecourt'))

var rejects = {
	undefined: 0,
	notfound: [],
	nicknames: [],
	married: [],
	initials: []
}
extractNameChanges();
// fixNamesData();