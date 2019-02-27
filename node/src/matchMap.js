const fs = require('fs');
function pairMappingWithNames() {
	var linksJSON = fs.readFileSync(`${__dirname}/../tmp/tmdb_imdb_mapping.json`);
	var links = JSON.parse(linksJSON);
	var namesJSON = fs.readFileSync(`${__dirname}/../tmp/afterBeforeNames.json`);
	var names = JSON.parse(namesJSON);
	console.log(Object.keys(links).length);
	console.log(names.length);
	var linkKeys = Object.keys(links);
	for (var i = 0; i < linkKeys.length; i++) {
		var person = {};
		person.imdb_name = names[i].StageName;
		person.birth_name = names[i].BirthName;
		person.imdb_id = links[linkKeys[i]];
		links[linkKeys[i]] = person;
	}
	writeToJSON(links);
}

// void
function writeToJSON(before_after_names) {
	fs.writeFile(`${__dirname}/../tmp/before_after_names.json`, JSON.stringify(before_after_names), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/before_after_names.json !`);
	});
}

// pairMappingWithNames();

var discards = [];
function doThings() {
	var personJSON = fs.readFileSync(`${__dirname}/../tmp/before_after_names.json`);
	var persons = JSON.parse(personJSON);
	var personIds = Object.keys(persons);
	var unusable = 0;
	for (var i = 0; i < personIds.length; i++) {
		if (!usable(persons[personIds[i]].birth_name, persons[personIds[i]].imdb_name) ||
			false) 
			unusable++;
	}

	var sample = [];
	for (var i = 0; i < 20; i++) {
		sample.push(discards[parseInt(Math.random() * discards.length)])
	}

	console.log("Discards" + JSON.stringify(sample));
	console.log(`${personIds.length - unusable} / ${personIds.length}`);
	console.log(1 - unusable / personIds.length);
}

// This function returns true if the name was legitimately changed! (Pick out all the cases where it shows up as changed, but it's actually just the same name.)
function usable(birth_name, imdb_name) {
	var bNames = birth_name.split(' ');
	var cNames = imdb_name.split(' ');

	// Most rigid case where case where not both names are the same.
	if (bNames[0] !== cNames[0] && bNames[bNames.length-1] !== cNames[cNames.length-1]) {
		// Because then it's obvious
		if (birth_name.includes('Not Found')) { 
			return false;
		}
		// Post script
		if (bNames[bNames.length-1] === 'Jr.' || bNames[bNames.length-1] === 'Sr.') {
			//In the case that they kept the Jr or Sr (not checking if they changed Jr to Sr or vice versa)
			if (cNames[cNames.length-1] === 'Jr.' || cNames[cNames.length-1] === 'Sr.') {
				// If they kept it, and kept their last name (strange, and unreachable)
				if (bNames[0] === cNames[0] && bNames[bNames.length-2] === cNames[cNames.length-2]) {
					return false;
				} 
			} else { // In the case that the birth name has Sr or Jr, but the stage name doesn't. 
				// If they just dropped the Sr or Jr
				if (bNames[0] === cNames[0] && bNames[bNames.length-2] === cNames[cNames.length-1]) {
					return false; 
				} 
			}
		}
		// Nickname TODO: (clean up the second mapping's excessive key-value pairs)
		// Weird dropping of hyphen or something? Only if encounter it...
	}

	discards.push({birth_name: birth_name, imdb_name: imdb_name});
	return true;
}

doThings();