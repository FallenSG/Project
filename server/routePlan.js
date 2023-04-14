const path = require('path')
const renderPath = path.join(__dirname, '../client/build/index.html')

const Directory = {
    //reference_name: [route, routeDefLoc, renderPugFile]
    'index': ['/', './index'],
    'search': ['/search', './search'],
    'signIn': ['/sign_in', './sign_in'],
    'signOut': ['/sign_out', './sign_out'],
    'signUp': ['/sign_up', './sign_up'],
    'verify': ['/verify', './verify'],
    'forgotPass': ['/forgot-password', './forgotPass'],
    'genre': ['/genre', './genre'],
    'ranking': ['/ranking', './ranking'],
    'book': ['/book', './book'],
    'author': ['/author', './author'],
    'library': ['/library', './library'],
    'reset': ['/reset-password', './reset'],
    'sample': ['/sample', './sample'],
    'publish': ['/publish', './publish'],
    'review': ['/review', './review']
}


const Direct = (path = 'index', redirect = 'index', failure = 'signIn', success = 'index') => {
    const renderFilePath = renderPath;
    const redirectUrl = Directory[redirect][0];
    const failureRedirect = Directory[failure][0];
    const successRedirect = Directory[success][0];

    return { renderFilePath, redirectUrl, failureRedirect, successRedirect };
}

module.exports = { Directory, Direct, renderType:"sendFile" } 