const fs = require('fs');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function topCenturyDepartmentCount() {

	var creditsJSON = fs.readFileSync(`${__dirname}/../tmp/centuryTopMovieNames.json`);
	var creditsMap = JSON.parse(creditsJSON);
	var departmentMap = {};

	for (var year = 1900; year <= 2018; year++) {
		var yearCredits = creditsMap[`${year}`];
		var yearDepartment = {
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
		if (yearCredits === undefined || yearCredits === null || Object.keys(yearCredits).length === 0) {
			console.log(`Credits are ${yearCredits} for year ${year}`)
		} else {
			var year_mid_list = Object.keys(yearCredits);
			for (var j = 0; j < year_mid_list.length; j++) {
				var movie_credits = yearCredits[year_mid_list[j]];
				var movie_credits_cast_ids = Object.keys(movie_credits.cast);
				var movie_credits_crew_ids = Object.keys(movie_credits.crew);
				yearDepartment['Cast'] = movie_credits_cast_ids.length;				
				for (var k = 0; k < movie_credits_crew_ids.length; k++) {
					var person = movie_credits.crew[movie_credits_crew_ids[k]];
					if (person.department === 'Actors')
						person.department = 'Cast';
					yearDepartment[person.department.replaceAll('[^A-Za-z]', '')] += 1;
				}
			}
		}
		departmentMap[`${year}`] = yearDepartment;
	}
	console.log(`topCenturyDepartmentCount_${new Date().getTime()}.json mapped`);
	var time = new Date().getTime()
	fs.writeFile(`${__dirname}/../tmp/topCenturyDepartmentCount(1)_${time}.json`, JSON.stringify(departmentMap), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyDepartmentCount(1)_${time}.json !`);
	});

	var departmentArrays = { 
		Cast: Object.values(departmentMap).map(yearMap => yearMap['Cast']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Directing: Object.values(departmentMap).map(yearMap => yearMap['Directing']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Writing: Object.values(departmentMap).map(yearMap => yearMap['Writing']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Production: Object.values(departmentMap).map(yearMap => yearMap['Production']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Editing: Object.values(departmentMap).map(yearMap => yearMap['Editing']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Camera: Object.values(departmentMap).map(yearMap => yearMap['Camera']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Crew: Object.values(departmentMap).map(yearMap => yearMap['Crew']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		VisualEffects: Object.values(departmentMap).map(yearMap => yearMap['VisualEffects']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Sound: Object.values(departmentMap).map(yearMap => yearMap['Sound']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Art: Object.values(departmentMap).map(yearMap => yearMap['Art']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Lighting: Object.values(departmentMap).map(yearMap => yearMap['Lighting']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		CostumeMakeUp: Object.values(departmentMap).map(yearMap => yearMap['CostumeMakeUp']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		})
	};
	var time = new Date().getTime()

	fs.writeFile(`${__dirname}/../tmp/topCenturyDepartmentCount(2)_${time}.json`, JSON.stringify(departmentArrays), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyDepartmentCount(2)_${time}.json !`);
	});
}

