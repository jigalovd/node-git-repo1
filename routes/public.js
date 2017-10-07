const fs = require('fs');
const path = require('path');

function public(request, response) {
    const extention = path.extname(request.url); //css/app.css -> .css
    const fileName = request.url.slice(1);
    let contentType = '';
    switch (extention) {
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        default:
            contentType = 'text/plain';
    }

    const stream = fs.createReadStream(path.resolve('public', fileName));

    response.statusCode = 200;
    response.setHeader('Content-Type', contentType);

    stream.pipe(response);
    stream.on('error', error => {
        if (error.code === 'ENOENT') {
            console.log(error);
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('Not found');
        } else {
            response.writeHead(500, { 'Content-Type': 'text/plain' });
            response.end(error.message);
        }
    });

}

module.exports = public;