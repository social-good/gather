const fs = require('fs');
var data = fs.readFileSync(`${__dirname}/../tmp/crew_2008-2017.json`, 'utf8');
var credits = JSON.parse(data);
var creditMap = {};
for (var sequenceIndex = 0; sequenceIndex < credits.length; sequenceIndex++) {
	var sequence = credits[sequenceIndex]
	for (var crewmemberIndex = 0; crewmemberIndex < credits[sequenceIndex].length; crewmemberIndex++) {
		let year = 2008 + sequenceIndex;
		let name = sequence[crewmemberIndex].name
		let credit_id = sequence[crewmemberIndex].credit_id
		let job = sequence[crewmemberIndex].job
		if (creditMap[year.toString()] != undefined) {
			if (creditMap[year.toString()][job] != undefined) {
				creditMap[year.toString()][job] += 1
			} else {
				creditMap[year.toString()][job] = 1
			}
		} else {
			creditMap[year.toString()] = {};
		}
	}
}
console.log(creditMap)
