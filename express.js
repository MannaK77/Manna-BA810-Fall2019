var express = require('express'); 
var morgan = require('morgan');

module.exports = function (app, config) {
    app.use(function (req, res, next) {
        logger.log('Request from ' + req.connection.remoteAddress);
        next();
    });

    app.use(morgan('dev'));

    app.use(express.static(config.root + '/public'));
    app.use(function (req, res) {
        res.type('text/plan');
        res.status(404);
        res.send('404 Not Found');
    });

    

    app.use(function (err, req, res, next) {

        logger.error(err.stack);
        res.type('text/plan');
        res.status(500);
        res.send('500 Sever Error');
    });

    logger.log("Starting application");

};