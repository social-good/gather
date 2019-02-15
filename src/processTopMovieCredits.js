const fs = require('fs');

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

function createDepartmentMap() {

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

	writeToJSON(departmentMap);
}

function writeToJSON(creditsMap) {
	fs.writeFile(`${__dirname}/../tmp/topCenturyBreakdowns.json`, JSON.stringify(creditsMap), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log(`The file was saved to location: ${__dirname}/../tmp/topCenturyBreakdowns.json !`);
	});
}

createDepartmentMap()