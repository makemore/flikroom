// config/express.js
module.exports.express = {
    middleware: {
        custom: true
    },

    customMiddleware: function(app){
        app.use(passport.initialize());
        app.use(passport.session());
    }
};