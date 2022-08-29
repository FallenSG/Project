const router = require('express').Router();
const { Book } = require('../models/book')
const { User } = require('../models/user')
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJsMongoose = require('@adminjs/mongoose')

AdminJS.registerAdapter(AdminJsMongoose)

const adminJs = new AdminJS({
    resources: [
        {
            resource: Book, options: {
                listProperties: ['title', '_id', 'author_name', 'pub_date']
            }
        },
    ],
    // branding: {
    //     companyName: 'Amazing c.o.',
    // },
})


router.use('/', AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ email })
        if (user) {
            const matched = await bcrypt.compare(password, user.encryptedPassword)
            if (matched) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
}))

module.exports = router;