function topCenturyGenderCount() {
	var creditsJSON = fs.readFileSync(`${__dirname}/../tmp/centuryTopMovieNames.json`);
	var creditsMap = JSON.parse(creditsJSON);
	var departmentMap = {};

	for (var year = 1900; year <= 2018; year++) {
		var yearCredits = creditsMap[`${year}`];
		var yearDepartment = {
			Female: 0, 
			Male: 0,
			Unknown: 0
		};
		if (yearCredits === undefined || yearCredits === null || Object.keys(yearCredits).length === 0) {
			console.log(`Credits are ${yearCredits} for year ${year}`)
		} else {
			var year_mid_list = Object.keys(yearCredits);
			for (var j = 0; j < year_mid_list.length; j++) {
				var movie_credits = yearCredits[year_mid_list[j]];
				var movie_credits_cast_ids = Object.keys(movie_credits.cast);
				var movie_credits_crew_ids = Object.keys(movie_credits.crew);
				for (var k = 0; k < movie_credits_cast_ids.length; k++) {
					var gender = movie_credits.cast[movie_credits_cast_ids[k]].gender;
					switch (gender) {
						case 0:
							yearDepartment.Unknown += 1;
							break;
						case 1: 
							yearDepartment.Female += 1;
							break;
						case 2: 
							yearDepartment.Male += 1;
							break;
						default:
							console.log(`Encountered unknown value`);
							break;
					}
				}			
				for (var k = 0; k < movie_credits_crew_ids.length; k++) {
					var gender = movie_credits.crew[movie_credits_crew_ids[k]].gender;
					switch (gender) {
						case 0:
							yearDepartment.Unknown += 1;
							break;
						case 1: 
							yearDepartment.Female += 1;
							break;
						case 2: 
							yearDepartment.Male += 1;
							break;
						default:
							console.log(`Encountered unknown value`);
							break;
					}
				}
			}
		}
		departmentMap[`${year}`] = yearDepartment;
	}

	var genderArrays = { 
		Unknown: Object.values(departmentMap).map(yearMap => yearMap['Unknown']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Female: Object.values(departmentMap).map(yearMap => yearMap['Female']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Male: Object.values(departmentMap).map(yearMap => yearMap['Male']).map((value, index) => {
			var total = Object.values(Object.values(departmentMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		})
	};

	// console.log(departmentMap)
	// console.log(`Totals: ${totals}`)
	console.log(`topCenturyGenderCount_${new Date().getTime()} mapped`);
	var time = new Date().getTime()

	fs.writeFile(`${__dirname}/../tmp/topCenturyGenderCount_${time}.json`, JSON.stringify(genderArrays), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyGenderCount_${time}.json !`);
	});
}

// TODO: Output both: (1) counts (2) percentages
// TODO: Reformat to be good for time series data.
function topCenturyBreakdownGenderByDepartment() {
	
	var creditsJSON = fs.readFileSync(`${__dirname}/../tmp/centuryTopMovieNames.json`);
	var creditsMap = JSON.parse(creditsJSON);
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
	
	for (var year = 1900; year <= 2018; year++) {
		var yearCredits = creditsMap[`${year}`];
		if (yearCredits === undefined || yearCredits === null || Object.keys(yearCredits).length === 0) {
			console.log(`Credits are ${yearCredits} for year ${year}`)
		} else {
			var year_mid_list = Object.keys(yearCredits);
			for (var j = 0; j < year_mid_list.length; j++) {
				var movie_credits = yearCredits[year_mid_list[j]];
				var movie_credits_cast_ids = Object.keys(movie_credits.cast);
				var movie_credits_crew_ids = Object.keys(movie_credits.crew);
				for (var k = 0; k < movie_credits_cast_ids.length; k++) {
					var gender = movie_credits.cast[movie_credits_cast_ids[k]].gender;
					deptGenderBreakdown['Cast'][gender] += 1;
				}			
				for (var k = 0; k < movie_credits_crew_ids.length; k++) {
					var person = movie_credits.crew[movie_credits_crew_ids[k]];
					if (person.department.replaceAll('[^A-Za-z]', '') === 'Actors')
						person.department = 'Cast'; // One-off type replacement.
					deptGenderBreakdown[person.department.replaceAll('[^A-Za-z]', '')][person.gender] += 1;
				}
			}
		}
	}

	console.log(`topCenturyBreakdownGenderByDepartment_${new Date().getTime()} mapped`);

	var time = new Date().getTime()
	fs.writeFile(`${__dirname}/../tmp/topCenturyBreakdownGenderByDepartment_${time}.json`, JSON.stringify(deptGenderBreakdown), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyBreakdownGenderByDepartment_${time}.json !`);
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

	for (var year = 1900; year <= 2018; year++) {
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

// 1. Get the types of ethnicities
// 2. No selection panel this time, though. Not breaking up our information by department because there's not enough in the movies that are earlier on.
function topCenturyDiasporaCount() {
	var augmentedJSON = fs.readFileSync(`${__dirname}/../tmp/diaspora/topCenturyMovies_(augmented)_1550864198286.json`);
	var augmentedMap = JSON.parse(augmentedJSON);
	var diasporaMap = {};

	for (var year = 1900; year <= 2018; year++) {
		var yearCredits = augmentedMap[`${year}`]
		var yearDiaspora = { 
			British: 0,
			Portuguese: 0,
			German: 0,
			French: 0,
			Irish: 0,
			Jewish: 0,
			Italian: 0,
			Japanese: 0,
			Greek: 0,
			AfricanAmerican: 0,
			Austrian: 0,
			Chinese: 0,
			Dutch: 0,
			HispanoLatino: 0,
			Danish: 0,
			Swedish: 0,
			Indian: 0,
			Russian: 0,
			Polish: 0,
			'South African': 0,
			Korean: 0,
			Norwegian: 0,
			Ukrainian: 0,
			Ivoirien: 0,
			Finnish: 0,
			Moldova: 0,
			Ghanaian: 0,
			Swiss: 0,
			Hungarian: 0,
			Zimbabwean: 0,
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
		if (yearCredits === undefined || yearCredits === null || Object.keys(yearCredits).length === 0) {
			console.log(`Credits are ${yearCredits} for year ${year}`)
		} else {
			var year_mid_list = Object.keys(yearCredits)
			for (var j = 0; j < year_mid_list.length; j++) {
				var movie_credits = yearCredits[year_mid_list[j]];
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

/*
			HispanoLatino: 0,
			Danish: 0,
			Swedish: 0,
			Indian: 0,
			Russian: 0,
			Polish: 0,
			'South African': 0,

*/


		British: Object.values(diasporaMap).map(yearMap => yearMap['British']).map((value, index) => {
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
		French: Object.values(diasporaMap).map(yearMap => yearMap['French']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Irish: Object.values(diasporaMap).map(yearMap => yearMap['Irish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Jewish: Object.values(diasporaMap).map(yearMap => yearMap['Jewish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Italian: Object.values(diasporaMap).map(yearMap => yearMap['Italian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Japanese: Object.values(diasporaMap).map(yearMap => yearMap['Japanese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Greek: Object.values(diasporaMap).map(yearMap => yearMap['Greek']).map((value, index) => {
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
		Swedish: Object.values(diasporaMap).map(yearMap => yearMap['Swedish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Indian: Object.values(diasporaMap).map(yearMap => yearMap['Indian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Russian: Object.values(diasporaMap).map(yearMap => yearMap['Russian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Polish: Object.values(diasporaMap).map(yearMap => yearMap['Polish']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		'South African': Object.values(diasporaMap).map(yearMap => yearMap['South African']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Korean: Object.values(diasporaMap).map(yearMap => yearMap['Korean']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Norwegian: Object.values(diasporaMap).map(yearMap => yearMap['Norwegian']).map((value, index) => {
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
		Hungarian: Object.values(diasporaMap).map(yearMap => yearMap['Hungarian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Zimbabwean: Object.values(diasporaMap).map(yearMap => yearMap['Zimbabwean']).map((value, index) => {
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
		Icelander: Object.values(diasporaMap).map(yearMap => yearMap['Icelander']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Syrian: Object.values(diasporaMap).map(yearMap => yearMap['Syrian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Iraqi: Object.values(diasporaMap).map(yearMap => yearMap['Iraqi']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Slovanian: Object.values(diasporaMap).map(yearMap => yearMap['Slovanian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Malays: Object.values(diasporaMap).map(yearMap => yearMap['Malays']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Slovanian: Object.values(diasporaMap).map(yearMap => yearMap['Slovanian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Romanian: Object.values(diasporaMap).map(yearMap => yearMap['Romanian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Tanzanian: Object.values(diasporaMap).map(yearMap => yearMap['Tanzanian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Indonesian: Object.values(diasporaMap).map(yearMap => yearMap['Indonesian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Latvian: Object.values(diasporaMap).map(yearMap => yearMap['Latvian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Vietnamese: Object.values(diasporaMap).map(yearMap => yearMap['Vietnamese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Azerbaijani: Object.values(diasporaMap).map(yearMap => yearMap['Azerbaijani']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Thai: Object.values(diasporaMap).map(yearMap => yearMap['Thai']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Mali: Object.values(diasporaMap).map(yearMap => yearMap['Mali']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Senegalese: Object.values(diasporaMap).map(yearMap => yearMap['Senegalese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Niger: Object.values(diasporaMap).map(yearMap => yearMap['Niger']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Algerian: Object.values(diasporaMap).map(yearMap => yearMap['Algerian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Georgian: Object.values(diasporaMap).map(yearMap => yearMap['Georgian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Kenyan: Object.values(diasporaMap).map(yearMap => yearMap['Kenyan']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Angola: Object.values(diasporaMap).map(yearMap => yearMap['Angola']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		'Burkina Faso': Object.values(diasporaMap).map(yearMap => yearMap['Burkina Faso']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Beninese: Object.values(diasporaMap).map(yearMap => yearMap['Beninese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Ethiopian: Object.values(diasporaMap).map(yearMap => yearMap['Ethiopian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Liberia: Object.values(diasporaMap).map(yearMap => yearMap['Liberia']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Saudi: Object.values(diasporaMap).map(yearMap => yearMap['Saudi']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Lebanese: Object.values(diasporaMap).map(yearMap => yearMap['Lebanese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Albanian: Object.values(diasporaMap).map(yearMap => yearMap['Albanian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Jordanian: Object.values(diasporaMap).map(yearMap => yearMap['Jordanian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Guinean: Object.values(diasporaMap).map(yearMap => yearMap['Guinean']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Lithuanian: Object.values(diasporaMap).map(yearMap => yearMap['Lithuanian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Bangladeshi: Object.values(diasporaMap).map(yearMap => yearMap['Bangladeshi']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Slovakian: Object.values(diasporaMap).map(yearMap => yearMap['Slovakian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		'Sri Lankan': Object.values(diasporaMap).map(yearMap => ['Sri Lankan']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Mauritius: Object.values(diasporaMap).map(yearMap => yearMap['Mauritius']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Cameroonian: Object.values(diasporaMap).map(yearMap => yearMap['Cameroonian']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
		Rwandese: Object.values(diasporaMap).map(yearMap => yearMap['Rwandese']).map((value, index) => {
			var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
			return value / (total === 0 ? 1: total);
		}),
	}

	var time = new Date().getTime()
	fs.writeFile(`${__dirname}/../tmp/topCenturyDiasporaCount_${time}.json`, JSON.stringify(diasporaArrays), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyDiasporaCount_${time}.json !`);
	});
}

// TODO: Break down diaspora by department

function topCenturyDiasporaCode() {
	var augmentedJSON = fs.readFileSync(`${__dirname}/../tmp/diaspora/topCenturyMovies_(augmented)_1550864198286.json`);
	var augmentedMap = JSON.parse(augmentedJSON);
	var diasporaMap = {};
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
		NativeHawaiian: 'US-HW', 
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
		Lesotho: 'LS',
	};

	for (var year = 1900; year <= 2018; year++) {
		var yearCredits = augmentedMap[`${year}`]
		var yearDiaspora = { 
			'GB': 0,
			'PT': 0,
			'DE': 0,
			'FR': 0,
			'IE': 0,
			'IL': 0,
			'IT': 0,
			'JP': 0,
			'GR': 0,
			'CG': 0,
			'AT': 0,
			'CN': 0,
			'NL': 0,
			'ES': 0,
			'ES': 0,
			'DK': 0,
			'SE': 0,
			'IN': 0,
			'RU': 0,
			'PL': 0,
			'ZA': 0,
			'KR': 0,
			'NO': 0,
			'UA': 0,
			'CI': 0,
			'FI': 0,
			'MD': 0,
			'GH': 0,
			'CH': 0,
			'HU': 0,
			'ZW': 0,
			'PK': 0,
			'TN': 0,
			'CG': 0,
			'CZ': 0,
			'TR': 0,
			'MU': 0,
			'BG': 0,
			'US-HW': 0,
			'HR': 0,
			'MA': 0,
			'AM': 0,
			'EG': 0,
			'NE': 0,
			'RS': 0,
			'IR': 0,
			'IS': 0,
			'SY': 0,
			'IQ': 0,
			'SI': 0,
			'MY': 0,
			'SI': 0,
			'RO': 0,
			'TZ': 0,
			'ID': 0,
			'LV': 0,
			'VN': 0,
			'AZ': 0,
			'TH': 0,
			'ML': 0,
			'SN': 0,
			'NG': 0,
			'DZ': 0,
			'GE': 0,
			'KE': 0,
			'AO': 0,
			'BF': 0,
			'BJ': 0,
			'ET': 0,
			'LR': 0,
			'SA': 0,
			'LB': 0,
			'AL': 0,
			'JO': 0,
			'GN': 0,
			'LT': 0,
			'BD': 0,
			'SK': 0,
			'LK': 0,
			'MU': 0,
			'CM': 0,
			'RW': 0,
			'LS': 0
		};
		diasporaMap[`${year}`] = yearDiaspora;
		if (yearCredits === undefined || yearCredits === null || Object.keys(yearCredits).length === 0) {
			console.log(`Credits are ${yearCredits} for year ${year}`)
		} else {
			var year_mid_list = Object.keys(yearCredits)
			for (var j = 0; j < year_mid_list.length; j++) {
				var movie_credits = yearCredits[year_mid_list[j]];
				var movie_credits_cast_ids = Object.keys(movie_credits.cast);
				var movie_credits_crew_ids = Object.keys(movie_credits.crew);
				for (var k = 0; k < movie_credits_cast_ids.length; k++) {
					var person = movie_credits.cast[movie_credits_cast_ids[k]];
					if (person.diaspora) 
						diasporaMap[`${year}`][countryCodeMap[person.diaspora.ethnicity]] += 1;
				}
				for (var k = 0; k < movie_credits_crew_ids.length; k++) {
					var person = movie_credits.crew[movie_credits_crew_ids[k]];
					if (person.diaspora) 
						diasporaMap[`${year}`][countryCodeMap[person.diaspora.ethnicity]] += 1;
				}
			}
		}
	}

	var time = new Date().getTime()
	fs.writeFile(`${__dirname}/../tmp/topCenturyDiasporaCodeCount_${time}.json`, JSON.stringify(diasporaMap), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyDiasporaCount_${time}.json !`);
	});

}

function topCenturyNameChange() {
	var augmentedJSON = fs.readFileSync(`${__dirname}/../tmp/diaspora/topCenturyMovies_(double_augmented)_1551825544655.json`);
	var augmentedMap = JSON.parse(augmentedJSON);
	var diasporaMap = {};
	var outgoingMap = {
		British: 0,
		Portuguese: 0,
		German: 0,
		French: 0,
		Irish: 0,
		Jewish: 0,
		Italian: 0,
		Japanese: 0,
		AfricanAmerican: 0,
		Austrian: 0,
		Chinese: 0,
		Dutch: 0,
		HispanoLatino: 0,
		Danish: 0,
		Korean: 0,
		Swedish: 0,
		Indian: 0,
		Norwegian: 0,
		Russian: 0,
		Greek: 0,
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

	// Now I have to make the pairings per year!
	/*

	1900: {
		Country A: {
			Country A: weighted_value,
			Country B: weighted_value,
			Country C: weighted_value,
			...
		},
		Country B: {
			Country A: weighted_value,
			Country B: weighted_value,
			Country C: weighted_value,
			...
		}
		Country C: ...
		...
	}
	*/
	// console.log({});

	for (var year = 1900; year <= 2018; year++) {
		var yearCredits = augmentedMap[`${year}`]
		var yearPreDiaspora = { 
			British: {},
			Portuguese: {},
			German: {},
			French: {},
			Irish: {},
			Jewish: {},
			Italian: {},
			Japanese: {},
			AfricanAmerican: {},
			Austrian: {},
			Chinese: {},
			Dutch: {},
			Hispanic: {},
			HispanoLatino: {},
			Danish: {},
			Korean: {},
			Swedish: {},
			Indian: {},
			Norwegian: {},
			Russian: {},
			Greek: {},
			Ukrainian: {},
			Ivoirien: {},
			Finnish: {},
			Moldova: {},
			Ghanaian: {},
			Swiss: {},
			Polish: {},
			Hungarian: {},
			Pakistanese: {},
			Tunisian: {},
			'Congolese (Kinshasa)': {},
			Czech: {},
			Turkish: {},
			Mauritanian: {},
			Bulgarian: {},
			NativeHawaiian: {},
			Croat: {},
			Moroccan: {},
			Armenian: {},
			Egyptian: {},
			'South African': {},
			Nigerian: {},
			Serbian: {},
			Iranian: {},
			Icelander: {},
			Syrian: {},
			Iraqi: {},
			Slovanian: {},
			Malays: {},
			Slovanian: {},
			Romanian: {},
			Tanzanian: {},
			Indonesian: {},
			Latvian: {},
			Vietnamese: {},
			Azerbaijani: {},
			Thai: {},
			Mali: {},
			Zimbabwean: {},
			Senegalese: {},
			Niger: {},
			Algerian: {},
			Georgian: {},
			Kenyan: {},
			Angola: {},
			'Burkina Faso': {},
			Beninese: {},
			Ethiopian: {},
			Liberia: {},
			Saudi: {},
			Lebanese: {},
			Albanian: {},
			Jordanian: {},
			Guinean: {},
			Lithuanian: {},
			Bangladeshi: {},
			Slovakian: {},
			'Sri Lankan': {},
			Mauritius: {},
			Cameroonian: {},
			Rwandese: {},
			Lesotho: {}
		};
		diasporaMap[`${year}`] = yearPreDiaspora;
		if (yearCredits === undefined || yearCredits === null || Object.keys(yearCredits).length === 0) {
			console.log(`Credits are ${yearCredits} for year ${year}`)
		} else {
			var year_mid_list = Object.keys(yearCredits)
			for (var j = 0; j < year_mid_list.length; j++) {
				var movie_credits = yearCredits[year_mid_list[j]];
				var movie_credits_cast_ids = Object.keys(movie_credits.cast);
				var movie_credits_crew_ids = Object.keys(movie_credits.crew);
				for (var k = 0; k < movie_credits_cast_ids.length; k++) {
					var person = movie_credits.cast[movie_credits_cast_ids[k]];
					if (person.previous_diaspora && person.post_diaspora && person.previous_diaspora.ethnicity !== person.post_diaspora.ethnicity && person.previous_diaspora.ethnicity !== person.post_diaspora.ethnicityAlt) {
						var score = person.previous_diaspora.score - person.post_diaspora.score;
						if (diasporaMap[`${year}`][person.previous_diaspora.ethnicity][person.post_diaspora.ethnicity] === undefined) 
							diasporaMap[`${year}`][person.previous_diaspora.ethnicity][person.post_diaspora.ethnicity] = 1
						else 
							diasporaMap[`${year}`][person.previous_diaspora.ethnicity][person.post_diaspora.ethnicity] += 1;
						if (person.previous_diaspora.ethnicity === 'British' && person.post_diaspora.ethnicity === 'Chinese')
							console.log(person.birth_name, person.previous_diaspora.ethnicity, person.previous_diaspora.ethnicityAlt, person.imdb_name, person.post_diaspora.ethnicity, person.post_diaspora.ethnicityAlt)
					}
				}
				for (var k = 0; k < movie_credits_crew_ids.length; k++) {
					var person = movie_credits.crew[movie_credits_crew_ids[k]];
					if (person.previous_diaspora && person.post_diaspora && person.previous_diaspora.ethnicity !== person.post_diaspora.ethnicity && person.previous_diaspora.ethnicity !== person.post_diaspora.ethnicityAlt) {
						var score = person.previous_diaspora.score - person.post_diaspora.score;
						if (diasporaMap[`${year}`][person.previous_diaspora.ethnicity][person.post_diaspora.ethnicity] === undefined) 
							diasporaMap[`${year}`][person.previous_diaspora.ethnicity][person.post_diaspora.ethnicity] = 1
						else 
							diasporaMap[`${year}`][person.previous_diaspora.ethnicity][person.post_diaspora.ethnicity] += 1;
						if (person.previous_diaspora.ethnicity === 'British' && person.post_diaspora.ethnicity === 'Chinese')
							console.log(person.birth_name, person.previous_diaspora.ethnicity, person.previous_diaspora.ethnicityAlt, person.imdb_name, person.post_diaspora.ethnicity, person.post_diaspora.ethnicityAlt)
					}
				}
			}
		}
	}
	// var diasporaArrays = { 
	// 	British: Object.values(diasporaMap).map(yearMap => yearMap['British']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	French: Object.values(diasporaMap).map(yearMap => yearMap['French']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Greek: Object.values(diasporaMap).map(yearMap => yearMap['Greek']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Portuguese: Object.values(diasporaMap).map(yearMap => yearMap['Portuguese']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	German: Object.values(diasporaMap).map(yearMap => yearMap['German']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Irish: Object.values(diasporaMap).map(yearMap => yearMap['Irish']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	AfricanAmerican: Object.values(diasporaMap).map(yearMap => yearMap['AfricanAmerican']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Austrian: Object.values(diasporaMap).map(yearMap => yearMap['Austrian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Chinese: Object.values(diasporaMap).map(yearMap => yearMap['Chinese']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Italian: Object.values(diasporaMap).map(yearMap => yearMap['Italian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Jewish: Object.values(diasporaMap).map(yearMap => yearMap['Jewish']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Dutch: Object.values(diasporaMap).map(yearMap => yearMap['Dutch']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	HispanoLatino: Object.values(diasporaMap).map(yearMap => yearMap['HispanoLatino']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Danish: Object.values(diasporaMap).map(yearMap => yearMap['Danish']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Korean: Object.values(diasporaMap).map(yearMap => yearMap['Korean']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Swedish: Object.values(diasporaMap).map(yearMap => yearMap['Swedish']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Indian: Object.values(diasporaMap).map(yearMap => yearMap['Indian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Japanese: Object.values(diasporaMap).map(yearMap => yearMap['Japanese']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Norwegian: Object.values(diasporaMap).map(yearMap => yearMap['Norwegian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Russian: Object.values(diasporaMap).map(yearMap => yearMap['Russian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Ukrainian: Object.values(diasporaMap).map(yearMap => yearMap['Ukrainian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Ivoirien: Object.values(diasporaMap).map(yearMap => yearMap['Ivoirien']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Finnish: Object.values(diasporaMap).map(yearMap => yearMap['Finnish']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Moldova: Object.values(diasporaMap).map(yearMap => yearMap['Moldova']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Ghanaian: Object.values(diasporaMap).map(yearMap => yearMap['Ghanaian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Swiss: Object.values(diasporaMap).map(yearMap => yearMap['Swiss']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Polish: Object.values(diasporaMap).map(yearMap => yearMap['Polish']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Hungarian: Object.values(diasporaMap).map(yearMap => yearMap['Hungarian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Pakistanese: Object.values(diasporaMap).map(yearMap => yearMap['Pakistanese']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Tunisian: Object.values(diasporaMap).map(yearMap => yearMap['Tunisian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	'Congolese (Kinshasa)': Object.values(diasporaMap).map(yearMap => yearMap['Congolese (Kinshasa)']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Czech: Object.values(diasporaMap).map(yearMap => yearMap['Czech']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Turkish: Object.values(diasporaMap).map(yearMap => yearMap['Turkish']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Mauritanian: Object.values(diasporaMap).map(yearMap => yearMap['Mauritanian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Bulgarian: Object.values(diasporaMap).map(yearMap => yearMap['Bulgarian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	NativeHawaiian: Object.values(diasporaMap).map(yearMap => yearMap['NativeHawaiian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Croat: Object.values(diasporaMap).map(yearMap => yearMap['Croat']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Moroccan: Object.values(diasporaMap).map(yearMap => yearMap['Moroccan']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Armenian: Object.values(diasporaMap).map(yearMap => yearMap['Armenian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Egyptian: Object.values(diasporaMap).map(yearMap => yearMap['Egyptian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	'South African': Object.values(diasporaMap).map(yearMap => yearMap['South African']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Nigerian: Object.values(diasporaMap).map(yearMap => yearMap['Nigerian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Serbian: Object.values(diasporaMap).map(yearMap => yearMap['Serbian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Iranian: Object.values(diasporaMap).map(yearMap => yearMap['Iranian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Icelander: Object.values(diasporaMap).map(yearMap => yearMap['Icelander']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Syrian: Object.values(diasporaMap).map(yearMap => yearMap['Syrian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Iraqi: Object.values(diasporaMap).map(yearMap => yearMap['Iraqi']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Slovanian: Object.values(diasporaMap).map(yearMap => yearMap['Slovanian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Malays: Object.values(diasporaMap).map(yearMap => yearMap['Malays']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Slovanian: Object.values(diasporaMap).map(yearMap => yearMap['Slovanian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Romanian: Object.values(diasporaMap).map(yearMap => yearMap['Romanian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Tanzanian: Object.values(diasporaMap).map(yearMap => yearMap['Tanzanian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Indonesian: Object.values(diasporaMap).map(yearMap => yearMap['Indonesian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Latvian: Object.values(diasporaMap).map(yearMap => yearMap['Latvian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Vietnamese: Object.values(diasporaMap).map(yearMap => yearMap['Vietnamese']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Azerbaijani: Object.values(diasporaMap).map(yearMap => yearMap['Azerbaijani']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Thai: Object.values(diasporaMap).map(yearMap => yearMap['Thai']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Mali: Object.values(diasporaMap).map(yearMap => yearMap['Mali']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Zimbabwean: Object.values(diasporaMap).map(yearMap => yearMap['Zimbabwean']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Senegalese: Object.values(diasporaMap).map(yearMap => yearMap['Senegalese']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Niger: Object.values(diasporaMap).map(yearMap => yearMap['Niger']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Algerian: Object.values(diasporaMap).map(yearMap => yearMap['Algerian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Georgian: Object.values(diasporaMap).map(yearMap => yearMap['Georgian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Kenyan: Object.values(diasporaMap).map(yearMap => yearMap['Kenyan']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Angola: Object.values(diasporaMap).map(yearMap => yearMap['Angola']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	'Burkina Faso': Object.values(diasporaMap).map(yearMap => yearMap['Burkina Faso']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Beninese: Object.values(diasporaMap).map(yearMap => yearMap['Beninese']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Ethiopian: Object.values(diasporaMap).map(yearMap => yearMap['Ethiopian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Liberia: Object.values(diasporaMap).map(yearMap => yearMap['Liberia']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Saudi: Object.values(diasporaMap).map(yearMap => yearMap['Saudi']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Lebanese: Object.values(diasporaMap).map(yearMap => yearMap['Lebanese']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Albanian: Object.values(diasporaMap).map(yearMap => yearMap['Albanian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Jordanian: Object.values(diasporaMap).map(yearMap => yearMap['Jordanian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Guinean: Object.values(diasporaMap).map(yearMap => yearMap['Guinean']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Lithuanian: Object.values(diasporaMap).map(yearMap => yearMap['Lithuanian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Bangladeshi: Object.values(diasporaMap).map(yearMap => yearMap['Bangladeshi']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Slovakian: Object.values(diasporaMap).map(yearMap => yearMap['Slovakian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	'Sri Lankan': Object.values(diasporaMap).map(yearMap => yearMap['Sri Lankan']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Mauritius: Object.values(diasporaMap).map(yearMap => yearMap['Mauritius']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Cameroonian: Object.values(diasporaMap).map(yearMap => yearMap['Cameroonian']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// 	Rwandese: Object.values(diasporaMap).map(yearMap => yearMap['Rwandese']).map((value, index) => {
	// 		var total = Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue);
	// 		return value / (total === 0 ? 1: total);
	// 	}),
	// }

	// console.log(Object.entries(diasporaMap)[100]);
	var diasporaYearBreakdown = Object.entries(diasporaMap);
	var leanMap = {};
	for (var i = 0; i < diasporaYearBreakdown.length; i++) {
		var year = diasporaYearBreakdown[i][0];
		leanMap[year] = {}; // 1900: {}
		var outgoingBreakdown = Object.entries(diasporaYearBreakdown[i][1]);
		for (var j = 0; j < outgoingBreakdown.length; j++) {
			if (Object.entries(outgoingBreakdown[j][1]).length > 0) {
				var originCountry = outgoingBreakdown[j][0];
				leanMap[year][originCountry] = diasporaMap[year][originCountry];
			}
		}
	}

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

	// Convert to codes
	var leanCodeMap = {};
	for (var i = 0; i < diasporaYearBreakdown.length; i++) {
		var year = diasporaYearBreakdown[i][0];
		leanCodeMap[year] = {}; // 1900: {}
		var outgoingBreakdown = Object.entries(diasporaYearBreakdown[i][1]);
		for (var j = 0; j < outgoingBreakdown.length; j++) {
			if (Object.entries(outgoingBreakdown[j][1]).length > 0) {
				var originCountry = outgoingBreakdown[j][0];
				leanCodeMap[year][countryCodeMap[originCountry]] = {};
				//convert diasporaMap to codes
				var incomingBreakdown = Object.entries(diasporaMap[year][originCountry]);
				for (var k = 0; k < incomingBreakdown.length; k++) {
					leanCodeMap[year][countryCodeMap[originCountry]][countryCodeMap[incomingBreakdown[k][0]]] = incomingBreakdown[k][1]
				}
			}
		}
	}

	var time = new Date().getTime()
	// fs.writeFile(`${__dirname}/../tmp/nameChangeDiasporaCount_${time}.json`, JSON.stringify(leanCodeMap), function(err) {
	// 	if(err) {
	// 		return console.log(err);
	// 	}
	// 	console.log(`The file was saved to location: ${__dirname}/../tmp/nameChangeDiasporaCount_${time}.json !`);
	// });
	// console.log(leanCodeMap);
}


// getAllEthnicities();
// topCenturyDepartmentCount()
// topCenturyGenderCount()
// topCenturyBreakdownGenderByDepartment()
// topCenturyDiasporaCount()
// topCenturyNameChange();
topCenturyDiasporaCode();
