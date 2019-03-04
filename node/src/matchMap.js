const fs = require('fs');
const Latinize = require('./NameFunctions.js')
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
function writeToJSON(names_data) {
	fs.writeFile(`${__dirname}/../tmp/names_data.json`, JSON.stringify(names_data), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/names_data.json !`);
	});
}

// pairMappingWithNames();

var approved = [];
var nicksDictionary = {};
function doThings() {
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
	var unusable = 0;
	for (var i = 0; i < personIds.length; i++) {
		if (!usable(persons[personIds[i]].birth_name, persons[personIds[i]].imdb_name) ||
			false) 
			unusable++;
	}

	var sample = [];
	for (var i = 0; i < 20; i++) {
		sample.push(approved[parseInt(Math.random() * approved.length)])
	}

	console.log("Approved:\n" + JSON.stringify(sample));
	console.log(`${personIds.length - unusable} / ${personIds.length}`);
	console.log(1 - unusable / personIds.length);
}

// This function returns true if the name was legitimately changed! (Pick out all the cases where it shows up as changed, but it's actually just the same name.)
function usable(birth_name, imdb_name) {
	var bNames = birth_name.split(' ');
	var cNames = imdb_name.split(' ');

	// It's the exact same!
	if (bNames[0] === cNames[0] && bNames[bNames.length-1] === cNames[cNames.length-1])
		return false;

	// Most rigid case where case where not both names are the same.
	if (bNames[0] !== cNames[0] && bNames[bNames.length-1] !== cNames[cNames.length-1]) {
		// Because then it's obvious
		if (birth_name.includes('Not Found')) { 
			return false;
		}
		// TODO: Dropping the accent. "birth_name":"NÈstor GastÛn Carbonell","imdb_name":"Nestor Carbonell"
		// Going by middle name? √ SAFE! (Going by any other given name? √ SAFE!)
		// TODO: UHHH married? {"birth_name":"Christiane Susanne Harlan","imdb_name":"Christiane Kubrick"} 
			// If only their last name is changed, check to make sure their spouse doesn't have the same name. 
		// TODO: Titles: "birth_name":"Princess Gayane Mickeladze","imdb_name":"Miki Iveria" (Honorifics) https://github.com/dariusk/corpora/blob/master/data/humans/englishHonorifics.json

		//TODO: Implement this as a filter. Remove titles and appendages from the lists and send those down. 
		if (bNames[bNames.length-1] === 'Jr' || bNames[bNames.length-1] === 'Jr.' ||  bNames[bNames.length-1] === 'Sr' || bNames[bNames.length-1] === 'Sr.' ||  bNames[bNames.length-1] === 'I' || bNames[bNames.length-1] === 'II' || bNames[bNames.length-1] === 'III'|| bNames[bNames.length-1] === 'IV') {
			//In the case that they kept the Jr or Sr (not checking if they changed Jr to Sr or vice versa)
			if (cNames[cNames.length-1] === 'Jr' || cNames[cNames.length-1] === 'Jr.' || cNames[cNames.length-1] === 'Sr' || cNames[cNames.length-1] === 'Sr.' || bNames[bNames.length-1] === 'I' || bNames[bNames.length-1] === 'II' || bNames[bNames.length-1] === 'III'|| bNames[bNames.length-1] === 'IV') {
				// TODO: Clear this up... waste of a check. 
				// If they kept it, and kept their last name (strange, and unreachable)
				if (bNames[0].latinize().toLowerCase() === cNames[0].latinize().toLowerCase() && bNames[bNames.length-2].latinize().toLowerCase() === cNames[cNames.length-2].latinize().toLowerCase()) {
					return false;
				} 
			} else { // In the case that the birth name has Sr or Jr, but the stage name doesn't. 
				// If they just dropped the Sr or Jr
				if (bNames[0].latinize().toLowerCase() === cNames[0].latinize().toLowerCase() && bNames[bNames.length-2].latinize().toLowerCase() === cNames[cNames.length-1].latinize().toLowerCase()) {
					return false; 
				} 
			}
		}
		//TODO: Implement this as a filter. Remove titles and appendages from the lists and send those down. 
		if (bNames[0].latinize().toLowerCase().isHonorific()) {
			// Changed their honorific.
			if (cNames[0].latinize().toLowerCase().isHonorific()) { 
				// But their core name is the same.
				if (bNames[1].latinize().toLowerCase() === cNames[1].latinize().toLowerCase() && 
					bNames[bNames.length-1].latinize().toLowerCase() === cNames[cNames.length-1].latinize().toLowerCase()) {
					return false;
				}
			} 
			// Dropped their honorific
			else {
				// But their core name is the same.
				if (bNames[1].latinize().toLowerCase() === cNames[0].latinize().toLowerCase() && 
					bNames[bNames.length-1].latinize().toLowerCase() === cNames[cNames.length-1].latinize().toLowerCase()) {
					return false;
				}
			}
		}
		// Gained an honorific
		if (cNames[0].latinize().toLowerCase().isHonorific()) {
			// But their core name is the same. 
			if (bNames[0].latinize().toLowerCase() === cNames[1].latinize().toLowerCase() &&
				bNames[bNames.length-1].latinize().toLowerCase() === cNames[cNames.length-1].latinize().toLowerCase()) {
				return false;
			}
		}

		// Check Initials
		if ((bNames.length > 2) && (cNames[0] === `${bNames[0][0]}.${bNames[1][0]}.` || cNames[0] === `${bNames[0][0]}${bNames[1][0]}`)) {
			return false;
		}
		// // Check accents. L·szlÛ Lˆwenstein
		if (bNames[0].latinize().toLowerCase() === cNames[0].latinize().toLowerCase() && 
			bNames[bNames.length-1].latinise().toLowerCase() === cNames[cNames.length-1].latinise().toLowerCase()) {
			return false;
		}
		// Check Nicknames (first names only)
		if (nicksDictionary[bNames[0].latinize().toLowerCase()] && nicksDictionary[bNames[0].latinize().toLowerCase()][cNames[0].latinize().toLowerCase()]) {
			return false;
		}



		// TODO: Count how many people just go by another given name.

		// Weird dropping of hyphen or something? Only if encounter it...
	}

	approved.push({birth_name: birth_name, imdb_name: imdb_name});
	return true;
}
// console.log('Willïám'.latinize().toLowerCase())
doThings();