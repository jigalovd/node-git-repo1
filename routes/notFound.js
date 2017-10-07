function notFound(request, response) {
    return response.render('error.html', { error: 'Not found' });
}

module.exports = notFound;