const fetch = require('node-fetch');
const api_key = 'XXXXXXXXXXXXXXXXXXXXXXXXXX'

function getMovieCrew(id) {

	return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${api_key}`)
		.then(res => res.json())
		.then(json => json.crew)
		.then(crew => {
			const crewNames = [];
			for (let i = 0; crew != undefined && i < crew.length; i++) {
				//  WOW THIS WAS THE PROBLEM
				//crewNames.push({credit_id: crew[i].credit_id ,name: crew[i].name});
				crewNames.push(crew[i])
			}
			return crewNames;
		})
		.catch(err => console.error(err));
}

getMovieCrew(155).then(console.log)