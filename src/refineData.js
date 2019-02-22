const fs = require('fs');



String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function topCenturyDepartmentCount() {

	var creditsJSON = fs.readFileSync(`${__dirname}/../tmp/topCenturyMovies.json`);
	var creditsMap = JSON.parse(creditsJSON);
	var departmentMap = {};
	for (var year = 1900; year <= 2018; year++) {
		var credits = creditsMap.byyear[`${year}`]
		if (credits === undefined || credits === null || credits.cast === null || credits.crew === null) {
			departmentMap[`${year}`] = {
				Cast: 0,
				Directing: 0, 
				Writing: 0, 
				Production: 0,
				Editing: 0,
				Camera: 0,
				Crew: 0,
				VisualEffects: 0,
				Sound: 0,
				Art: 0,
				Lighting: 0,
				CostumeMakeUp: 0
			};
			console.log(`Credits are faulty for year ${year}`)
		} else {
			var departmentBreakdown = {
				Cast: credits.cast.length,
				Directing: 0, 
				Writing: 0, 
				Production: 0,
				Editing: 0,
				Camera: 0,
				Crew: 0,
				VisualEffects: 0,
				Sound: 0,
				Art: 0,
				Lighting: 0,
				CostumeMakeUp: 0
			};
			var len = credits.crew.length;
			for (var crewIndex = 0; crewIndex < len; crewIndex++) {
				var department = credits.crew[crewIndex].department.replaceAll('[^A-Za-z]', '')
				if (!departmentBreakdown[department])
					departmentBreakdown[department] = 0;
				departmentBreakdown[department] = departmentBreakdown[department] + 1;
			}
			departmentMap[`${year}`] = departmentBreakdown;
		}
	}

	console.log(`topCenturyDepartmentCount mapped`);

	fs.writeFile(`${__dirname}/../tmp/topCenturyDepartmentCount.json`, JSON.stringify(departmentMap), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyDepartmentCount.json !`);
	});
}

function topCenturyGenderCount() {
	var creditsJSON = fs.readFileSync(`${__dirname}/../tmp/topCenturyMovies.json`);
	var creditsMap = JSON.parse(creditsJSON);
	var departmentMap = {};

	var totals = new Array(3);
	totals.fill(0);
	for (var year = 1900; year <= 2018; year++) {
		var castBreakdown = new Array(3);
		castBreakdown.fill(0);
		var credits = creditsMap.byyear[`${year}`]
		var len = credits.cast.length;
		for (var castIndex = 0; castIndex < len; castIndex++) {
			var gender = credits.cast[castIndex].gender
			castBreakdown[gender] = castBreakdown[gender] + 1;
			totals[gender] += 1
		}

		var departmentBreakdown = new Array(3);
		departmentBreakdown.fill(0);
		len = credits.crew.length;
		for (var crewIndex = 0; crewIndex < len; crewIndex++) {
			var gender = credits.crew[crewIndex].gender
			departmentBreakdown[gender] = departmentBreakdown[gender] + 1;
			totals[gender] += 1
		}
		departmentMap[`${year}`] = {
			cast: castBreakdown,
			crew: departmentBreakdown
		};
	}

	// console.log(departmentMap)
	// console.log(`Totals: ${totals}`)
	console.log(`topCenturyGenderCount mapped`);

	fs.writeFile(`${__dirname}/../tmp/topCenturyGenderCount.json`, JSON.stringify(departmentMap), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyGenderCount.json !`);
	});
}

// TODO: Augment the number of movies in the MovieMap each Year...
	// will break a lot of things (each year points to an array of objects rather than just AN object [THE top movie])

