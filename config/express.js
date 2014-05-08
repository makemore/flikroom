// config/express.js
module.exports.express = {
    middleware: {
        custom: true
    },

    prettyPrint: function(app){
        app.configure('development', function(){
            app.use(express.errorHandler());
            app.locals.pretty = true;
        });
    },

    customMiddleware: function(app){
        app.use(passport.initialize());
        app.use(passport.session());
    }
};