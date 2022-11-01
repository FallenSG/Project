const path = require('path')
const renderPath = path.join(__dirname, '../client/build/index.html')

const Directory = {
    //reference_name: [route, routeDefLoc, renderPugFile]
    'index': ['/', './index', 'index'],
    'signIn': ['/sign_in', './sign_in', 'sign_in'],
    'signOut': ['/sign_out', './sign_out', 'sign_out'],
    'signUp': ['/sign_up', './sign_up', 'sign_up'],
    'verify': ['/verify', './verify', renderPath],
    'forgotPass': ['/forgot-password', './forgotPass', 'forgotPass'],
    'dash': ['/dashboard', './dashboard', 'dashboard'],
    'profile': [],
    'book': ['/book', './book', 'book'],
    'createBook': ['/createBook', './createBook', 'book'],
    'bookModify': ['/bookModify', './bookModify', 'bookModify'],
    'author': ['/author', ''],
    'library':['/library', ''],
    'sample': ['/sample', './sample', 'sample']
}

// const Directory = {
//     //reference_name: [route, routeDefLoc, renderPugFile]
//     'index': ['/', './index'],
//     // 'admin': ['/admin', './admin', ''],
//     'signIn': ['/sign_in', './sign_in'],
//     'signOut': ['/sign_out', './sign_out'],
//     'signUp': ['/sign_up', './sign_up'],
//     'verify': ['/verify', './verify'],
//     'forgotPass': ['/forgot-password', './forgotPass'],
//     'dash': ['/dashboard', './dashboard'],
//     'profile': [],
//     'book': ['/book', './book'],
//     'createBook': ['/createBook', './createBook'],
//     'author': [],
//     'sample': ['/sample', './sample']
// }

const Direct = (path='index', redirect='index', failure='signIn', success='index') => {
    const renderFilePath = renderPath;
    // const renderFilePath = Directory[path][2];    
    const redirectUrl = Directory[redirect][0];
    const failureRedirect = Directory[failure][0];
    const successRedirect = Directory[success][0];

    return { renderFilePath, redirectUrl, failureRedirect, successRedirect };
}

module.exports = { Directory, Direct, renderType: 'sendFile' }