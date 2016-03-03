var express = require("express");
var app = express();
var router = require('./lib/Router');
var logger = require('./lib/Logger');
var cronJob = require('./lib/CronJob');
var morgan = require('morgan');

app.use(require("morgan")("combined", { "stream": logger.stream }));
app.use(router);


app.listen(3000,function(){
    logger.info("Live at Port 3000");
});
