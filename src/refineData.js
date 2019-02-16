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
	var augmentedJSON = fs.readFileSync(`${__dirname}/../tmp/diaspora/topCenturyMovies_(augmented)_1550309563095.json`);
	var augmentedMap = JSON.parse(augmentedJSON);
	var diasporaMap = {};
	

	for (var year = 1900; year < 2018; year++) {
		var credits = augmentedMap.byyear[`${year}`]
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
			Iranian: 0 
		}
		diasporaMap[`${year}`] = yearDiaspora;
		if (credits === undefined || credits === null || credits.cast === null || credits.crew === null) {
			console.log(`Credits are ${credits} for year ${year}`)
		} else {
			var len = credits.cast.length;
			for (var castIndex = 0; castIndex < len; castIndex++) {
				if (credits.cast[castIndex].diaspora) {
					var diaspora = credits.cast[castIndex].diaspora.ethnicity
					diasporaMap[`${year}`][diaspora] += 1;
				}
			}
			len = credits.crew.length;
			for (var crewIndex = 0; crewIndex < len; crewIndex++) {
				if (credits.crew[crewIndex].diaspora) {
					var diaspora = credits.crew[crewIndex].diaspora.ethnicity
					diasporaMap[`${year}`][diaspora] += 1;
				}
			}
		}
	}
	var diasporaArrays = { 
		British: Object.values(diasporaMap).map(yearMap => yearMap['British']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		French: Object.values(diasporaMap).map(yearMap => yearMap['French']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Greek: Object.values(diasporaMap).map(yearMap => yearMap['Greek']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Portuguese: Object.values(diasporaMap).map(yearMap => yearMap['Portuguese']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		German: Object.values(diasporaMap).map(yearMap => yearMap['German']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Irish: Object.values(diasporaMap).map(yearMap => yearMap['Irish']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		AfricanAmerican: Object.values(diasporaMap).map(yearMap => yearMap['AfricanAmerican']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Austrian: Object.values(diasporaMap).map(yearMap => yearMap['Austrian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Chinese: Object.values(diasporaMap).map(yearMap => yearMap['Chinese']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Italian: Object.values(diasporaMap).map(yearMap => yearMap['Italian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Jewish: Object.values(diasporaMap).map(yearMap => yearMap['Jewish']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Dutch: Object.values(diasporaMap).map(yearMap => yearMap['Dutch']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		HispanoLatino: Object.values(diasporaMap).map(yearMap => yearMap['HispanoLatino']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Danish: Object.values(diasporaMap).map(yearMap => yearMap['Danish']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Korean: Object.values(diasporaMap).map(yearMap => yearMap['Korean']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Swedish: Object.values(diasporaMap).map(yearMap => yearMap['Swedish']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Indian: Object.values(diasporaMap).map(yearMap => yearMap['Indian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Japanese: Object.values(diasporaMap).map(yearMap => yearMap['Japanese']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Norwegian: Object.values(diasporaMap).map(yearMap => yearMap['Norwegian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Russian: Object.values(diasporaMap).map(yearMap => yearMap['Russian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Ukrainian: Object.values(diasporaMap).map(yearMap => yearMap['Ukrainian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Ivoirien: Object.values(diasporaMap).map(yearMap => yearMap['Ivoirien']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Finnish: Object.values(diasporaMap).map(yearMap => yearMap['Finnish']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Moldova: Object.values(diasporaMap).map(yearMap => yearMap['Moldova']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Ghanaian: Object.values(diasporaMap).map(yearMap => yearMap['Ghanaian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Swiss: Object.values(diasporaMap).map(yearMap => yearMap['Swiss']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Polish: Object.values(diasporaMap).map(yearMap => yearMap['Polish']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Hungarian: Object.values(diasporaMap).map(yearMap => yearMap['Hungarian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Pakistanese: Object.values(diasporaMap).map(yearMap => yearMap['Pakistanese']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Tunisian: Object.values(diasporaMap).map(yearMap => yearMap['Tunisian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		'Congolese (Kinshasa)': Object.values(diasporaMap).map(yearMap => yearMap['Congolese (Kinshasa)']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Czech: Object.values(diasporaMap).map(yearMap => yearMap['Czech']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Turkish: Object.values(diasporaMap).map(yearMap => yearMap['Turkish']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Mauritanian: Object.values(diasporaMap).map(yearMap => yearMap['Mauritanian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Bulgarian: Object.values(diasporaMap).map(yearMap => yearMap['Bulgarian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		NativeHawaiian: Object.values(diasporaMap).map(yearMap => yearMap['NativeHawaiian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Croat: Object.values(diasporaMap).map(yearMap => yearMap['Croat']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Moroccan: Object.values(diasporaMap).map(yearMap => yearMap['Moroccan']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Armenian: Object.values(diasporaMap).map(yearMap => yearMap['Armenian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Egyptian: Object.values(diasporaMap).map(yearMap => yearMap['Egyptian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		'South African': Object.values(diasporaMap).map(yearMap => yearMap['South African']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Nigerian: Object.values(diasporaMap).map(yearMap => yearMap['Nigerian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Serbian: Object.values(diasporaMap).map(yearMap => yearMap['Serbian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
		Iranian: Object.values(diasporaMap).map(yearMap => yearMap['Iranian']).map((value, index) => value / Object.values(Object.values(diasporaMap)[index]).reduce((sum, currValue) => sum + currValue)),
	}

	fs.writeFile(`${__dirname}/../tmp/topCenturyDiasporaCount.json`, JSON.stringify(diasporaArrays), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyDiasporaCount.json !`);
	});
}

// topCenturyDepartmentCount()
// topCenturyGenderCount()
// topCenturyBreakdownGenderByDepartment()
topCenturyDiasporaCount()

