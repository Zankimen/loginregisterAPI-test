const {registerHandler, loginHandler } = require('./handler');

const routes = [
    {
        path: '/register',
        method: 'POST',
        handler: registerHandler,
        options: {
            payload: {
                allow: 'application/json',
                parse: true,
            },
        },
    },
    {
        path: '/login',
        method: 'POST',
        handler: loginHandler,
        options: {
            payload: {
                allow: 'application/json',
                parse: true,
            },
        },
    },
];

module.exports = routes;
