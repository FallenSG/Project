const path = require('path')
const renderPath = path.join(__dirname, '../client/build/index.html')

module.exports = {
    //reference_name: [route, routeDefLoc, renderPugFile]
    'index': ['/', './index', 'index'],
    'sign_in': ['/sign_in', './sign_in', 'sign_in'],
    'sign_out': ['/sign_out', './sign_out', 'sign_out'],
    'sign_up': ['/sign_up', './sign_up', 'sign_up'],
    'verify': ['/verify', './verify', renderPath],
    'forgotPass': ['/forgot-password', './forgotPass', 'forgotPass'],
    'dash': ['/dashboard', './dashboard', 'dashboard'],
    'profile': [],
    'book': ['/book', './book', 'book'],
    'createBook': ['/createBook', './createBook', 'book'],
    'author': [],
    'sample': ['/sample', './sample', 'sample']
}

// module.exports = {
//     //reference_name: [route, routeDefLoc, renderPugFile]
//     'index': ['/', './index', renderPath],
//     // 'admin': ['/admin', './admin', ''],
//     'sign_in': ['/sign_in', './sign_in', renderPath],
//     'sign_out': ['/sign_out', './sign_out', renderPath],
//     'sign_up': ['/sign_up', './sign_up', renderPath],
//     'verify': ['/verify', './verify', renderPath],
//     'dash': ['/dashboard', './dashboard', renderPath],
//     'profile': [],
//     'book': ['/book', './book', renderPath],
//     'createBook': ['/createBook', './createBook', renderPath],
//     'author': [],
//     'sample': ['/sample', './sample', renderPath]
// }