// TODO: Output both: (1) counts (2) percentages
// TODO: Reformat to be good for time series data.
function topCenturyBreakdownGenderByDepartment() {
	
	var creditsJSON = fs.readFileSync(`${__dirname}/../tmp/topCenturyMovies.json`);
	var creditsMap = JSON.parse(creditsJSON);
	
	var departmentMap = {};
	for (var year = 1900; year <= 2018; year++) {
		var credits = JSON.parse(creditsJSON).byyear[`${year}`];
		var deptGenderBreakdown = {
			Cast: [0, 0, 0],
			Directing: [0, 0, 0], 
			Writing: [0, 0, 0], 
			Production: [0, 0, 0],
			Editing: [0, 0, 0],
			Camera: [0, 0, 0],
			Crew: [0, 0, 0],
			VisualEffects: [0, 0, 0],
			Sound: [0, 0, 0],
			Art: [0, 0, 0],
			Lighting: [0, 0, 0],
			CostumeMakeUp: [0, 0, 0]
		};
		if (credits === undefined || credits === null || credits.cast === null || credits.crew === null) {
			departmentMap[`${year}`] = deptGenderBreakdown;
			console.log(`Credits are ${credits} for year ${year}`)
		} else {
			let len = credits.cast.length;
			for (var castIndex = 0; castIndex < len; castIndex++) {
				var gender = credits.cast[castIndex].gender
				deptGenderBreakdown['Cast'][gender] = deptGenderBreakdown['Cast'][gender] + 1;
			}

			len = credits.crew.length;
			for (var crewIndex = 0; crewIndex < len; crewIndex++) {
				var department = credits.crew[crewIndex].department.replaceAll('[^A-Za-z]', '');
				var gender = credits.crew[crewIndex].gender;
				deptGenderBreakdown[department][gender] = deptGenderBreakdown[department][gender] + 1;
			}
			
			departmentMap[`${year}`] = deptGenderBreakdown;
		}
	}

	console.log(`topCenturyBreakdownGenderByDepartment mapped`);

	fs.writeFile(`${__dirname}/../tmp/topCenturyBreakdownGenderByDepartment.json`, JSON.stringify(departmentMap), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyBreakdownGenderByDepartment.json !`);
	});
}

// 1. Get the types of ethnicities
// 2. No selection panel this time, though. Not breaking up our information by department because there's not enough in the movies that are earlier on.
function topCenturyDiasporaCount() {
	var augmentedJSON = fs.readFileSync(`${__dirname}/../tmp/diaspora/topCenturyMovies_(augmented)_1550864198286.json`);
	var augmentedMap = JSON.parse(augmentedJSON);
	console.log('Loaded augmentedMap');
	var diasporaMap = {};

	for (var year = 1900; year < 2018; year++) {
		var credits = augmentedMap[`${year}`]
		var yearDiaspora = { 
			British: 0,
			French: 0,
			Greek: 0,
			Portuguese: 0,
			German: 0,
			Irish: 0,
			AfricanAmerican: 0,
			Austrian: 0,
			Chinese: 0,
			Italian: 0,
			Jewish: 0,
			Dutch: 0,
			HispanoLatino: 0,
			Danish: 0,
			Korean: 0,
			Swedish: 0,
			Indian: 0,
			Japanese: 0,
			Norwegian: 0,
			Russian: 0,
			Ukrainian: 0,
			Ivoirien: 0,
			Finnish: 0,
			Moldova: 0,
			Ghanaian: 0,
			Swiss: 0,
			Polish: 0,
			Hungarian: 0,
			Pakistanese: 0,
			Tunisian: 0,
			'Congolese (Kinshasa)': 0,
			Czech: 0,
			Turkish: 0,
			Mauritanian: 0,
			Bulgarian: 0,
			NativeHawaiian: 0,
			Croat: 0,
			Moroccan: 0,
			Armenian: 0,
			Egyptian: 0,
			'South African': 0,
			Nigerian: 0,
			Serbian: 0,
			Iranian: 0,
			Icelander: 0,
			Syrian: 0,
			Iraqi: 0,
			Slovanian: 0,
			Malays: 0,
			Slovanian: 0,
			Romanian: 0,
			Tanzanian: 0,
			Indonesian: 0,
			Latvian: 0,
			Vietnamese: 0,
			Azerbaijani: 0,
			Thai: 0,
			Mali: 0,
			Zimbabwean: 0,
			Senegalese: 0,
			Niger: 0,
			Algerian: 0,
			Georgian: 0,
			Kenyan: 0,
			Angola: 0,
			'Burkina Faso': 0,
			Beninese: 0,
			Ethiopian: 0,
			Liberia: 0,
			Saudi: 0,
			Lebanese: 0,
			Albanian: 0,
			Jordanian: 0,
			Guinean: 0,
			Lithuanian: 0,
			Bangladeshi: 0,
			Slovakian: 0,
			'Sri Lankan': 0,
			Mauritius: 0,
			Cameroonian: 0,
			Rwandese: 0 
		};
		diasporaMap[`${year}`] = yearDiaspora;
		if (credits === undefined || credits === null || credits.cast === null || credits.crew === null) {
			console.log(`Credits are ${credits} for year ${year}`)
		} else {
			var year_mid_list = Object.keys(credits)
			for (var j = 0; j < year_mid_list.length; j++) {
				var movie_credits = credits[year_mid_list[j]];
				var movie_credits_cast_ids = Object.keys(movie_credits.cast);
				var movie_credits_crew_ids = Object.keys(movie_credits.crew);
				for (var k = 0; k < movie_credits_cast_ids.length; k++) {
					var person = movie_credits.cast[movie_credits_cast_ids[k]];
					if (person.diaspora) 
						diasporaMap[`${year}`][person.diaspora.ethnicity] += 1;
				}
				for (var k = 0; k < movie_credits_crew_ids.length; k++) {
					var person = movie_credits.crew[movie_credits_crew_ids[k]];
					if (person.diaspora) 
						diasporaMap[`${year}`][person.diaspora.ethnicity] += 1;
				}
			}
		}
	}
	var diasporaArrays = { 
		British: Object.values(diasporaMap).map(yearMap => yearMap['British']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		French: Object.values(diasporaMap).map(yearMap => yearMap['French']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Greek: Object.values(diasporaMap).map(yearMap => yearMap['Greek']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Portuguese: Object.values(diasporaMap).map(yearMap => yearMap['Portuguese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		German: Object.values(diasporaMap).map(yearMap => yearMap['German']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Irish: Object.values(diasporaMap).map(yearMap => yearMap['Irish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		AfricanAmerican: Object.values(diasporaMap).map(yearMap => yearMap['AfricanAmerican']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Austrian: Object.values(diasporaMap).map(yearMap => yearMap['Austrian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Chinese: Object.values(diasporaMap).map(yearMap => yearMap['Chinese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Italian: Object.values(diasporaMap).map(yearMap => yearMap['Italian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Jewish: Object.values(diasporaMap).map(yearMap => yearMap['Jewish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Dutch: Object.values(diasporaMap).map(yearMap => yearMap['Dutch']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		HispanoLatino: Object.values(diasporaMap).map(yearMap => yearMap['HispanoLatino']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Danish: Object.values(diasporaMap).map(yearMap => yearMap['Danish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Korean: Object.values(diasporaMap).map(yearMap => yearMap['Korean']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Swedish: Object.values(diasporaMap).map(yearMap => yearMap['Swedish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Indian: Object.values(diasporaMap).map(yearMap => yearMap['Indian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Japanese: Object.values(diasporaMap).map(yearMap => yearMap['Japanese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Norwegian: Object.values(diasporaMap).map(yearMap => yearMap['Norwegian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Russian: Object.values(diasporaMap).map(yearMap => yearMap['Russian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Ukrainian: Object.values(diasporaMap).map(yearMap => yearMap['Ukrainian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Ivoirien: Object.values(diasporaMap).map(yearMap => yearMap['Ivoirien']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Finnish: Object.values(diasporaMap).map(yearMap => yearMap['Finnish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Moldova: Object.values(diasporaMap).map(yearMap => yearMap['Moldova']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Ghanaian: Object.values(diasporaMap).map(yearMap => yearMap['Ghanaian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Swiss: Object.values(diasporaMap).map(yearMap => yearMap['Swiss']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Polish: Object.values(diasporaMap).map(yearMap => yearMap['Polish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Hungarian: Object.values(diasporaMap).map(yearMap => yearMap['Hungarian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Pakistanese: Object.values(diasporaMap).map(yearMap => yearMap['Pakistanese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Tunisian: Object.values(diasporaMap).map(yearMap => yearMap['Tunisian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		'Congolese (Kinshasa)': Object.values(diasporaMap).map(yearMap => yearMap['Congolese (Kinshasa)']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Czech: Object.values(diasporaMap).map(yearMap => yearMap['Czech']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Turkish: Object.values(diasporaMap).map(yearMap => yearMap['Turkish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Mauritanian: Object.values(diasporaMap).map(yearMap => yearMap['Mauritanian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Bulgarian: Object.values(diasporaMap).map(yearMap => yearMap['Bulgarian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		NativeHawaiian: Object.values(diasporaMap).map(yearMap => yearMap['NativeHawaiian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Croat: Object.values(diasporaMap).map(yearMap => yearMap['Croat']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Moroccan: Object.values(diasporaMap).map(yearMap => yearMap['Moroccan']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Armenian: Object.values(diasporaMap).map(yearMap => yearMap['Armenian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Egyptian: Object.values(diasporaMap).map(yearMap => yearMap['Egyptian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		'South African': Object.values(diasporaMap).map(yearMap => yearMap['South African']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Nigerian: Object.values(diasporaMap).map(yearMap => yearMap['Nigerian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Serbian: Object.values(diasporaMap).map(yearMap => yearMap['Serbian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Iranian: Object.values(diasporaMap).map(yearMap => yearMap['Iranian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
	}

	fs.writeFile(`${__dirname}/../tmp/topCenturyDiasporaCount_${new Date().getTime()}.json`, JSON.stringify(diasporaArrays), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyDiasporaCount_${new Date().getTime()}.json !`);
	});
}

