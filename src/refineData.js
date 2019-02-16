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

topCenturyDepartmentCount()
topCenturyGenderCount()
topCenturyBreakdownGenderByDepartment()
