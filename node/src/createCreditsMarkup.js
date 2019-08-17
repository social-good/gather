const fs = require('fs');

// Take in the json.
// Map each credit to its department
// e.g. departmentMap[2]['Sound']
// Convert each map to a div of Credits

// First just work with what we have. 
function formatCredits() {
	var StarWarsCreditsJSON = fs.readFileSync(`${__dirname}/../tmp/tempswiv.json`);
	var StarWarsCredits = JSON.parse(StarWarsCreditsJSON);
	var HTML = '';
	for (var i = 0; i < StarWarsCredits.length; i++) {
		HTML += `<div class="credit-row"><div class="credit-name">${StarWarsCredits[i][0]}</div><div class="credit-role">${StarWarsCredits[i][1]}</div></div>\n`;
	}
	console.log(HTML);
}

formatCredits();