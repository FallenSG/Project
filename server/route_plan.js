const path = require('path')
const renderPath = path.join(__dirname, '../client/build/index.html')

module.exports = {
    //reference_name: [route, routeDefLoc, renderPugFile]
    'index': ['/', './index', 'index'],
    'sign_in': ['/sign_in', './sign_in', 'sign_in'],
    'sign_out': ['/sign_out', './sign_out', 'sign_out'],
    'sign_up': ['/sign_up', './sign_up', 'sign_up'],
    'dash': ['/dashboard', './dashboard', 'dashboard'],
    'profile': [],
    'book': ['/book', './book', 'book'],
    'createBook': ['/createBook', './createBook', 'book'],
    'author': [],
    'sample': ['/sample', './sample', 'sample']
}