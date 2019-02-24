const fetch = require('node-fetch');
const api_key = "4ba39d95ffe0232643f0ad3d6b824b30"
const fs = require('fs');

function grabTMDB_IDs() {
	var tmdb_ids = {}
	var creditCount = 0;
	var augmentedJSON = fs.readFileSync(`${__dirname}/../tmp/diaspora/topCenturyMovies_(augmented)_1550864198286.json`);
	var augmentedMap = JSON.parse(augmentedJSON);
	for (var year = 1900; year < 2018; year++) {
		var credits = augmentedMap[`${year}`]
		if (credits === undefined || credits === null || credits.cast === null || credits.crew === null) {
			console.log(`Credits are ${credits} for year ${year}`)
		} else {
			var year_mid_list = Object.keys(credits)
			for (var j = 0; j < year_mid_list.length; j++) {
				var movie_credits = credits[year_mid_list[j]];
				var movie_credits_cast_ids = Object.keys(movie_credits.cast);
				var movie_credits_crew_ids = Object.keys(movie_credits.crew);
				creditCount += movie_credits_cast_ids.length + movie_credits_crew_ids.length;
				for (var k = 0; k < movie_credits_cast_ids.length; k++) {
					var person = movie_credits.cast[movie_credits_cast_ids[k]];
					if (person.diaspora && !tmdb_ids[person.id]) 
						tmdb_ids[person.id] = true;
				}
				for (var k = 0; k < movie_credits_crew_ids.length; k++) {
					var person = movie_credits.crew[movie_credits_crew_ids[k]];
					if (person.diaspora && !tmdb_ids[person.id]) 
						tmdb_ids[person.id] = true;
				}
			}
		}
	}
	const unique = Object.keys(tmdb_ids);
	console.log(`Mapped ${unique.length} unique people (out of ${creditCount} total credits).`);
	return unique;
}

// Promise
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function mapAllIds() {
	var id_map = {};
	const tmdb_ids = grabTMDB_IDs();
	const failures = {};
	const duplicates = {};
	// batches are largely symbolic. 
	for (var batch_start = 0; batch_start < 1200; batch_start += 40) {
		if (batch_start % 250 < 40) console.log(`(${batch_start}/${tmdb_ids.length}) = ${parseInt(batch_start/tmdb_ids.length*10000)/100} %\nFailures: ${Object.keys(failures).length},\tDuplicates: ${Object.keys(duplicates).length}`)
		var batch = tmdb_ids.slice(batch_start, (batch_start + 40 <= tmdb_ids.length) ? batch_start + 40 : tmdb_ids.length % 40);
		for (var batch_request = 0; batch_request < batch.length; batch_request++) {
			var person_index = batch_start + batch_request;
			fetch(`https://api.themoviedb.org/3/person/${tmdb_ids[person_index]}?api_key=${api_key}&language=en-US`)
				.then(res => res.json())
				.then(json => {
					if (!id_map[json.imdb_id]) {
						id_map[tmdb_ids[person_index]] = json.imdb_id;
					} else {
						duplicates[tmdb_ids[person_index]] = (duplicates[tmdb_ids[person_index]] ? duplicates[tmdb_ids[person_index]] + 1 : 1);
					}
				})
				.catch(err => {
					console.error(err) // DEBUG
					failures[tmdb_ids[person_index]] = (failures[tmdb_ids[person_index]] ? failures[tmdb_ids[person_index]] + 1 : 1);
				});
			await sleep(275)
		}
	}
	writeToJSON(id_map)
}

// void
function writeToJSON(id_map) {
	// TODO: Remove this. 
	console.log(movieCredits);
	fs.writeFile(`${__dirname}/../tmp/tmdb_imdb_mapping.json`, JSON.stringify(id_map), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/tmdb_imdb_mapping.json !`);
	});
}

mapAllIds();

