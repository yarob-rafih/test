var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'error-file',
            level:            'error',
            filename:         './log/error.log',
            handleExceptions: true,
            json:             false,
            maxsize:          5242880, //5MB
            maxFiles:         5,
        }),
        new (winston.transports.File)({
            name: 'info-file',
            level: 'info',
            filename:         './log/access.log',
            json:             false,
            maxsize:          5242880, //5MB
            maxFiles:         5,
        })
    ],
    exitOnError: false
});

// setup the logger
logger.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
};

module.exports = logger;
