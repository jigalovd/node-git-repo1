const fs = require('fs');
const path = require('path');

function render(templateName, data) {
    let viewName = templateName;
    fs.readFile(path.resolve('views', viewName), 'utf-8', (error, template) => {
        if (error) {
            this.writeHead(500, { 'Content-Type': 'text/plain' })
            return this.end(error.message);
        }
        let html;
        if (data) {

            html = template.replace(new RegExp(/{{([^{}]*)}}/g), (placeholder, property) => {
                console.log(placeholder, property);
                const match = data[property];
                return match || placeholder;
            });
        }
        if (error) {
            this.writeHead(500, { 'Content-Type': 'text/plain' })
            return this.end(error.message);
        }

        this.statusCode = 200;
        this.writeHead(200, { 'Content-Type': 'text/html' });
        this.end(html);
    });
}

module.exports = render;