function getAllEthnicities() {
	var augmentedJSON = fs.readFileSync(`${__dirname}/../tmp/diaspora/topCenturyMovies_(augmented)_1550864198286.json`);
	var augmentedMap = JSON.parse(augmentedJSON);
	console.log('Loaded augmentedMap');
	var diasporaMap = {
		British: 0,
		French: 0,
		Greek: 0,
		Portuguese: 0,
		German: 0,
		Irish: 0,
		AfricanAmerican: 0,
		Austrian: 0,
		Chinese: 0,
		Italian: 0,
		Jewish: 0,
		Dutch: 0,
		HispanoLatino: 0,
		Danish: 0,
		Korean: 0,
		Swedish: 0,
		Indian: 0,
		Japanese: 0,
		Norwegian: 0,
		Russian: 0,
		Ukrainian: 0,
		Ivoirien: 0,
		Finnish: 0,
		Moldova: 0,
		Ghanaian: 0,
		Swiss: 0,
		Polish: 0,
		Hungarian: 0,
		Pakistanese: 0,
		Tunisian: 0,
		'Congolese (Kinshasa)': 0,
		Czech: 0,
		Turkish: 0,
		Mauritanian: 0,
		Bulgarian: 0,
		NativeHawaiian: 0,
		Croat: 0,
		Moroccan: 0,
		Armenian: 0,
		Egyptian: 0,
		'South African': 0,
		Nigerian: 0,
		Serbian: 0,
		Iranian: 0,
		Icelander: 0,
		Syrian: 0,
		Iraqi: 0,
		Slovanian: 0,
		Malays: 0,
		Slovanian: 0,
		Romanian: 0,
		Tanzanian: 0,
		Indonesian: 0,
		Latvian: 0,
		Vietnamese: 0,
		Azerbaijani: 0,
		Thai: 0,
		Mali: 0,
		Zimbabwean: 0,
		Senegalese: 0,
		Niger: 0,
		Algerian: 0,
		Georgian: 0,
		Kenyan: 0,
		Angola: 0,
		'Burkina Faso': 0,
		Beninese: 0,
		Ethiopian: 0,
		Liberia: 0,
		Saudi: 0,
		Lebanese: 0,
		Albanian: 0,
		Jordanian: 0,
		Guinean: 0,
		Lithuanian: 0,
		Bangladeshi: 0,
		Slovakian: 0,
		'Sri Lankan': 0,
		Mauritius: 0,
		Cameroonian: 0,
		Rwandese: 0 
	};

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
				for (var k = 0; k < movie_credits_cast_ids.length; k++) {
					var person = movie_credits.cast[movie_credits_cast_ids[k]];
					if (person.diaspora) 
						diasporaMap[person.diaspora.ethnicity] += 1;
				}
				for (var k = 0; k < movie_credits_crew_ids.length; k++) {
					var person = movie_credits.crew[movie_credits_crew_ids[k]];
					if (person.diaspora) 
						diasporaMap[person.diaspora.ethnicity] += 1;
				}
			}
		}
	}

	console.log(diasporaMap);
}

// getAllEthnicities();
// topCenturyDepartmentCount()
// topCenturyGenderCount()
// topCenturyBreakdownGenderByDepartment()
topCenturyDiasporaCount()
