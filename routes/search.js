const url = require('url');
const omdb = require('../lib/omdb');


function search(request, response) {
    const parsedUrl = url.parse(request.url, true);
    const title = parsedUrl.query.title;



    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    omdb.get(title, (error, movie) => {
        if (error) {
            return response.render(`error.html`, { error: error.message });

        }


        return response.render(`movie.html`, movie);



    });



}

module.exports = search;