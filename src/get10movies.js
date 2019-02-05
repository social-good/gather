const fetch = require('node-fetch');
const fs = require('fs');

function getTopMovieOfYears(fromYear, toYear) {
    const apiPromises = []
    const page = 1;
	for (var year = fromYear; year <= toYear; year++) {
		const url = `https://api.themoviedb.org/3/discover/movie?api_key=4ba39d95ffe0232643f0ad3d6b824b30&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&year=${year}&with_runtime.gte=40`
		apiPromises.push(fetch(url)
			.then(res => res.json())
			.then(json => json.results)
			.catch(err => console.log(err)))
	}
	
	return Promise.all(apiPromises) 
		.then(pagesResults => {
			const movieIDs = [];
			for (var i = 0; i <= toYear-fromYear; i++) {
				movieIDs.push({year: fromYear+i, id: pagesResults[i][0].id})
			}
			return movieIDs;
		})
		.catch(err => console.error(err));
}

function writeToJson(yearMovieIDs) {
	fs.writeFile(`${__dirname}../tmp/topMovieIDs.json`, JSON.stringify(yearMovieIDs), function(err) {
		if(err) {
			return console.log(err);
		}
		console.log("The file was saved!");
	});
}

getTopMovieOfYears(2008, 2018).then(yearMovieIDs => {console.log(yearMovieIDs);writeToJson(yearMovieIDs)})

